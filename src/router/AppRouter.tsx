import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import AdminLayout from "../Layout/AdminLayout";
import ProtectedRoute from "./ProtectedRoute";

import Home from "../Screen/ClientScreen/Home";
import About from "../Screen/ClientScreen/About";
import Menu from "../Screen/ClientScreen/Menu";
import Gallery from "../Screen/ClientScreen/Gallery";
import Contact from "../Screen/ClientScreen/Contact";
import Feedback from "../Screen/ClientScreen/feedback";

import Login from "../Screen/Admin/Login";
import Dashboard from "../Screen/Admin/Dashboard";
import FeedbackList from "../Screen/Admin/FeedbackList";
import NotFound from "../Screen/NotFound";

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "menu",
        element: <Menu />,
      },
      {
        path: "gallery",
        element: <Gallery />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "feedback",
        element: <Feedback />,
      },
    ],
  },

  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "feedbackList",
        element: <FeedbackList />,
      },
    ],
  },

  {
  path: "*",
  element: <NotFound />,
}
]);

export default AppRouter;