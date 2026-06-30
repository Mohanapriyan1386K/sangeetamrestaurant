import { RouterProvider } from "react-router-dom";
import AppRouter from "./router/AppRouter";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        limit={3}
        toastStyle={{
          borderRadius: "14px",
          fontSize: "15px",
          fontWeight: "500",
          padding: "14px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
        }}
      />
      <RouterProvider router={AppRouter} />
    </>
  );
}

export default App;
