# plan

### idea
the core idea is a community database for guitar tabs

to keep the data clean and avoid duplicate mess, we are categorizing tabs logically: artists -> releases -> tracks -> tabs

instead of forcing users to click through multiple pages to add an artist, then an album, then a track, we're going to build a single "smart form" that handles all of that in one go

### database scheme
prisma (sqlite)

- **artist**
  - `id` (pk)
  - `name` (string)
- **release**
  - `id` (pk)
  - `title` (string)
  - `artistId` (fk -> artist)
- **track**
  - `id` (pk)
  - `title` (string)
  - `releaseId` (fk -> release)
- **tab** (main CRUD target)
  - `id` (pk)
  - `content` (text) - the raw ASCII tab text
  - `author` (string) - who transcribed it
  - `trackId` (fk -> track)
  - `createdAt` (datetime)

### front-end
react and react router

- `/` **(home):** simple landing page with our names, project info, and quick links
- `/artists` **(artists list):** displays a list of all artists in the database
- `/artists/:id` **(artist detail):** shows the artist's discography (all releases and their tracks)
- `/tracks/:id` **(track detail):** shows all available tabs for a specific track
- `/tabs/:id` **(tab detail):** shows the full tablature using a `<pre>` tag so the monospace formatting doesn't break. "edit" and "delete" buttons live here
- `/tabs/new` **(create):** this is where our smart form lives
- `/tabs/:id/edit` **(update):** a prefilled form for fixing mistakes in the tab content or author name

