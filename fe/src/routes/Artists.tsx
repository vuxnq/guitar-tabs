import { Link, useLoaderData } from "react-router";
import { getArtists } from "../api/artists";
import type { Artist } from "../types";

export async function loader() {
  const artists = await getArtists();
  return artists;
}

export function Artists() {
  const data = useLoaderData() as Artist[];

  return (
    <>
      <h1>Artists</h1>

      {/*
        <pre>
            {JSON.stringify(data, null, 2)}
        </pre>
        */}

      <ul>
        {data.map((x, i) => (
          <li key={i}>
            <Link to={`/artists/${x.id}`}>{x.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
