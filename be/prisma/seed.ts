import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { AUTHORS, TAB_TEMPLATES, SEED_DATA } from "./seed-data";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL || "file:./dev.db",
});

const prisma = new PrismaClient({ adapter });

const MIN_NUM_TABS = 1;
const MAX_NUM_TABS = 20;

// helpers
const getRandomItem = <T>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];
const getRandomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// seed script
async function main() {
  console.log("seeding db...");

  for (const data of SEED_DATA) {
    console.log(`processing artist: ${data.artist}...`);

    await prisma.artist.upsert({
      where: { name: data.artist },
      update: {},
      create: {
        name: data.artist,
        releases: {
          create: data.releases.map((release) => ({
            title: release.title,
            tracks: {
              create: release.tracks.map((track) => {
                const numTabs = getRandomInt(MIN_NUM_TABS, MAX_NUM_TABS);
                const tabsToCreate = Array.from({ length: numTabs }).map(
                  () => ({
                    author: getRandomItem(AUTHORS),
                    content: getRandomItem(TAB_TEMPLATES),
                  }),
                );
                return {
                  title: track,
                  tabs: {
                    create: tabsToCreate,
                  },
                };
              }),
            },
          })),
        },
      },
    });
  }

  console.log("seeding done!");
}

main()
  .catch((e) => {
    console.error("seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
