import express from "express";
import cors from "cors";
import prisma from "./db";

const app = express();
const PORT = process.env.PORT || 3000;

// middlewares
app.use(cors());
app.use(express.json());

// test
app.get("/", (req, res) => {
  res.send("API running");
});

// helpers
// GET /api/artists - get all artists
app.get("/api/artists", async (req, res) => {
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

// GET /api/releases - get all releases (optionally filtered by artistId)
app.get("/api/releases", async (req, res) => {
  const { artistId } = req.query;

  try {
    const releases = await prisma.release.findMany({
      where: artistId ? { artistId: Number(artistId) } : {},
      orderBy: { title: "asc" },
    });
    res.json(releases);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "failed to fetch releases" });
  }
});

// GET /api/tracks - get all tracks (optionally filtered by releaseId)
app.get("/api/tracks", async (req, res) => {
  const { releaseId } = req.query;

  try {
    const tracks = await prisma.track.findMany({
      where: releaseId ? { releaseId: Number(releaseId) } : {},
      orderBy: { title: "asc" },
    });
    res.json(tracks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "failed to fetch tracks" });
  }
});

// tabs
// GET /api/tabs - get all tabs with include
app.get("/api/tabs", async (req, res) => {
  try {
    const tabs = await prisma.tab.findMany({
      include: {
        track: {
          include: {
            release: {
              include: {
                artist: true,
              },
            },
          },
        },
      },
    });
    res.json(tabs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "internal error" });
  }
});

// GET /api/tabs/:id - get a single tab by id
app.get('/api/tabs/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const tab = await prisma.tab.findUnique({
      where: { id: Number(id) },
      include: {
        track: {
          include: {
            release: {
              include: {
                artist: true
              }
            }
          }
        }
      }
    });

    if (!tab) {
      return res.status(404).json({ error: 'tab not found' });
    }

    res.json(tab);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'failed to fetch the tab' });
  }
});

// PUT /api/tabs/:id - update tab content or author
app.put('/api/tabs/:id', async (req, res) => {
  const { id } = req.params;
  const { content, author } = req.body;

  try {
    const updatedTab = await prisma.tab.update({
      where: { id: Number(id) },
      data: {
        content,
        author
      }
    });

    res.json(updatedTab);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'failed to update the tab' });
  }
});

// DELETE /api/tabs/:id - delete a tab
app.delete('/api/tabs/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.tab.delete({
      where: { id: Number(id) }
    });

    // 204 no content - standard for successful deletions
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'failed to delete the tab' });
  }
});

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
