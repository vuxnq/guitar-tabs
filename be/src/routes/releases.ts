import { Router } from "express";
import prisma from "../db";
import { getPagination, paginateResponse } from "../utils/pagination";

const router = Router();

// GET /api/releases
router.get("/", async (req, res) => {
  const { artistId } = req.query;
  const { page, limit, skip, take } = getPagination(req.query);

  let whereClause = {};
  if (artistId) {
    const parsedId = Number(artistId);
    if (isNaN(parsedId)) {
      return res.status(400).json({ error: "artistId must be a number" });
    }
    whereClause = { artistId: parsedId };
  }

  try {
    const [releases, totalCount] = await Promise.all([
      prisma.release.findMany({
        where: whereClause,
        orderBy: { title: "asc" },
        skip,
        take,
      }),
      prisma.release.count({ where: whereClause })
    ]);
    res.json(paginateResponse(releases, totalCount, page, limit));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "failed to fetch releases" });
  }
});

// GET /api/releases/:id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const { include } = req.query;

  try {
    const release = await prisma.release.findUnique({
      where: { id: Number(id) },
      include: include === "true" ? { tracks: true, artist: true } : {},
    });

    if (!release) {
      return res.status(404).json({ error: "release not found" });
    }

    res.json(release);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "failed to fetch the release" });
  }
});

// POST /api/releases
router.post("/", async (req, res) => {
  const { title, artistId } = req.body;
  if (!title || !artistId)
    return res.status(400).json({ error: "title and artistId are required" });

  try {
    const newRelease = await prisma.release.create({
      data: { title, artistId: Number(artistId) },
    });
    res.status(201).json(newRelease);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "failed to create release" });
  }
});

// DELETE /api/releases/:id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const { cleanup } = req.query;

  try {
    const release = await prisma.release.findUnique({
      where: { id: Number(id) },
    });

    if (!release) return res.status(404).json({ error: "release not found" });

    const artistId = release.artistId;

    await prisma.release.delete({ where: { id: Number(id) } });

    if (cleanup === "true") {
      const remainingReleases = await prisma.release.count({
        where: { artistId },
      });
      if (remainingReleases === 0) {
        await prisma.artist.delete({ where: { id: artistId } });
      }
    }

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "failed to delete release" });
  }
});

export default router;
