import { useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import * as Yup from "yup";
import { useFormik } from "formik";
import { BASE_URL } from "../../Const";

const ratingFields = [
  "food",
  "service",
  "ambience",
  "cleanliness",
  "valueForMoney",
];

const validationSchema = Yup.object({
  customerName: Yup.string().required("Customer name is required"),
  mobileNumber: Yup.string()
    .matches(/^[0-9]{10}$/, "Enter a valid mobile number")
    .required("Mobile number is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  tableNumber: Yup.number()
    .required("Table number is required")
    .positive(),
  likedMost: Yup.string().required("Please enter your feedback"),
  suggestions: Yup.string(),
});

const emojis = [
  { value: 1, emoji: "😡", label: "Poor" },
  { value: 2, emoji: "😕", label: "Bad" },
  { value: 3, emoji: "😐", label: "Average" },
  { value: 4, emoji: "😊", label: "Good" },
  { value: 5, emoji: "😍", label: "Excellent" },
];

export default function Feedback() {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const formik = useFormik({
    initialValues: {
      customerName: "",
      mobileNumber: "",
      email: "",
      tableNumber: "",
      ratings: {
        food: 0,
        service: 0,
        ambience: 0,
        cleanliness: 0,
        valueForMoney: 0,
        overall: 0,
      },
      likedMost: "",
      suggestions: "",
      wouldRecommend: true,
      visitAgain: true,
    },

    validationSchema,

    onSubmit: async (values, { resetForm }) => {
      try {
        setLoading(true);
        await axios.post(` ${BASE_URL}/api/feedback`, values);
        setShowModal(true);
        resetForm();
      } catch (err) {
        alert("Submission Failed");
      } finally {
        setLoading(false);
      }
    },
  });

  const setRating = (field: string, value: number) => {
    formik.setFieldValue("ratings", {
      ...formik.values.ratings,
      [field]: value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-100 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-8 mt-20">

        <h1 className="text-4xl font-bold text-center text-orange-600">
          Hotel Feedback
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          We'd love to hear your experience.
        </p>

        <form onSubmit={formik.handleSubmit} className="space-y-6">

          {/* Personal Details */}
          <div className="grid md:grid-cols-2 gap-5">

            <div>
              <input
                name="customerName"
                placeholder="Customer Name"
                value={formik.values.customerName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-orange-500"
              />
              {formik.touched.customerName && formik.errors.customerName && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.customerName}</p>
              )}
            </div>

            <div>
              <input
                name="mobileNumber"
                placeholder="Mobile Number"
                type="number"
                minLength={10}
                value={formik.values.mobileNumber}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                  formik.setFieldValue("mobileNumber", val);
                }}
                onBlur={formik.handleBlur}
                maxLength={10}
                inputMode="numeric"
                className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-orange-500"
              />
              {formik.touched.mobileNumber && formik.errors.mobileNumber && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.mobileNumber}</p>
              )}
            </div>

            <div>
              <input
                name="email"
                placeholder="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-orange-500"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
              )}
            </div>

            <div>
              <input
                name="tableNumber"
                placeholder="Table Number"
                type="number"
                value={formik.values.tableNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-orange-500"
              />
              {formik.touched.tableNumber && formik.errors.tableNumber && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.tableNumber}</p>
              )}
            </div>

          </div>

          {/* Star Ratings */}
          {ratingFields.map((item) => (
            <div key={item}>
              <div className="flex justify-between mb-2">
                <span className="capitalize font-semibold">
                  {item.replace(/([A-Z])/g, " $1")}
                </span>
                <span className="font-bold text-orange-500">
                  {formik.values.ratings[item as keyof typeof formik.values.ratings]}/5
                </span>
              </div>

              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    size={30}
                    onClick={() => setRating(item, star)}
                    className={`cursor-pointer transition ${
                      star <= formik.values.ratings[item as keyof typeof formik.values.ratings]
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          ))}

          {/* Overall Experience */}
          <div>
            <h2 className="font-semibold mb-3 text-lg">Overall Experience</h2>

            <div className="flex justify-between">
              {emojis.map((item) => (
                <button
                  type="button"
                  key={item.value}
                  onClick={() => setRating("overall", item.value)}
                  className={`text-4xl p-3 rounded-full transition hover:scale-110 ${
                    formik.values.ratings.overall === item.value
                      ? "bg-orange-100"
                      : ""
                  }`}
                >
                  {item.emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Feedback Text */}
          <div>
            <textarea
              rows={4}
              name="likedMost"
              placeholder="What did you like most?"
              value={formik.values.likedMost}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-orange-500"
            />
            {formik.touched.likedMost && formik.errors.likedMost && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.likedMost}</p>
            )}
          </div>

          <textarea
            rows={4}
            name="suggestions"
            placeholder="Suggestions"
            value={formik.values.suggestions}
            onChange={formik.handleChange}
            className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-orange-500"
          />

          {/* Checkboxes */}
          <div className="flex flex-col md:flex-row gap-5">

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="wouldRecommend"
                checked={formik.values.wouldRecommend}
                onChange={formik.handleChange}
              />
              Would Recommend
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="visitAgain"
                checked={formik.values.visitAgain}
                onChange={formik.handleChange}
              />
              Visit Again
            </label>

          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white py-4 rounded-xl text-lg font-bold transition"
          >
            {loading ? "Submitting..." : "Submit Feedback"}
          </button>

        </form>

        {showModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div className="bg-white rounded-2xl shadow-xl w-[90%] max-w-md p-8 text-center animate-scale">
      <div className="text-6xl mb-4">🎉</div>

      <h2 className="text-3xl font-bold text-gray-800">
        Thank You!
      </h2>

      <p className="mt-3 text-gray-600">
        Your feedback has been submitted successfully.
      </p>

      <p className="mt-2 text-sm text-gray-500">
        We appreciate your valuable feedback and look forward to serving you again.
      </p>

      <button
        onClick={() => setShowModal(false)}
        className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition"
      >
        Done
      </button>
    </div>
  </div>
)}
      </div>
    </div>
  );
}
