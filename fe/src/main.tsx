import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./App.tsx";
import { ErrorBoundary } from "./components/ErrorBoundary";

// routes
import { Home } from "./routes/Home";
import { Search, loader as searchLoader } from "./routes/Search";
import { Artists, loader as artistsLoader } from "./routes/Artists";
import {
  ArtistDetail,
  loader as artistDetailLoader,
} from "./routes/ArtistDetail";
import {
  TrackDetail,
  loader as trackDetailLoader,
} from "./routes/TrackDetail";
import { Tabs, loader as tabsLoader } from "./routes/Tabs";
import {
  TabDetail,
  loader as tabDetailLoader,
  action as tabDetailAction,
} from "./routes/TabDetail";
import {
  TabNew,
  loader as tabNewLoader,
  action as tabNewAction,
} from "./routes/TabNew";
import {
  TabEdit,
  loader as tabEditLoader,
  action as tabEditAction,
} from "./routes/TabEdit";
import { TabIndex } from "./routes/TabIndex";
import { NotFound } from "./routes/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorBoundary />,
    handle: { crumb: () => ({ label: "home", path: "/" }) },
    children: [
      { index: true, element: <Home /> },
      { path: "search", element: <Search />, loader: searchLoader },

      // artists
      {
        path: "artists",
        element: <Artists />,
        loader: artistsLoader,
        handle: { crumb: () => ({ label: "artists", path: "/artists" }) },
      },
      {
        path: "artists/:artistId",
        element: <ArtistDetail />,
        loader: artistDetailLoader,
        handle: { 
          crumb: (data: any) => [
            { label: "artists", path: "/artists" },
            { label: data?.name || "artist", path: `/artists/${data?.id}` }
          ] 
        }
      },

      // tracks
      {
        path: "tracks/:trackId",
        element: <TrackDetail />,
        loader: trackDetailLoader,
        handle: { 
          crumb: (data: any) => [
            { label: "artists", path: "/artists" },
            { label: data?.release?.artist?.name || "artist", path: `/artists/${data?.release?.artist?.id}` },
            { label: data?.release?.title || "release", path: `/artists/${data?.release?.artist?.id}#release-${data?.release?.id}` },
            { label: data?.title || "track", path: `/tracks/${data?.id}` }
          ] 
        },
        children: [
          { index: true, element: <TabIndex /> },
          {
            path: "tabs/:tabId",
            element: <TabDetail />,
            loader: tabDetailLoader,
            action: tabDetailAction,
            handle: { crumb: (data: any) => ({ label: `tab by ${data?.author || 'author'}`, path: "#" }) },
          },
        ],
      },

      // tabs
      {
        path: "tabs",
        element: <Tabs />,
        loader: tabsLoader,
        handle: { crumb: () => ({ label: "tabs", path: "/tabs" }) },
      },
      {
        path: "tabs/new",
        element: <TabNew />,
        loader: tabNewLoader,
        action: tabNewAction,
        handle: { crumb: () => ({ label: "new tab", path: "/tabs/new" }) }
      },
      {
        path: "tabs/:tabId/edit",
        element: <TabEdit />,
        loader: tabEditLoader,
        action: tabEditAction,
        handle: { crumb: () => ({ label: "edit tab", path: "#" }) }
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
