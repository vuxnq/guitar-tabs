import { Router } from "express";
import prisma from "../db";

const router = Router();

// GET /api/search
router.get("/", async (req, res) => {
  const { q } = req.query;

  if (!q || typeof q !== "string") {
    return res.json([]);
  }

  try {
    const [artists, releases, tracks, tabs] = await Promise.all([
      prisma.artist.findMany({
        where: { name: { contains: q } },
        select: { id: true, name: true },
        take: 5,
      }),
      prisma.release.findMany({
        where: { title: { contains: q } },
        select: {
          id: true,
          title: true,
          artistId: true,
          artist: { select: { name: true } },
        },
        take: 5,
      }),
      prisma.track.findMany({
        where: { title: { contains: q } },
        select: {
          id: true,
          title: true,
          releaseId: true,
          release: {
            select: { title: true, artist: { select: { name: true } } },
          },
        },
        take: 5,
      }),
      prisma.tab.findMany({
        where: {
          OR: [
            { author: { contains: q } },
            { content: { contains: q } },
            { track: { title: { contains: q } } },
          ],
        },
        select: {
          id: true,
          author: true,
          trackId: true,
          track: {
            select: {
              title: true,
              release: {
                select: { title: true, artist: { select: { name: true } } },
              },
            },
          },
        },
        take: 5,
      }),
    ]);

    const results = [
      ...artists.map((a) => ({ type: "artist", id: a.id, name: a.name })),
      ...releases.map((r) => ({
        type: "release",
        id: r.id,
        parentId: r.artistId,
        title: r.title,
        artistName: r.artist.name,
      })),
      ...tracks.map((t) => ({
        type: "track",
        id: t.id,
        parentId: t.releaseId,
        title: t.title,
        releaseTitle: t.release.title,
        artistName: t.release.artist.name,
      })),
      ...tabs.map((t) => ({
        type: "tab",
        id: t.id,
        parentId: t.trackId,
        author: t.author,
        trackTitle: t.track.title,
        releaseTitle: t.track.release.title,
        artistName: t.track.release.artist.name,
      })),
    ];

    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "failed to perform search" });
  }
});

export default router;