### smart form
to make adding tabs painless, the `/tabs/new` page will use react autocomplete components (like MUI's `Autocomplete` with `freeSolo` enabled)

1. **artist:** user starts typing. they can pick an existing artist or create a new one
2. **release:** unlocks after picking an artist. shows only releases for that specific artist. pick or create new
3. **track:** unlocks after picking a release. select or create
4. **tab content:** a giant `<textarea>` for the tab itself, plus a small input for the author's name
5. **submit:** sends data to the `POST /api/tabs/smart` endpoint, which handles the cascading creation of any missing entities

### endpoints

our API is fully modularized and supports the `?include=true` query parameter on GET requests to easily fetch nested relations without multiple roundtrips

**artists:**
- `GET /api/artists` - gets all artists
- `GET /api/artists/:id?include=true` - gets one artist (optionally includes their releases and tracks)
- `POST /api/artists` - creates an artist
- `DELETE /api/artists/:id` - deletes an artist (cascades to releases, tracks, and tabs)

**releases:**
- `GET /api/releases?artistId={id}` - gets releases (optionally filtered by artist)
- `GET /api/releases/:id?include=true` - gets one release (optionally includes its tracks and artist info)
- `POST /api/releases` - creates a release
- `DELETE /api/releases/:id` - deletes a release

**tracks:**
- `GET /api/tracks?releaseId={id}` - gets tracks (optionally filtered by release)
- `GET /api/tracks/:id?include=true` - Gets one track (optionally includes its tabs, release, and artist info)
- `POST /api/tracks` - creates a track
- `DELETE /api/tracks/:id` - deletes a track

**tabs (main target):**
- `GET /api/tabs?trackId={id}` - gets tabs (optionally filtered by track)
- `GET /api/tabs/:id?include=true` - gets one tab (optionally includes its full nested hierarchy)
- `POST /api/tabs` - creates a tab (requires an existing `trackId`)
- `POST /api/tabs/smart` - **BFF endpoint:** takes flat payload (artist, release, track, tab) and safely creates the whole tree
- `PUT /api/tabs/:id` - updates tab content or author
- `DELETE /api/tabs/:id` - deletes the tab

**search:**
- `GET /api/search?q={query}` - global search across artists, releases, tracks, and tab contents. returns a unified array of mixed types

---

# Project Instructions
Write a React single page application that will connect to an API server. The app should allow CRUD (Create, Read, Update, Delete) operations on a single type of resource (For example Blog Posts) and limited CRUD operations on another connected resource (For example Comments).

Your project will consist of 2 JS apps:
- Back-end (folder be) which will be NodeJS Express Server
- Front-end (folder fe) which will be React SPA application
- Both of them will live in the same repository 
- 2x package.json. One will be for BE in folder be, one will be for FE in folder fe.

## Example project:
I have a blog post application with posts and comments. 
- On the homepage there should be welcome text describing the project and your name and a few things about you. 
- On url (route) /posts
    - It should show simple list of blog posts with their title and author (not the full blog post)
    - Each blog post entry should contain a link to the blog post detail
    - There should be a link for page where you can create new post 
- On the detail page of single post (on url /posts/<someID>) 
    - It should show all entity data (e.g. post title, text, author, creation date) 
    - We should see all comments associated with the Post and there should be a way to post a new comment. 
    - There should be a link to a form that allows editing the blog post
    - There should be a link (or button) to delete the blog post
- Throughout the whole app, I should see a navigation that allows me to navigate to the list of blog posts, or the home page


You can pick any combination of 2 resources. For example: (Movies & Actors, Trains & Train Wagons, Authors & Books) come up with your own! In a worse case scenario you can use Post/Comments but try to come up with something different and interesting! 

## Other info:
- We have to be able to run your project! 
    - This means that if I do `git clone` there will be readme, with introduction to the project and simple steps I need to do to run the project. Preferably `cd xx  && npm i && npm start` and the project runs. 
    - Before final hand in, try your project in a new folder (preferably new environment, that it really runs - try cloning from repository) 
    - Make sure that your app is initialized with some data or has some initialization scripts so we can see it in full glory. 
- Other technologies for Database
    - You can pick any technology for the DB. We recommend using SQLite, but if you want to utilize MongoDB, Firestore, DynamoDB or anything like that, you can do so. However we need to be able to run the project on our machines and you need to fulfill the detailed requirements.
    - If you pick a “different” DB but we have to be able to run this on our machines in docker or utilize cloud DB. So for example if you want to use PostgreSQL there needs to be just a few commands how to run this using docker. 
    - If you don’t know what docker is - stick with SQLite or cloud DB. 

## Total evaluation:
- 40 points
- 5 extra points (complexity, project idea, exceptional execution in any area) 

## Detailed evaluation:
### Back-end (NodeJS):
- Functional requirements
    - At least 2 resources (2 tables connected to each other via key)
    - All CRUD operations on one resource
    - At least 2 operations on second resource
- ORM Layer & DB schema
    - Connection to the DB via a ORM library 
    - Error handling
- Express REST API layer 
    - Valid API up to the REST specification for all operations on resources
    - Status handling & error messages
### Front-end (React):
- Functional requirements
    - App Layout with Navigation (Routing)
    - Main page with information about the app
    - All CRUD operations on one resource (Create Form, Edit Form, List/Table, Delete, Detail View) 
    - At least few operations on second resource
- Component structure
    - Split your application into several components. Don’t make huge ones
    - Each page should consist of several components 
    - Top level component for the page with data processing
    - “Smart” component with the business logic and hooks
    - Presentational components for the UI using UI libraries
- Client-side routing
    - There should be proper routes for all pages
    - Best practices according to react router 
    - Use loaders and actions
    - React router version 6+ 
- Data fetching
    - Custom API functions
    - Proper loading states
    - Proper error handling / states
        - For example when you start up just FE without BE  
### Overall:
- Code quality / project setup
    - README, Prettier, Able to run the whole project easily! 

## Must use:
- [React](https://reactjs.org/docs/getting-started.html)
- [NodeJS Express](https://expressjs.com/)

### Recommended (we worked with them on labs):
- Routing - [React Router](https://reactrouter.com/) ⚠️Highly recommended. React router must be v7⚠️
- ORM - [Prisma](https://www.prisma.io/)
- UI Component Library - [MUI](https://mui.com/)
- Code formatting - [Prettier](https://prettier.io/)
- API requests - [Axios](https://github.com/axios/axios) or [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
- Typescript

### Libraries which you can check out:
- Easier Forms - [React hook form](https://react-hook-form.com/), [Formik](https://formik.org/), [React final form](https://final-form.org/docs/react-final-form/getting-started)
- UI Libraries - [MUI](https://mui.com/material-ui/), [Tailwind](https://tailwindcss.com/), [ShadCN](https://ui.shadcn.com/), [Mantine](https://mantine.dev/), [ChakraUI](https://chakra-ui.com/),  [Antd](https://ant.design/), [Semantic UI](https://semantic-ui.com/)
- API requests - [Native JS fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
- Routing - [React Location](https://github.com/tannerlinsley/react-location)
- Data Fetching - [TanStack Query](https://github.com/TanStack/query)
