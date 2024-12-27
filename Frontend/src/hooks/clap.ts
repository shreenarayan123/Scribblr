import { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { clapAtomFamily } from "../Recoil/atoms";

interface Clap {
  id: string;
  userId: string;
  postId: string;
  commentId: string;
}
const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const useClap = (blogId: string) => {
  const [isClapped, setIsClapped] = useRecoilState(clapAtomFamily(blogId));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const checkClapStatus = async () => {
    const idString = localStorage.getItem("user");
    const id = JSON.parse(idString || "{}").id;
    try {
      const headers = { Authorization: `${localStorage.getItem("token")}` };
      const res = await axios.get(`${backendUrl}/user/${id}`, { headers });
      const claps = res.data.claps;

      return claps.some((clap: Clap) => clap.postId === blogId);
    } catch (error) {
      setError(true);
      return false;
    }
  };

  const clap = async (blogId: string) => {
    const idString = localStorage.getItem("user");
    const id = JSON.parse(idString || "{}").id;
    const clapStatus = await checkClapStatus();
    if (clapStatus == false) {
      setLoading(true);
      try {
        const headers = { Authorization: ` ${localStorage.getItem("token")}` };
        await axios.post(
          `${backendUrl}/clap/${blogId}`,
          {
            userId: id,
          },
          { headers }
        );
        setIsClapped(true);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const headers = { Authorization: ` ${localStorage.getItem("token")}` };
        await axios.delete(`${backendUrl}/clap/${blogId}`, {
          headers,
          data: { userId: id },
        });
        setIsClapped(false);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    checkClapStatus();
  }, [blogId]);

  return { isClapped, loading, error, clap };
};
