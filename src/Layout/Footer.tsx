import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";

const quickLinks = [
  { name: "About", path: "/about" },
  { name: "Menu", path: "/menu" },
  { name: "Gallery", path: "/gallery" },
  { name: "Contact", path: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-[#FBF6EA] mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo */}
          <div>
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-orange-400 flex items-center justify-center text-white text-xl">
                🍴
              </div>

              <h2 className="text-2xl font-bold text-green-900 font-serif">
                Hotel Sree Sangeetham
              </h2>
            </div>

            <p className="mt-5 text-gray-700 leading-7 max-w-sm">
              Authentic South Indian flavors served fresh, with warmth and
              tradition.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-5">Quick Links</h3>

            <ul className="space-y-3">
              {quickLinks.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-gray-700 hover:text-orange-500 transition"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-bold text-lg mb-5">Follow Us</h3>

            <div className="flex gap-4">
              <a
                href="#"
                className="w-12 h-12 border rounded-full flex items-center justify-center hover:bg-orange-400 hover:text-white transition"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                className="w-12 h-12 border rounded-full flex items-center justify-center hover:bg-orange-400 hover:text-white transition"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                className="w-12 h-12 border rounded-full flex items-center justify-center hover:bg-orange-400 hover:text-white transition"
              >
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 text-center text-gray-600">
          © 2026 Hotel Sree Sangeetham. All rights reserved.
        </div>
      </div>
    </footer>
  );
}