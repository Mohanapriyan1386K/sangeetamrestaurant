import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function MainLayout() {
  return (
    <div className="min-h-screen">
      <div className="fixed top-3 left-0 w-full z-50">
        <Navbar />
      </div>

      {/* Prevent content from hiding behind the fixed navbar */}
      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default MainLayout;
