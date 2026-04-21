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
