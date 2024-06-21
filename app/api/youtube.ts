import axios from "axios";

const API_KEY = process.env.YOUTUBE_API_KEY;

export const fetchVipassanaVideos = async () => {
  const response = await axios.get(
    "https://www.googleapis.com/youtube/v3/search",
    {
      params: {
        part: "snippet",
        q: "Vipassana meditation",
        type: "video",
        maxResults: 10,
        key: API_KEY,
      },
    }
  );

  return response.data.items;
};
