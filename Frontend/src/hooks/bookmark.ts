import { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { bookmarkAtomFamily } from "../Recoil/atoms";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
interface Bookmark {
  id: string;
  userId: string;
  postId: string;
  commentId: string;
}
export const useBookmark = (blogId: string) => {
  const [isBookmarked, setIsBookmarked] = useRecoilState(
    bookmarkAtomFamily(blogId)
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const checkBookmarkStatus = async () => {
    const idString = localStorage.getItem("user");
    const id = JSON.parse(idString || "{}").id;
    try {
      const headers = { Authorization: `${localStorage.getItem("token")}` };
      const res = await axios.get(`${backendUrl}/user/${id}`, { headers });
      const bookmarks = res.data.bookmarks;

      return bookmarks.some((bookmark: Bookmark) => bookmark.postId === blogId);
    } catch (error) {
      setError(true);
      return false;
    }
  };
  const bookmark = async (blogId: string) => {
    const idString = localStorage.getItem("user");
    const id = JSON.parse(idString || "{}").id;
    const bookmarkStatus = await checkBookmarkStatus();
    if (bookmarkStatus == false) {
      setLoading(true);
      try {
        const headers = { Authorization: ` ${localStorage.getItem("token")}` };
        await axios.post(
          `${backendUrl}/bookmark/${blogId}`,
          {
            userId: id,
          },
          { headers }
        );
        setIsBookmarked(true);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const headers = { Authorization: ` ${localStorage.getItem("token")}` };
        await axios.delete(`${backendUrl}/bookmark/${blogId}`, {
          headers,
          data: { userId: id },
        });
        setIsBookmarked(false);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    checkBookmarkStatus();
  }, [blogId]);

  return { isBookmarked, loading, error, bookmark };
};
