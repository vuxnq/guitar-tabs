import { Router } from "express";
import prisma from "../db";
import { getPagination, paginateResponse } from "../utils/pagination";

const router = Router();

// GET /api/artists
router.get("/", async (req, res) => {
  const { page, limit, skip, take } = getPagination(req.query);

  try {
    const [artists, totalCount] = await Promise.all([
      prisma.artist.findMany({
        orderBy: { name: "asc" },
        skip,
        take,
      }),
      prisma.artist.count(),
    ]);
    res.json(paginateResponse(artists, totalCount, page, limit));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "failed to fetch artists" });
  }
});

// GET /api/artists/:id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const { include } = req.query;

  try {
    const artist = await prisma.artist.findUnique({
      where: { id: Number(id) },
      include:
        include === "true" ? { releases: { include: { tracks: true } } } : {},
    });

    if (!artist) {
      return res.status(404).json({ error: "artist not found" });
    }

    res.json(artist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "failed to fetch the artist" });
  }
});

// POST /api/artists
router.post("/", async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "name is required" });

  try {
    const newArtist = await prisma.artist.create({ data: { name } });
    res.status(201).json(newArtist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "failed to create artist" });
  }
});

// DELETE /api/artists/:id
router.delete("/:id", async (req, res) => {
  try {
    await prisma.artist.delete({ where: { id: Number(req.params.id) } });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "failed to delete artist" });
  }
});

export default router;
