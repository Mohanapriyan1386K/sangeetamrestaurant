import { useState } from "react";
import {
  FiMenu,
  FiX,
  FiHome,
  FiMessageSquare,
} from "react-icons/fi";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  const menus = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: <FiHome />,
    },
    {
      name: "Feedback",
      path: "/admin/feedbackList",
      icon: <FiMessageSquare />,
    },
    // {
    //   name: "Customers",
    //   path: "/customers",
    //   icon: <FiUsers />,
    // },
    // {
    //   name: "Reports",
    //   path: "/reports",
    //   icon: <FiBarChart2 />,
    // },
    // {
    //   name: "Settings",
    //   path: "/settings",
    //   icon: <FiSettings />,
    // },
  ];

  return (
    <>
      {/* Mobile Top Bar */}
      <header className="md:hidden fixed top-0 left-0 w-full h-16 bg-slate-900 text-white flex items-center justify-between px-4 z-50">
        <h1 className="text-xl font-bold">Hotel Admin</h1>

        <button onClick={() => setOpen(true)}>
          <FiMenu size={28} />
        </button>
      </header>

      {/* Background Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-slate-900 text-white z-50 transform transition-transform duration-300
        ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-5 border-b border-slate-700">
          <h2 className="text-2xl font-bold text-orange-400">Hotel Admin</h2>

          <button className="md:hidden" onClick={() => setOpen(false)}>
            <FiX size={28} />
          </button>
        </div>

        {/* Menu */}
        <nav className="mt-5 px-3">
          {menus.map((menu) => (
            <NavLink
              key={menu.name}
              to={menu.path}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-lg mb-2 transition-all ${
                  isActive
                    ? "bg-orange-500 text-white"
                    : "hover:bg-slate-800 text-gray-300"
                }`
              }
            >
              <span className="text-xl">{menu.icon}</span>
              <span>{menu.name}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
