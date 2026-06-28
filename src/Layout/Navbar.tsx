import { useState } from "react";
import {  NavLink } from "react-router-dom";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import { GiKnifeFork } from "react-icons/gi";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Menu", path: "/menu" },
  { name: "Gallery", path: "/gallery" },
  { name: "Contact", path: "/contact" },
  {name:"Feedback",path:"/feedback"}
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white max-w-7xl mx-auto shadow-md rounded-full mt-4 px-6 py-3 relative">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-orange-400 flex items-center justify-center text-white text-xl">
            <GiKnifeFork />
          </div>

          <h1 className="text-xl md:text-2xl font-bold text-green-900 font-serif">
            Sree Sangeetham
          </h1>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-10 font-medium text-gray-700">
          {navLinks.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-orange-500 font-semibold border-b-2 border-orange-500 pb-1"
                    : "text-gray-700 hover:text-orange-500 transition"
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Desktop Button */}
        <button className="hidden md:block bg-orange-400 hover:bg-orange-500 text-white px-4 py-1 rounded-full font-semibold">
          Reserve
        </button>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-3xl" onClick={() => setOpen(!open)}>
          {open ? <HiOutlineX /> : <HiOutlineMenuAlt3 />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white rounded-2xl shadow-lg p-5 z-50">
          <ul className="flex flex-col gap-5 text-center font-medium">
            {navLinks.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.path === "/"}
                  className={({ isActive }) =>
                    `relative pb-1 transition-all duration-300 ${isActive
                      ? "text-orange-500 font-semibold after:w-full"
                      : "text-gray-700 hover:text-orange-500 after:w-0 hover:after:w-full"
                    } after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-orange-500 after:transition-all after:duration-300 after:content-['']`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}

            <li>
              <button className="w-full bg-orange-400 hover:bg-orange-500 text-white py-3 rounded-full">
                Reserve
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
