function Contact() {
  return (
    <section className="bg-[#faf8f5] py-20">
      <div className="max-w-7xl mx-auto px-5">

        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800">
            Contact Us
          </h2>
          <p className="text-gray-500 mt-3">
            We'd love to hear from you. Feel free to contact us anytime.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">

          {/* Contact Details */}
          <div className="bg-white rounded-2xl shadow-lg p-8">

            <h3 className="text-2xl font-bold mb-8">
              Get In Touch
            </h3>

            <div className="space-y-6">

              <div>
                <p className="text-gray-500 text-sm">Restaurant</p>
                <h4 className="font-semibold text-lg">
                  Sangeetham Veg Restaurant
                </h4>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Phone</p>
                <p className="font-medium">
                  +91 98765 43210
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Email</p>
                <p className="font-medium">
                  info@sangeetham.com
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Address</p>
                <p className="font-medium">
                  123, Main Road,
                  <br />
                  Salem, Tamil Nadu
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Opening Hours</p>
                <p className="font-medium">
                  Monday - Sunday
                  <br />
                  7:00 AM - 11:00 PM
                </p>
              </div>

            </div>

          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">

            <form className="space-y-5">

              <div>
                <label className="font-medium">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full mt-2 border rounded-lg p-3 outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="font-medium">
                  Phone Number
                </label>
                <input
                  type="text"
                  placeholder="Enter your phone number"
                  className="w-full mt-2 border rounded-lg p-3 outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="font-medium">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full mt-2 border rounded-lg p-3 outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="font-medium">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="Enter subject"
                  className="w-full mt-2 border rounded-lg p-3 outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="font-medium">
                  Message
                </label>
                <textarea
                  rows={5}
                  placeholder="Write your message..."
                  className="w-full mt-2 border rounded-lg p-3 outline-none resize-none focus:border-orange-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-lg font-semibold transition"
              >
                Send Message
              </button>

            </form>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Contact;