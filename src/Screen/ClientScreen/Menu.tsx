import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../Const";

const categories = [
  { label: "South Indian", value: "south_indian" },
  // { label: "Breakfast", value: "breakfast" },
  { label: "Starters", value: "starters" },
  // { label: "Soups", value: "soups" },
  // { label: "North Indian", value: "north_indian" },
  { label: "Rice", value: "rice" },
  { label: "Noodles", value: "noodles" },
  { label: "Biryani", value: "biryani" },
  // { label: "Pasta", value: "pasta" },
  // { label: "Snacks", value: "snacks" },
  { label: "Beverages", value: "beverages" },
  // { label: "Desserts", value: "desserts" },
  { label: "Meals", value: "meals" },
];

function Menu() {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [limit] = useState(8);
  const [totalPages, setTotalPages] = useState(1);

  const [category, setCategory] = useState("starters");

  const getMenus = async () => {
    setLoading(true);

    try {
      const res = await axios.get(`${BASE_URL}/api/menu`, {
        params: {
          page,
          limit,
          category,
        },
      });

      setMenus(res.data.data);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMenus();
  }, [page, category]);

  return (
    <section className="max-w-7xl mx-auto px-2 py-5 mt-10 md:mt-22">
      {/* Heading */}
      <div className="text-center mb-2">
        <h1 className="text-4xl font-bold">Our Menu</h1>
        {/* <p className="text-gray-500 mt-2">
          Freshly prepared dishes with authentic taste.
        </p> */}
      </div>

      {/* Category Tabs */}
      <div className="sticky top-15 md:top-17 z-50 bg-white shadow-sm overflow-x-auto scrollbar-hide rounded-4xl">
        <div className="flex gap-3 min-w-max px-2 py-2">
          {categories.map((item) => (
            <button
              key={item.value}
              onClick={() => {
                setCategory(item.value);
                setPage(1);
              }}
              className={`px-6 py-3 rounded-full font-medium whitespace-nowrap transition-all duration-300 ${
                category === item.value
                  ? "bg-orange-500 text-white shadow-lg"
                  : "bg-gray-100 hover:bg-orange-100"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-20">
          <h2 className="text-xl font-semibold">Loading Menu...</h2>
        </div>
      )}

      {/* No Data */}
      {!loading && menus.length === 0 && (
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold">No menu items found.</h2>
        </div>
      )}

      {/* Cards */}
      {!loading && menus.length > 0 && (
        <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          {menus.map((menu: any) => (
            <div
              key={menu._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 hover:-translate-y-1"
            >
              <img
                src={menu.image}
                alt={menu.name}
                className="w-full h-40 sm:h-52 md:h-60 object-cover"
              />

              <div className="p-3 md:p-5">
                <div className="flex justify-between items-center">
                  <h2 className="text-sm sm:text-lg md:text-xl font-bold truncate">
                    {menu.name}
                  </h2>

                  <span className="text-green-600 font-bold text-sm sm:text-base md:text-lg">
                    ₹{menu.price}
                  </span>
                </div>

                <span className="inline-block mt-2 bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs sm:text-sm capitalize">
                  {menu.category.replace("_", " ")}
                </span>

                <p className="text-gray-600 mt-3 text-xs sm:text-sm line-clamp-2 md:line-clamp-3">
                  {menu.description}
                </p>

                <button className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 md:py-3 rounded-lg font-semibold text-sm md:text-base transition">
                  Order Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-5 mt-12">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-5 py-2 rounded bg-gray-200 disabled:opacity-50"
          >
            Previous
          </button>

          <span className="font-semibold">
            {page} / {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-5 py-2 rounded bg-orange-500 text-white disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
}

export default Menu;
