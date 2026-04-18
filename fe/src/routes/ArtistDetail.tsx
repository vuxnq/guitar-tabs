import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import { getArtist } from "../api/artists";

export async function loader({ params }: LoaderFunctionArgs) {
  if (!params.artistId) throw new Error("Missing artistId");
  return await getArtist({ artistId: Number(params.artistId), include: true });
}

export function ArtistDetail() {
  const artist = useLoaderData();

  return (
    <div>
      <h1>Artist Detail: {artist.name}</h1>
      <pre>{JSON.stringify(artist, null, 2)}</pre>
    </div>
  );
}
