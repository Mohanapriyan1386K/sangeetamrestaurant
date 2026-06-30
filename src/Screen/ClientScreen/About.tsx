import {
  FaLeaf,
  FaUtensils,
  FaUsers,
  FaParking,
  FaAward,
  FaHeart,
} from "react-icons/fa";

const features = [
  {
    icon: <FaLeaf />,
    title: "Fresh Ingredients",
    desc: "We use fresh vegetables, aromatic spices, and premium-quality ingredients every day.",
  },
  {
    icon: <FaUtensils />,
    title: "Authentic Recipes",
    desc: "Traditional South Indian recipes prepared with passion and perfected over generations.",
  },
  {
    icon: <FaUsers />,
    title: "Family Dining",
    desc: "A spacious AC dining hall designed for families, friends, and celebrations.",
  },
  {
    icon: <FaParking />,
    title: "Ample Parking",
    desc: "Convenient parking space ensures a hassle-free dining experience.",
  },
];

export default function About() {
  return (
    <section className="bg-white py-24 mt-3">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}

        <div className="text-center max-w-3xl mx-auto">
          <span className="text-orange-600 font-semibold tracking-widest uppercase">
            About Us
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3">
            Where Every Meal Feels Like Home
          </h2>

          <div className="w-24 h-1 bg-orange-500 mx-auto mt-6 rounded-full"></div>

          <p className="mt-8 text-lg text-gray-600 leading-8">
            At <strong>Sree Sangeetham – The House of Taste</strong>, we bring
            together authentic South Indian flavors, fresh ingredients, and
            heartfelt hospitality to create memorable dining experiences for
            every guest.
          </p>
        </div>

        {/* Content */}

        <div className="grid lg:grid-cols-2 gap-16 items-center mt-20">
          {/* Left */}

          <div>
            <img
              src={"https://res.cloudinary.com/dmmxb21nu/image/upload/v1782800430/sn_dsqsnh.png"}
              alt="Restaurant"
              className="rounded-3xl shadow-2xl object-cover w-full h-[600px]"
            />
          </div>

          {/* Right */}

          <div>
            <h3 className="text-3xl font-bold text-gray-900">
              Since Tradition Meets Taste
            </h3>

            <p className="mt-6 text-gray-600 leading-8">
              Located on Sathy Road, Kovilpalayam, Sree Sangeetham has become a
              favorite destination for families and food lovers seeking
              authentic vegetarian cuisine.
            </p>

            <p className="mt-5 text-gray-600 leading-8">
              Every meal is prepared using fresh ingredients, traditional
              cooking techniques, and our commitment to exceptional quality,
              hygiene, and customer service.
            </p>

            <div className="grid grid-cols-2 gap-6 mt-10">
              {features.map((item, index) => (
                <div
                  key={index}
                  className="bg-orange-50 rounded-2xl p-6 hover:bg-orange-100 transition"
                >
                  <div className="text-3xl text-orange-600">{item.icon}</div>

                  <h4 className="font-bold text-lg mt-4">{item.title}</h4>

                  <p className="text-gray-600 mt-2 text-sm leading-6">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Statistics */}

        <div className="grid md:grid-cols-4 gap-8 mt-24">
          <div className="text-center p-8 rounded-2xl shadow-lg">
            <FaAward className="mx-auto text-4xl text-orange-500" />

            <h3 className="text-4xl font-bold mt-5">10+</h3>

            <p className="text-gray-500 mt-2">Years of Excellence</p>
          </div>

          <div className="text-center p-8 rounded-2xl shadow-lg">
            <FaUsers className="mx-auto text-4xl text-orange-500" />

            <h3 className="text-4xl font-bold mt-5">50K+</h3>

            <p className="text-gray-500 mt-2">Happy Customers</p>
          </div>

          <div className="text-center p-8 rounded-2xl shadow-lg">
            <FaUtensils className="mx-auto text-4xl text-orange-500" />

            <h3 className="text-4xl font-bold mt-5">100+</h3>

            <p className="text-gray-500 mt-2">Delicious Dishes</p>
          </div>

          <div className="text-center p-8 rounded-2xl shadow-lg">
            <FaHeart className="mx-auto text-4xl text-orange-500" />

            <h3 className="text-4xl font-bold mt-5">4.9★</h3>

            <p className="text-gray-500 mt-2">Customer Rating</p>
          </div>
        </div>
      </div>
    </section>
  );
}
