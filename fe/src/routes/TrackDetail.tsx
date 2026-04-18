import { useLoaderData, Link, type LoaderFunctionArgs } from "react-router";
import { getTrack } from "../api/tracks";

export async function loader({ params }: LoaderFunctionArgs) {
  if (!params.trackId) throw new Error("Missing trackId");
  return await getTrack({ trackId: Number(params.trackId), include: true });
}

export function TrackDetail() {
  const track = useLoaderData();

  return (
    <div>
      <h1>Track Detail: {track.title}</h1>
      <Link to="/tabs/new">Add a new tab for this or another track</Link>
      <pre>{JSON.stringify(track, null, 2)}</pre>
    </div>
  );
}
