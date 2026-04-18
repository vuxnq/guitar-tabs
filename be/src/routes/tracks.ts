import { Router } from "express";
import prisma from "../db";

const router = Router();

// GET /api/tracks
router.get("/", async (req, res) => {
  const { releaseId } = req.query;

  let whereClause = {};
  if (releaseId) {
    const parsedId = Number(releaseId);
    if (isNaN(parsedId)) {
      return res.status(400).json({ error: "releaseId must be a number" });
    }
    whereClause = { releaseId: parsedId };
  }

  try {
    const tracks = await prisma.track.findMany({
      where: whereClause,
      orderBy: { title: "asc" },
    });
    res.json(tracks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "failed to fetch tracks" });
  }
});

// GET /api/tracks/:id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const { include } = req.query;

  try {
    const track = await prisma.track.findUnique({
      where: { id: Number(id) },
      include:
        include === "true"
          ? {
              tabs: { omit: { content: true } },
              release: { include: { artist: true } },
            }
          : {},
    });

    if (!track) {
      return res.status(404).json({ error: "track not found" });
    }

    res.json(track);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "failed to fetch the track" });
  }
});

// POST /api/tracks
router.post("/", async (req, res) => {
  const { title, releaseId } = req.body;
  if (!title || !releaseId)
    return res.status(400).json({ error: "title and releaseId are required" });

  try {
    const newTrack = await prisma.track.create({
      data: { title, releaseId: Number(releaseId) },
    });
    res.status(201).json(newTrack);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "failed to create track" });
  }
});

// DELETE /api/tracks/:id
router.delete("/:id", async (req, res) => {
  try {
    await prisma.track.delete({ where: { id: Number(req.params.id) } });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "failed to delete track" });
  }
});

export default router;
