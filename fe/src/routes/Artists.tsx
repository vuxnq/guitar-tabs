import { useLoaderData, Link } from "react-router";
import { getArtists } from "../api/artists";

export async function loader() {
  return await getArtists();
}

export function Artists() {
  const artists = useLoaderData();

  return (
    <div>
      <h1>Artists</h1>
      <ul>
        {artists.map((artist) => (
          <li key={artist.id}>
            <Link to={`/artists/${artist.id}`}>{artist.name}</Link>
          </li>
        ))}
      </ul>
      <pre>{JSON.stringify(artists, null, 2)}</pre>
    </div>
  );
}
