# /be

backend api for the guitar tabs app.

built with [express](https://expressjs.com/), [prisma](https://www.prisma.io/), and [better-sqlite3](https://github.com/WiseLibs/better-sqlite3).

## database schema

- **artist:** `id`, `name`
- **release:** `id`, `title`, `artistId`
- **track:** `id`, `title`, `releaseId`
- **tab:** `id`, `content` (ascii), `author`, `trackId`, `createdAt`

## usage

```sh
# initial setup (install, generate prisma, push schema, seed db)
npm run setup

# start dev server
npm run dev

# reset database and re-seed
npm run db:reset
```

## api endpoints

### artists

- `GET /api/artists` - get all artists
- `GET /api/artists/:id?include=true` - get one artist (optionally includes releases and tracks)
- `POST /api/artists` - create artist
- `DELETE /api/artists/:id` - delete artist (cascades down)

### releases

- `GET /api/releases?artistId={id}` - get releases (optional filter)
- `GET /api/releases/:id?include=true` - get one release
- `POST /api/releases` - create release
- `DELETE /api/releases/:id?cleanup=true` - delete release. if `cleanup=true`, deletes parent artist if empty

### tracks

- `GET /api/tracks?releaseId={id}` - get tracks (optional filter)
- `GET /api/tracks/:id?include=true` - get one track
- `POST /api/tracks` - create track
- `DELETE /api/tracks/:id?cleanup=true` - delete track. if `cleanup=true`, cascade deletes empty parents

### tabs

- `GET /api/tabs?trackId={id}` - get tabs (optional filter)
- `GET /api/tabs/:id?include=true` - get one tab
- `POST /api/tabs` - create tab
- `POST /api/tabs/smart` - handles cascading creation of artist, release, track, and tab
- `PUT /api/tabs/:id` - update tab content or author
- `DELETE /api/tabs/:id?cleanup=true` - delete tab. if `cleanup=true`, cascade deletes empty parents

### search

- `GET /api/search?q={query}&limit={limit}` - global search across all entities

#### pagination

all `GET` endpoints that return a list (artists, releases, tracks, tabs) support pagination via query parameters

**query parameters:**

- `page` (default: 1)
- `limit` (default: 25 , max: 50)
