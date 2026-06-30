import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "../../Compent/Modal";
import Menu from "./component/Menu";
import PageHeader from "../../Compent/PageHeader";
import { BASE_URL } from "../../Const";

const MenuList = () => {
  const [menus, setMenus] = useState([]);
  const [open, setOpen] = useState(false);
  const [mode, setmode] = useState("");
  const [data, setdata] = useState<any>();

  useEffect(() => {
    getMenus();
  }, []);

  const getMenus = async () => {
    try {
      
      const res = await axios.get(`${BASE_URL} /api/menu`);
      // const res = await axios.get("http://localhost:5000/api/menu");
      setMenus(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteMenu = async (id: any) => {
    const confirmDelete = window.confirm("Delete this menu?");

    if (!confirmDelete) return;

    try {
      // await axios.delete(`http://localhost:5000/api/menu/${id}`);

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
    setmode("update");
    setdata(menu);
  };

  return (
    <div className="max-w-7xl mx-auto p-2 ">
      <PageHeader
        title="Menu Management"
        buttonText="+ Add Menu"
        onButtonClick={() => {
          setmode("Add");
          setOpen(true);
        }}
      />

      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="max-h-[600px] overflow-y-auto">
          <table className="w-full">
            {/* Header */}
            <thead className="sticky top-0 bg-gradient-to-r from-orange-500 to-red-500 text-white z-10">
              <tr>
                <th className="px-6 py-4">Image</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {menus.map((menu: any, index: number) => (
                <tr
                  key={menu._id}
                  className="border-b hover:bg-orange-50 transition-all duration-300 hover:scale-[1.01]"
                  style={{
                    animation: `fadeIn .4s ease ${index * 0.05}s both`,
                  }}
                >
                  <td className="p-4">
                    <div className="flex justify-center">
                      <img
                        src={menu.image}
                        alt={menu.name}
                        className="w-20 h-20 rounded-xl object-cover shadow-lg border-2 border-white hover:scale-110 transition duration-300"
                      />
                    </div>
                  </td>

                  <td className="font-semibold text-gray-800">{menu.name}</td>

                  <td className="text-gray-500 max-w-xs truncate">
                    {menu.description}
                  </td>

                  <td>
                    <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-medium capitalize">
                      {menu.category}
                    </span>
                  </td>

                  <td>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">
                      ₹ {menu.price}
                    </span>
                  </td>

                  <td>
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => editMenu(menu)}
                        className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 hover:scale-105 active:scale-95 transition duration-300 shadow-md"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteMenu(menu._id)}
                        className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 hover:scale-105 active:scale-95 transition duration-300 shadow-md"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
