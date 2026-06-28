import { BsStars, BsStarFill, BsChevronRight } from "react-icons/bs";


function Home() {
  return (
    <main>
      <section className="relative h-[100vh] min-h-[700px]">
        <img
          src="https://res.cloudinary.com/dmmxb21nu/image/upload/v1782632554/sweet%20Image/glm9kjchv3dbi0qvz5ts.jpg"
          alt="Hotel"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-transparent  flex flex-col justify-center">
          <div className="w-full max-w-[1200px] px-4 md:px-8 mx-auto mt-32 md:mt-30">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 border border-white/30 rounded-full px-5 py-2 bg-black/40 backdrop-blur-sm mb-6">
              <BsStars color="#E5B648" size={16} />
              <span className="text-[10px] text-white tracking-[0.2em] font-semibold uppercase">Since a tradition of taste</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl md:text-3xl lg:text-[50px] font-serif font-bold leading-tight mb-8 text-white tracking-tight drop-shadow-md">
              Experience <br />
              <span className="text-[#E5B648]">Authentic</span> South <br />
              Indian Flavors
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-2xl text-gray-200 max-w-3xl mb-10 font-medium">
              Fresh ingredients, traditional recipes, memorable dining — served
              with warmth on Sathy Road, Kovilpalayam.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-5 md:mb-2">
              <button className="bg-[#E5B648] hover:bg-[#d4a537] text-white px-8 py-3.5 rounded-full font-bold flex items-center gap-2 transition-colors text-lg">
                View Menu <BsChevronRight className="stroke-1" />
              </button>
              <button className="bg-black/40 hover:bg-black/60 border border-white/40 text-white px-8 py-3.5 rounded-full font-bold transition-colors text-lg backdrop-blur-sm">
                Reserve Table
              </button>
            </div>

            {/* Bottom Bar */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 pt-8 md:pt-4 text-base text-gray-200">
              <div className="flex items-center gap-3">
                <div className="flex text-[#E5B648] text-xl gap-1">
                  <BsStarFill />
                  <BsStarFill />
                  <BsStarFill />
                  <BsStarFill />
                  <BsStarFill />
                </div>
                <span className="font-medium">4.9 from 1,200+ diners</span>
              </div>
              <div className="hidden md:block w-px h-6 bg-white/30"></div>
              <div className="font-medium">
                Pure Vegetarian • Family Dining • AC Hall
              </div>
            </div>
          </div>
        </div>

        <div>

        </div>
      </section>


      <div className="max-w-7xl mx-auto my-16 px-5"  >
        <div className="grid lg:grid-cols-2 overflow-hidden rounded-3xl shadow-2xl bg-[#F8F4EE]">
          {/* Left Image */}
          <div className=" hidden md:block  md:h-[650px]  ">
            <img
              // src="https://images.unsplash.com/photo-1587834323138-befbf2c33797?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fHRlYSUyMGltYWdlfGVufDB8fDB8fHww"
              src={"/s.PNG"}
              alt=""
              className="w-full h-full md:object-cover"
            />
          </div>

          {/* Right Content */}
          <div
            className="relative flex items-center justify-center md:px-16 py-5   md:bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1500&auto=format&fit=crop')",
            }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-white/85"></div>

            {/* Content */}
            <div className="relative z-10 text-center">
              <BsStars
                size={35}
                className="text-orange-500 mx-auto mb-6"
              />

              <h2 className=" text-3xl md:text-6xl font-serif text-gray-900">
                Good
              </h2>

              <h1 className="  text-2xl md:text-6xl italic text-orange-500 font-semibold mt-2">
                Morning
              </h1>

              <p className="mt-8 text-2xl text-gray-700">
                Start your day with
              </p>

              <h3 className="text-2xl font-bold tracking-widest mt-3">
                FRESH TEA
              </h3>

              <p className="mt-6 text-lg text-gray-600 leading-8">
                Wake up with the aroma of premium tea leaves,
                freshly brewed every morning to refresh your
                mind and energize your day.
              </p>

              <button className="mt-10 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full transition">
                Explore Menu
              </button>
            </div>
          </div>

        </div>
      </div>

    </main>
  );
}

export default Home;
