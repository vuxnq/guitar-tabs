import { Router } from "express";
import prisma from "../db";
import { getPagination, paginateResponse } from "../utils/pagination";

const router = Router();

// GET /api/tabs
router.get("/", async (req, res) => {
  const { trackId, include } = req.query;
  const { page, limit, skip, take } = getPagination(req.query);

  let whereClause = {};
  if (trackId) {
    const parsedId = Number(trackId);
    if (isNaN(parsedId)) {
      return res.status(400).json({ error: "trackId must be a number" });
    }
    whereClause = { trackId: parsedId };
  }

  try {
    const [tabs, totalCount] = await Promise.all([
      prisma.tab.findMany({
        where: whereClause,
        orderBy: { createdAt: "desc" },
        include:
          include === "true"
            ? { track: { include: { release: { include: { artist: true } } } } }
            : {},
        skip,
        take,
      }),
      prisma.tab.count({ where: whereClause }),
    ]);
    res.json(paginateResponse(tabs, totalCount, page, limit));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "internal error" });
  }
});

// GET /api/tabs/:id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const { include } = req.query;

  try {
    const tab = await prisma.tab.findUnique({
      where: { id: Number(id) },
      include:
        include === "true"
          ? { track: { include: { release: { include: { artist: true } } } } }
          : {},
    });

    if (!tab) {
      return res.status(404).json({ error: "tab not found" });
    }

    res.json(tab);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "failed to fetch the tab" });
  }
});

// POST /api/tabs
router.post("/", async (req, res) => {
  const { content, author, trackId } = req.body;

  if (!content || !author || !trackId) {
    return res
      .status(400)
      .json({ error: "content, author, and trackId are required" });
  }

  try {
    const newTab = await prisma.tab.create({
      data: {
        content,
        author,
        trackId: Number(trackId),
      },
    });

    res.status(201).json(newTab);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "failed to create the tab" });
  }
});

// PUT /api/tabs/:id
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { content, author } = req.body;

  try {
    const updatedTab = await prisma.tab.update({
      where: { id: Number(id) },
      data: {
        content,
        author,
      },
    });

    res.json(updatedTab);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "failed to update the tab" });
  }
});

// DELETE /api/tabs/:id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const { cleanup } = req.query;

  try {
    const tab = await prisma.tab.findUnique({
      where: { id: Number(id) },
      include: { track: { include: { release: true } } },
    });

    if (!tab) return res.status(404).json({ error: "tab not found" });

    const trackId = tab.trackId;
    const releaseId = tab.track.releaseId;
    const artistId = tab.track.release.artistId;

    await prisma.tab.delete({ where: { id: Number(id) } });

    let deletedTrack = false;
    let deletedRelease = false;
    let deletedArtist = false;

    if (cleanup === "true") {
      const remainingTabs = await prisma.tab.count({ where: { trackId } });
      if (remainingTabs === 0) {
        await prisma.track.delete({ where: { id: trackId } });
        deletedTrack = true;

        const remainingTracks = await prisma.track.count({
          where: { releaseId },
        });
        if (remainingTracks === 0) {
          await prisma.release.delete({ where: { id: releaseId } });
          deletedRelease = true;

          const remainingReleases = await prisma.release.count({
            where: { artistId },
          });
          if (remainingReleases === 0) {
            await prisma.artist.delete({ where: { id: artistId } });
            deletedArtist = true;
          }
        }
      }
    }

    res.json({ deletedTrack, deletedRelease, deletedArtist, artistId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "failed to delete the tab" });
  }
});

// POST /api/tabs/smart - special endpoint for smart form
router.post("/smart", async (req, res) => {
  const { artistName, releaseTitle, trackTitle, content, author } = req.body;

  if (!artistName || !releaseTitle || !trackTitle || !content || !author) {
    return res.status(400).json({ error: "all fields are required" });
  }

  try {
    let artist = await prisma.artist.findUnique({
      where: { name: artistName },
    });

    if (!artist) {
      artist = await prisma.artist.create({
        data: { name: artistName },
      });
    }

    let release = await prisma.release.findFirst({
      where: {
        title: releaseTitle,
        artistId: artist.id,
      },
    });

    if (!release) {
      release = await prisma.release.create({
        data: {
          title: releaseTitle,
          artistId: artist.id,
        },
      });
    }

    let track = await prisma.track.findFirst({
      where: {
        title: trackTitle,
        releaseId: release.id,
      },
    });

    if (!track) {
      track = await prisma.track.create({
        data: {
          title: trackTitle,
          releaseId: release.id,
        },
      });
    }

    const newTab = await prisma.tab.create({
      data: {
        content,
        author,
        trackId: track.id,
      },
    });

    res.status(201).json(newTab);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "failed to save the smart tab" });
  }
});

export default router;
