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
    children: [
      { index: true, element: <Home /> },
      { path: "search", element: <Search />, loader: searchLoader },

      // artists
      { path: "artists", element: <Artists />, loader: artistsLoader },
      {
        path: "artists/:artistId",
        element: <ArtistDetail />,
        loader: artistDetailLoader,
      },

      // tracks
      {
        path: "tracks/:trackId",
        element: <TrackDetail />,
        loader: trackDetailLoader,
        children: [
          { index: true, element: <TabIndex /> },
          {
            path: "tabs/:tabId",
            element: <TabDetail />,
            loader: tabDetailLoader,
            action: tabDetailAction,
          },
        ],
      },

      // tabs
      { path: "tabs", element: <Tabs />, loader: tabsLoader },
      {
        path: "tabs/new",
        element: <TabNew />,
        loader: tabNewLoader,
        action: tabNewAction,
      },
      {
        path: "tabs/:tabId/edit",
        element: <TabEdit />,
        loader: tabEditLoader,
        action: tabEditAction,
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
