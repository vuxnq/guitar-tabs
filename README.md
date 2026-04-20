# guitar tabs.

a community-driven database for your favorite guitar tablatures.

instead of forcing users to click through multiple pages to add an artist, then an album, then a track, this app uses a single "smart form" that handles hierarchical creation in one go.

this repository contains both the frontend (`fe/`) and backend (`be/`) applications.

## requirements
- [node.js](https://nodejs.org/) (v18+)
- npm

## usage
```sh
# clone repo
git clone https://github.com/vsb-vaj/2026s-project-tra0163-tra0164.git
cd 2026s-project-tra0163-tra0164/

# install all dependencies, generate prisma client, push schema, and seed database
npm run setup

# start both frontend and backend concurrently
npm run dev
```

for more details, check out [`be/README.md`](be/README.md) and [`fe/README.md`](fe/README.md).
