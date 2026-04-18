import { Link, useLoaderData, type LoaderFunctionArgs } from "react-router";
import { getTab } from "../api/tabs";
import type { Tab } from "../types";
import { getTrack } from "../api/tracks";
import { getRelease } from "../api/releases";

export async function loader({ params }: LoaderFunctionArgs) {
  const tabId = Number.parseInt(params.tabId as string);
  const tab = await getTab({ tabId });
  tab.track = await getTrack({ trackId: tab.trackId });
  tab.track.release = await getRelease({ releaseId: tab.track.releaseId });
  return tab;
}

export function TabDetail() {
  const data = useLoaderData() as Tab;

  return (
    <>
      <h1>Tab Detail</h1>
      <Link to={`/tabs/${data.id}/edit`}>Edit</Link> <br />
      {/*
        Data:
        <pre>{JSON.stringify(data, null, 2)}</pre>
        */}
      Track: {data.track.title} <br />
      Release: {data.track.release.title} <br />
      Author: {data.author} <br />
      Created At: {data.createdAt.toString()} <br />
      <pre>{data.content}</pre>
    </>
  );
}
