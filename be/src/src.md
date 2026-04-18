**db.ts**
~~~
import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL || "file:./dev.db",
});

const prisma = new PrismaClient({ adapter });

export default prisma;

~~~

**index.ts**
~~~
import express from "express";
import cors from "cors";
import prisma from "./db";

import artistsRouter from "./routes/artists";
import releasesRouter from "./routes/releases";
import tracksRouter from "./routes/tracks";
import tabsRouter from "./routes/tabs";
import searchRouter from "./routes/search";

const app = express();
const PORT = process.env.PORT || 3000;

// middlewares
app.use(cors());
app.use(express.json());

// test
app.get("/", (req, res) => {
  res.send(req.headers);
});

// routes
app.use("/api/artists", artistsRouter);
app.use("/api/releases", releasesRouter);
app.use("/api/tracks", tracksRouter);
app.use("/api/tabs", tabsRouter);
app.use("/api/search", searchRouter);

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});

~~~

**routes/artists.ts**
~~~
import { Router } from "express";
import prisma from "../db";

const router = Router();

// GET /api/artists
router.get("/", async (req, res) => {
  try {
    const artists = await prisma.artist.findMany({
      orderBy: { name: "asc" },
    });
    res.json(artists);
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

~~~

**routes/releases.ts**
~~~
import { Router } from "express";
import prisma from "../db";

const router = Router();

// GET /api/releases
router.get("/", async (req, res) => {
  const { artistId } = req.query;

  let whereClause = {};
  if (artistId) {
    const parsedId = Number(artistId);
    if (isNaN(parsedId)) {
      return res.status(400).json({ error: "artistId must be a number" });
    }
    whereClause = { artistId: parsedId };
  }

  try {
    const releases = await prisma.release.findMany({
      where: whereClause,
      orderBy: { title: "asc" },
    });
    res.json(releases);
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
      include: include === "true" ? { tracks: true } : {},
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
  try {
    await prisma.release.delete({ where: { id: Number(req.params.id) } });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "failed to delete release" });
  }
});

export default router;

~~~

**routes/search.ts**
~~~
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
          OR: [{ author: { contains: q } }, { content: { contains: q } }],
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

~~~

**routes/tabs.ts**
~~~
import { Router } from "express";
import prisma from "../db";

const router = Router();

// GET /api/tabs
router.get("/", async (req, res) => {
  try {
    const tabs = await prisma.tab.findMany();
    res.json(tabs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "internal error" });
  }
});

// GET /api/tabs/:id
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const tab = await prisma.tab.findUnique({
      where: { id: Number(id) },
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

// POST /api/tabs - CLEANED UP
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

  try {
    await prisma.tab.delete({
      where: { id: Number(id) },
    });

    res.status(204).send();
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

~~~

**routes/tracks.ts**
~~~
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
      include: include === "true" ? { tabs: { omit: { content: true } } } : {},
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

~~~

