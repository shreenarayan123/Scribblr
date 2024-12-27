import { useEffect, useState } from "react";
import axios from "axios";

type Tag = {
  topic: string;
};

const headers = { Authorization: ` ${localStorage.getItem("token")}` };
export const useTag = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    const getTags = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${backendUrl}/tag/all`, { headers });
        const fetchedTags = res.data;

        setTags(fetchedTags);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching tags:", err);
        setError("Failed to fetch tags");
        setLoading(false);
      }
    };

    getTags();
  }, []);

  return { tags, loading, error };
};

// Fixed useAllTags implementation
export const useAllTags = (tags: Tag[]) => {
  const [allTags, setAllTags] = useState<string[]>([]);

  useEffect(() => {
    const tagTopics = tags.map((tag) => tag.topic);
    setAllTags(tagTopics);
  }, [tags]);

  return { allTags };
};
