import { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

const Menu = ({ data, mode }: any) => {
  console.log(data);
  console.log(mode);
 
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (mode === "update" && data) {
      formik.setValues({
        name: data.name,
        description: data.description,
        category: data.category,
        price: data.price,
        image: null, // keep file input empty
      });

      setPreview(data.image); // show existing image
    }
  }, [mode, data]);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      category: "",
      price: "",
      image: null,
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      description: Yup.string().required("Description is required"),
      category: Yup.string().required("Category is required"),
      price: Yup.number().required("Price is required"),
    }),

    onSubmit: async (values, { resetForm }) => {
      try {
        setLoading(true);

        const formData = new FormData();

        formData.append("name", values.name);
        formData.append("description", values.description);
        formData.append("category", values.category);
        formData.append("price", values.price);
        formData.append("image", values?.image);

        const res =
          mode === "update"
            ? await axios.put(
                `http://localhost:5000/api/menu/${data._id}`,
                formData,
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                },
              )
            : await axios.post("http://localhost:5000/api/menu", formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              });

        alert(res.data.message);

        alert(res.data.message);

        resetForm();
        setPreview(null);
      } catch (err: any) {
        console.log(err);
        alert(err.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    },
  });

  const handleImage = (e: any) => {
    const file = e.target.files[0];

    if (!file) return;

    formik.setFieldValue("image", file);

    setPreview(URL.createObjectURL(file));
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="mb-8">
        {/* <h2 className="text-3xl font-bold text-gray-800">Add New Menu</h2> */}
        {/* <p className="text-gray-500 mt-2">
            Create a new menu item for your restaurant.
          </p> */}
      </div>

      {/* Menu Name */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Menu Name
        </label>

        <input
          type="text"
          name="name"
          placeholder="Chicken Biryani"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
        />

        {formik.touched.name && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
        )}
      </div>

      {/* Description */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Description
        </label>

        <textarea
          rows={5}
          name="description"
          placeholder="Enter food description..."
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition resize-none"
        />

        {formik.touched.description && (
          <p className="text-red-500 text-sm mt-1">
            {formik.errors.description}
          </p>
        )}
      </div>

      {/* Category + Price */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Category
          </label>

          <select
            name="category"
            value={formik.values.category}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">Select Category</option>
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

          {formik.touched.category && formik.errors.category && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.category}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Price (₹)
          </label>

          <input
            type="number"
            name="price"
            placeholder="250"
            value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
          />

          {formik.touched.price && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.price}</p>
          )}
        </div>
      </div>

      {/* Upload */}
      <div className="mb-8">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Menu Image
        </label>

        <label className="cursor-pointer flex flex-col justify-center items-center border-2 border-dashed border-orange-400 rounded-2xl h-72 bg-orange-50 hover:bg-orange-100 transition">
          <input type="file" accept="image/*" hidden onChange={handleImage} />

          {preview ? (
            <img
              src={preview}
              alt="preview"
              className="w-full h-full object-cover rounded-2xl"
            />
          ) : (
            <>
              <div className="text-6xl">🍽️</div>

              <h3 className="mt-4 text-lg font-semibold text-gray-700">
                Upload Menu Image
              </h3>

              <p className="text-gray-500 mt-1">PNG, JPG or JPEG</p>
            </>
          )}
        </label>

        {formik.touched.image && (
          <p className="text-red-500 text-sm mt-2">{formik.errors.image}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-xl text-lg font-semibold hover:scale-[1.02] transition duration-300 shadow-lg disabled:opacity-50"
      >
        {loading ? "Uploading..." : mode == "Add" ? "Create Menu" : "Edit"}
      </button>
    </form>
  );
};

export default Menu;
