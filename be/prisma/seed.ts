import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL || "file:./dev.db",
});

const prisma = new PrismaClient({ adapter });

const MIN_NUM_TABS = 1;
const MAX_NUM_TABS = 20;

// random pools
const AUTHORS = [
  "fartguitar123",
  "dawiawdhoo",
  "neumim_tabovat",
  "evzen",
  "nacopouzivatsongsterr",
  "stringbender",
  "MetalHead86",
  "tabsonrequest@example.com",
  "anon_player",
  "fartSniffer",
  "evzenuv bracha",
  "donnie darko",
  "cameron winter",
  "ThePartyThatNeverEnds"
];

const TAB_TEMPLATES = [
  `Standard Tuning (E A D G B E)\nCapo on 2nd fret\n\nIntro / Verse Pattern:\ne|-------0---------------1-------|\nB|-----1---1-----------1---1-----|\nG|---2-------2---2---2-------2---|\nD|-----------------3-----------3-|\nA|-0-----------------------------|\nE|-------------------------------|`,
  
  `Drop C Tuning (C G C F A D)\nTempo: 230 BPM (Chaos)\n\nIntro Breakdown:\nD|-----------------------------------------|\nA|-----------------------------------------|\nF|-----------------------------------------|\nC|-0-0-0-0-0---0-0-0-0---0-0-0---0-0-------|\nG|-0-0-0-0-0---0-0-0-0---0-0-0---0-0-------|\nC|-0-0-0-0-0---0-0-0-0---0-0-0---0-0-------|\n  PM.......   PM.....   PM...   PM.`,
  
  `Standard Tuning (E A D G B E)\n\nMain Riff:\nE|---------------------------------------------------------|\nB|---------------------------------------------------------|\nG|---------------------------------------------------------|\nD|---------------------------------------------------------|\nA|-------1/3--1-----------1/3--1-------3/5--3--1h3---------|\nE|--3--3---------3--3--3----------3--3-------------1h3-3---|`,
  
  `Half-step down (Eb Ab Db Gb Bb Eb)\n\nSolo:\nEb|---------------------------------------------|\nBb|-12b14---12~--------10h12p10\\8--10~----------|\nGb|---------------------------------------9v----|\nDb|---------------------------------------------|\nAb|---------------------------------------------|\nEb|---------------------------------------------|`,
  
  `Chords used:\nAm    x02210\nC     x32010\nG     320003\nF     133211\n\nVerse:\nAm              C\n  Walking down the street...\nG                    F\n  Looking for a place to go`
];

// real data structure
const SEED_DATA = [
  {
    artist: "Elliott Smith",
    releases: [
      {
        title: "Either/Or",
        tracks: ["Between the Bars", "Angeles", "Ballad of Big Nothing", "Pictures of Me", "Rose Parade"]
      },
      {
        title: "XO",
        tracks: ["Sweet Adeline", "Tomorrow Tomorrow", "Waltz #2 (XO)", "Baby Britain", "Pitseleh"]
      }
    ]
  },
  {
    artist: "Converge",
    releases: [
      {
        title: "Jane Doe",
        tracks: ["Concubine", "Fault and Fracture", "Distance and Meaning", "Hell to Pay", "Jane Doe"]
      }
    ]
  },
  {
    artist: "Radiohead",
    releases: [
      {
        title: "OK Computer",
        tracks: ["Airbag", "Paranoid Android", "Subterranean Homesick Alien", "Exit Music (For a Film)", "Let Down", "Karma Police"]
      },
      {
        title: "The Bends",
        tracks: ["Planet Telex", "The Bends", "High and Dry", "Fake Plastic Trees", "Bones", "Just"]
      }
    ]
  },
  {
    artist: "Nirvana",
    releases: [
      {
        title: "Nevermind",
        tracks: ["Smells Like Teen Spirit", "In Bloom", "Come As You Are", "Breed", "Lithium", "Polly"]
      },
      {
        title: "In Utero",
        tracks: ["Serve the Servants", "Scentless Apprentice", "Heart-Shaped Box", "Rape Me", "Dumb"]
      }
    ]
  },
  {
    artist: "Arctic Monkeys",
    releases: [
      {
        title: "AM",
        tracks: ["Do I Wanna Know?", "R U Mine?", "One for the Road", "Arabella", "No. 1 Party Anthem"]
      },
      {
        title: "Favourite Worst Nightmare",
        tracks: ["Brianstorm", "Teddy Picker", "D View From the Afternoon", "Fluorescent Adolescent", "505"]
      }
    ]
  },
  {
    artist: "Red Hot Chili Peppers",
    releases: [
      {
        title: "Californication",
        tracks: ["Around the World", "Parallel Universe", "Scar Tissue", "Otherside", "Get on Top", "Californication"]
      },
      {
        title: "Blood Sugar Sex Magik",
        tracks: ["The Power of Equality", "If You Have to Ask", "Breaking the Girl", "Suck My Kiss", "Under the Bridge"]
      }
    ]
  },
  {
    artist: "Led Zeppelin",
    releases: [
      {
        title: "Led Zeppelin IV",
        tracks: ["Black Dog", "Rock and Roll", "The Battle of Evermore", "Stairway to Heaven", "Misty Mountain Hop"]
      }
    ]
  }
];

// helpers
const getRandomItem = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

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
                const tabsToCreate = Array.from({ length: numTabs }).map(() => ({
                  author: getRandomItem(AUTHORS),
                  content: getRandomItem(TAB_TEMPLATES),
                }));
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
