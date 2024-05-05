import React, { useEffect, StrictMode } from "react";
import * as ReactDOM from "react-dom/client";

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Navigate,
} from "react-router-dom";

import Access from "./pages/access/access";
import Discover from "./pages/discover/discover";
import Event from "./pages/event/event";
import Create from "./pages/create/create";

import "./index.css";
import Cookies from "js-cookie";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Access />,
  },
  {
    path: "access",
    element: <Access />,
  },
  {
    path: "discover",
    element: <Discover />,
  },
  {
    path: "event/:id",
    element: <Event />,
  },
  {
    path: "create",
    element: <Create />,
  },
]);

function checkSession() {
  const token = Cookies.get("token");
  console.log("Session checked...");
  if (!token) {
    localStorage.removeItem("displayName");
    router.navigate("/access");
  }
}

function App() {
  const loginCheckInterval = 30; // Time in seconds between periodic JWT validations
  useEffect(() => {
    checkSession();
    const intervalId = setInterval(checkSession, loginCheckInterval * 1000);
    return () => clearInterval(intervalId);
  }, []);
  return (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
