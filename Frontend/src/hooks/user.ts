import { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { followAtomFamily } from "../Recoil/atoms";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const useCurrentUser = (id: string) => {
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    const getCurrenUser = async (id: string) => {
      try {
        const headers = { Authorization: ` ${localStorage.getItem("token")}` };

        const res = await axios.get(`${backendUrl}/user/${id}`, { headers });

        setUser(res.data);
      } catch (error) {
        console.log("error fetching user data", error);
      }
    };
    getCurrenUser(id);
  }, [id]);
  return { user };
};

interface Follow {
  id: string;
  followeeId: string;
  followingID: string;
}
export const useFollowUser = (followeeId: string) => {
  const [isFollowing, setIsFollowing] = useRecoilState(
    followAtomFamily(followeeId)
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const checkFollowStatus = async () => {
    const idString = localStorage.getItem("user");
    const id = JSON.parse(idString || "{}").id;
    try {
      const headers = { Authorization: `${localStorage.getItem("token")}` };
      const res = await axios.get(`${backendUrl}/user/${id}`, { headers });
      const following = res.data.following;

      return following.some(
        (follow: Follow) => follow.followeeId === followeeId
      );
    } catch (error) {
      setError(true);
      return false;
    }
  };

  const followUser = async (followeeId: string) => {
    const idString = localStorage.getItem("user");
    const id = JSON.parse(idString || "{}").id;
    const followStatus = await checkFollowStatus();
    if (followStatus == false) {
      setLoading(true);
      try {
        const headers = { Authorization: ` ${localStorage.getItem("token")}` };
        await axios.post(
          `${backendUrl}/follow/${id}`,
          {
            followeeId: followeeId,
          },
          { headers }
        );

        setIsFollowing(true);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const headers = { Authorization: ` ${localStorage.getItem("token")}` };
        await axios.delete(`${backendUrl}/follow/${id}`, {
          headers,
          data: { followeeId: followeeId },
        });
        setIsFollowing(false);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    checkFollowStatus();
  }, [followeeId]);

  return { isFollowing, loading, error, followUser };
};
