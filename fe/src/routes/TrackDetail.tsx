import { Link, useLoaderData, type LoaderFunctionArgs } from "react-router";
import { getTrack } from "../api/tracks";
import type { Track } from "../types";

export async function loader({ params }: LoaderFunctionArgs) {
  const trackId = Number.parseInt(params.trackId!);
  const track = await getTrack({ trackId, include: true });
  return track;
}

export function TrackDetail() {
  const data = useLoaderData() as Track;
  return (
    <>
      <h1>Track Detail</h1>

      {/*
        <pre>
            {JSON.stringify(data, null, 2)}
        </pre>
        */}

      <div>
        Tabs:
        <ul>
          {data.tabs.map((tab) => (
            <li>
              <Link to={`/tabs/${tab.id}`}>
                {tab.author} | {tab.createdAt.toLocaleString()}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
