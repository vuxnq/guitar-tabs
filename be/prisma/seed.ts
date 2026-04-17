import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL! });

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("seeding db...");

  // elliott smith
  const elliott = await prisma.artist.upsert({
    where: { name: "Elliott Smith" },
    update: {},
    create: {
      name: "Elliott Smith",
      releases: {
        create: {
          title: "Either/Or",
          tracks: {
            create: [
              {
                title: "Between the Bars",
                tabs: {
                  create: {
                    author: "dawiawdhoo",
                    content: `Standard Tuning (E A D G B E)
Capo on 2nd fret

Intro / Verse Pattern:
Am              F
e|-------0---------------1-------|
B|-----1---1-----------1---1-----|
G|---2-------2---2---2-------2---|
D|-----------------3-----------3-|
A|-0-----------------------------|
E|-------------------------------|`,
                  },
                },
              },
              {
                title: "Angeles",
                tabs: {
                  create: {
                    author: "neumim_tabovat",
                    content: `Standard Tuning (E A D G B E)
Capo on 5th fret
(Fast fingerpicking pattern)`,
                  },
                },
              },
            ],
          },
        },
      },
    },
  });

  // converge
  const converge = await prisma.artist.upsert({
    where: { name: "Converge" },
    update: {},
    create: {
      name: "Converge",
      releases: {
        create: {
          title: "Jane Doe",
          tracks: {
            create: [
              {
                title: "Concubine",
                tabs: {
                  create: {
                    author: "fartguitar123",
                    content: `Drop C Tuning (C G C F A D)
Tempo: 230 BPM (Chaos)

Intro Breakdown:
D|-----------------------------------------|
A|-----------------------------------------|
F|-----------------------------------------|
C|-0-0-0-0-0---0-0-0-0---0-0-0---0-0-------|
G|-0-0-0-0-0---0-0-0-0---0-0-0---0-0-------|
C|-0-0-0-0-0---0-0-0-0---0-0-0---0-0-------|
  PM.......   PM.....   PM...   PM.`,
                  },
                },
              },
              {
                title: "Jane Doe",
                tabs: {
                  create: {
                    author: "evzen",
                    content: `Drop C Tuning
(Epic 11-minute closer)`,
                  },
                },
              },
            ],
          },
        },
      },
    },
  });
  console.log("seeding done");
}

main()
  .catch((e) => {
    console.error("seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
