import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../Layout/MainLayout";
import AdminLayout from "../Layout/AdminLayout";
import ProtectedRoute from "./ProtectedRoute";
import Loader from "../Compent/Loader";

// Lazy Loading
const Home = lazy(() => import("../Screen/ClientScreen/Home"));
const About = lazy(() => import("../Screen/ClientScreen/About"));
const Menu = lazy(() => import("../Screen/ClientScreen/Menu"));
const Gallery = lazy(() => import("../Screen/ClientScreen/Gallery"));
const Contact = lazy(() => import("../Screen/ClientScreen/Contact"));
const Feedback = lazy(() => import("../Screen/ClientScreen/Feedback"));


const  Imageadd=lazy(()=>import("../Screen/Imageadd"))
const Login = lazy(() => import("../Screen/Admin/Login"));
const Dashboard = lazy(() => import("../Screen/Admin/Dashboard"));
const FeedbackList = lazy(() => import("../Screen/Admin/FeedbackList"));
const NotFound = lazy(() => import("../Screen/NotFound"));
const Menumeangement=lazy(()=>import("../Screen/Admin/MenuMangement"))

const withSuspense = (Component: React.ReactNode) => (
  <Suspense fallback={<Loader />}>{Component}</Suspense>
);

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: withSuspense(<Home />),
      },
      {
        path: "about",
        element: withSuspense(<About />),
      },
      {
        path: "menu",
        element: withSuspense(<Menu />),
      },
      {
        path: "gallery",
        element: withSuspense(<Gallery />),
      },
      {
        path: "contact",
        element: withSuspense(<Contact />),
      },
      {
        path: "feedback",
        element: withSuspense(<Feedback />),
      },
      {
        path:"imageadd",
        element:withSuspense(<Imageadd/>)
      }
    ],
  },

  {
    path: "/login",
    element: withSuspense(<Login />),
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
        element: withSuspense(<Dashboard />),
      },
      {
        path: "feedbackList",
        element: withSuspense(<FeedbackList />),
      },
      {
        path:"menumeangement",
        element:withSuspense(<Menumeangement/>)
      }
    ],
  },

  {
    path: "*",
    element: withSuspense(<NotFound />),
  },
]);

export default AppRouter;