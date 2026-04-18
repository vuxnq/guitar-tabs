import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./App.tsx";
import { ErrorBoundary } from "./components/ErrorBoundary.tsx";

// routes
import { Home } from "./routes/Home.tsx";
import { Search, loader as searchLoader } from "./routes/Search.tsx";
import { Artists, loader as artistsLoader } from "./routes/Artists.tsx";
import {
  ArtistDetail,
  loader as artistDetailLoader,
} from "./routes/ArtistDetail.tsx";
import {
  TrackDetail,
  loader as trackDetailLoader,
} from "./routes/TrackDetail.tsx";
import { Tabs, loader as tabsLoader } from "./routes/Tabs.tsx";
import {
  TabDetail,
  loader as tabDetailLoader,
  action as tabDetailAction,
} from "./routes/TabDetail.tsx";
import {
  TabNew,
  loader as tabNewLoader,
  action as tabNewAction,
} from "./routes/TabNew.tsx";
import {
  TabEdit,
  loader as tabEditLoader,
  action as tabEditAction,
} from "./routes/TabEdit.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorBoundary />,
    children: [
      { index: true, element: <Home /> },
      { path: "search", element: <Search />, loader: searchLoader },

      // Artists
      { path: "artists", element: <Artists />, loader: artistsLoader },
      {
        path: "artists/:artistId",
        element: <ArtistDetail />,
        loader: artistDetailLoader,
      },

      // Tracks
      {
        path: "tracks/:trackId",
        element: <TrackDetail />,
        loader: trackDetailLoader,
      },

      // Tabs
      { path: "tabs", element: <Tabs />, loader: tabsLoader },
      {
        path: "tabs/new",
        element: <TabNew />,
        loader: tabNewLoader,
        action: tabNewAction,
      },
      {
        path: "tabs/:tabId",
        element: <TabDetail />,
        loader: tabDetailLoader,
        action: tabDetailAction,
      },
      {
        path: "tabs/:tabId/edit",
        element: <TabEdit />,
        loader: tabEditLoader,
        action: tabEditAction,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
