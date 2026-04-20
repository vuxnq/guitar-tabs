# /fe

frontend web app for the guitar tabs app.

built with [react](https://react.dev/), [react router v7](https://reactrouter.com/), [material ui](https://mui.com/), and [vite](https://vitejs.dev/).

## usage

```sh
# install dependencies (if not done from root)
npm install

# start dev server
npm run dev

# build for production
npm run build
```

## routes

- `/` - home page with quick links and project info
- `/search` - global search results page
- `/artists` - browse all artists
- `/artists/:id` - artist detail and discography
- `/tracks/:id` - track detail and available tab versions
- `/tracks/:id/tabs/:tabId` - read a specific tab, edit/delete actions
- `/tabs/new` - smart form to create a new tab (and missing parents)
- `/tabs/:id/edit` - form to fix tab content or author
- `/tabs` - browse all recently added tabs
