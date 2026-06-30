import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "../../Compent/Modal";
import Menu from "./component/Menu";
import PageHeader from "../../Compent/PageHeader";
import { BASE_URL } from "../../Const";
import OnlyLoader from "../../Compent/OnlyLoader";

const MenuList = () => {
  const [menus, setMenus] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("");
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(false);

  // Pagination
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  // Filters
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");


  useEffect(() => {
    getMenus();
  }, [page, search, category]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  // Fetch data when debouncedSearch changes
  useEffect(() => {
    getMenus();
  }, [debouncedSearch]);

  const getMenus = async () => {
    setLoading(true);

    try {
      const res = await axios.get(`${BASE_URL}/api/menu`, {
        params: {
          page,
          limit,
          name: search || undefined,
          category: category || undefined,
        },
      });

      setMenus(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteMenu = async (id: string) => {
    const confirmDelete = window.confirm("Delete this menu?");

    if (!confirmDelete) return;

    try {
      await axios.delete(`${BASE_URL}/api/menu/${id}`);
      alert("Deleted Successfully");
      getMenus();
    } catch (err) {
      console.log(err);
      alert("Delete Failed");
    }
  };

  const editMenu = (menu: any) => {
    setOpen(true);
    setMode("update");
    setData(menu);
  };

  return (
    <div className="max-w-7xl mx-auto p-2">
      <PageHeader
        title="Menu Management"
        buttonText="+ Add Menu"
        onButtonClick={() => {
          setMode("Add");
          setData(null);
          setOpen(true);
        }}
      />

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-4 my-5">
        <input
          type="text"
          placeholder="Search Menu..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="border rounded-lg px-4 py-2 flex-1 outline-none"
        />

        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1);
          }}
          className="border rounded-lg px-4 py-2 outline-none"
        >
          <option value="">All Categories</option>
          <option value="starters">Starters</option>
          <option value="soups">Soups</option>
          <option value="breakfast">Breakfast</option>
          <option value="south_indian">South Indian</option>
          <option value="north_indian">North Indian</option>
          <option value="rice">Rice</option>
          <option value="biryani">Biryani</option>
          <option value="noodles">Noodles</option>
          <option value="pasta">Pasta</option>
          <option value="snacks">Snacks</option>
          <option value="beverages">Beverages</option>
          <option value="desserts">Desserts</option>
          <option value="meals">Meals</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100">
        <div className="overflow-y-auto">
          <table className="w-full">
            <thead className="sticky top-0 bg-gradient-to-r from-orange-500 to-red-500 text-white">
              <tr>
                <th className="px-6 py-4">Image</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {menus.length > 0 ? (
                menus.map((menu: any, index: number) => (
                  <tr
                    key={menu._id}
                    className="border-b hover:bg-orange-50 transition"
                    style={{
                      animation: `fadeIn .4s ease ${index * 0.05}s both`,
                    }}
                  >
                    <td className="p-4">
                      <img
                        src={menu.image}
                        alt={menu.name}
                        className="w-20 h-20 rounded-xl object-cover mx-auto"
                      />
                    </td>

                    <td className="font-semibold">{menu.name}</td>

                    <td className="max-w-xs truncate">{menu.description}</td>

                    <td>
                      <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full capitalize">
                        {menu.category}
                      </span>
                    </td>

                    <td>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                        ₹ {menu.price}
                      </span>
                    </td>

                    <td>
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => editMenu(menu)}
                          className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => deleteMenu(menu._id)}
                          className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-10 text-gray-500 font-medium"
                  >
                    {loading ? (
                      <div className="flex justify-center mt-5">
                        <OnlyLoader />
                      </div>
                    ) : (
                      "Menu is Not Found"
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className="px-4 py-2 rounded-lg bg-gray-200 disabled:opacity-50"
        >
          Previous
        </button>

        <span className="font-semibold">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((prev) => prev + 1)}
          className="px-4 py-2 rounded-lg bg-orange-500 text-white disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <Modal
        open={open}
        mode={mode}
        onClose={() => setOpen(false)}
        title="Menu"
        data={data}
      >
        <Menu data={data} mode={mode} />
      </Modal>
    </div>
  );
};

export default MenuList;
