import { fetchVipassanaVideos } from "./api/youtube";
import MainTemplate from "./template/main-template";

export default async function Home() {
  const videos = await fetchVipassanaVideos();

  return (
      <MainTemplate videos={videos} />
  );
}
