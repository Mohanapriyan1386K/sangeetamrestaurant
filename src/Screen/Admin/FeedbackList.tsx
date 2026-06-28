import { useEffect, useState } from "react";
import axios from "axios";
import { FaStar, FaPhone, FaEnvelope, FaUtensils } from "react-icons/fa";
import { BASE_URL } from "../../Const";
import Loader from "../../Compent/Loader";
import OnlyLoader from "../../Compent/OnlyLoader";

export default function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFeedbacks();
  }, []);

  const getFeedbacks = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/feedback`);
      setFeedbacks(res.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating: any) => (
    <div className="flex text-yellow-400">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          className={star <= rating ? "text-yellow-400" : "text-gray-300"}
        />
      ))}
    </div>
  );

  if (loading) {
    return <div className="flex justify-center mt-10"><OnlyLoader/></div>;
  }

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen w-full max-w-[1300px] mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6">Customer Feedback</h2>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
        {feedbacks.map((item: any) => (
          <div
            key={item._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-4 sm:p-5"
          >
            {/* Header */}
            <div className="flex justify-between items-start gap-2">
              <div className="min-w-0">
                <h3 className="font-bold text-base sm:text-lg truncate">
                  {item.customerName}
                </h3>
                <p className="text-gray-500 text-sm">Table #{item.tableNumber}</p>
              </div>

              <div className="bg-orange-100 text-orange-600 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap shrink-0">
                {item.ratings.overall}/5 ⭐
              </div>
            </div>

            {/* Contact */}
            <div className="mt-4 space-y-2 text-gray-600 text-sm">
              <div className="flex items-center gap-2">
                <FaPhone className="shrink-0" />
                <span className="truncate">{item.mobileNumber}</span>
              </div>

              <div className="flex items-center gap-2">
                <FaEnvelope className="shrink-0" />
                <span className="truncate">{item.email || "No Email"}</span>
              </div>

              <div className="flex items-center gap-2">
                <FaUtensils className="shrink-0" />
                Table {item.tableNumber}
              </div>
            </div>

            {/* Ratings */}
            <div className="mt-5 space-y-3">
              {[
                { label: "Food", value: item.ratings.food },
                { label: "Service", value: item.ratings.service },
                { label: "Ambience", value: item.ratings.ambience },
                { label: "Cleanliness", value: item.ratings.cleanliness },
                { label: "Value", value: item.ratings.valueForMoney },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-center">
                  <span className="text-sm sm:text-base">{label}</span>
                  {renderStars(value)}
                </div>
              ))}
            </div>

            {/* Comment */}
            <div className="mt-5">
              <p className="font-semibold text-sm sm:text-base">💬 Feedback</p>
              <p className="text-gray-600 mt-1 text-sm">
                {item.likedMost || "No feedback"}
              </p>
            </div>

            {/* Suggestions */}
            {item.suggestions && (
              <div className="mt-3">
                <p className="font-semibold text-sm sm:text-base">💡 Suggestion</p>
                <p className="text-gray-600 text-sm">{item.suggestions}</p>
              </div>
            )}

            {/* Footer */}
            <div className="mt-6 flex justify-between items-center gap-2">
              <span
                className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
                  item.wouldRecommend
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {item.wouldRecommend ? "👍 Recommend" : "👎 Not Recommend"}
              </span>

              <span className="text-gray-400 text-xs whitespace-nowrap">
                {new Date(item.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}