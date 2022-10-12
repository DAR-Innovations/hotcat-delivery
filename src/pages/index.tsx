import { PAGES_LINKS } from "common/pageLinks";
import Layout from "components/Layout/Layout";
import HomeBanner from "components/UI/Banners/HomeBanner";
import DeliveryCarOutline from "components/UI/Icons/DeliveryCarOutline";
import HeartOutline from "components/UI/Icons/HeartOutline";
import RamenOutline from "components/UI/Icons/RamenOutline";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <Layout title={PAGES_LINKS.HOME.name}>
      <HomeBanner />

      <main className="mt-10 sm:mt-20 flex flex-col gap-y-12 sm:gap-y-20 lg:gap-y-24 mb-30">
        <div className="flex flex-col items-center gap-5 sm:gap-8 lg:gap-10">
          <h2 className="text-gray-800 font-bold text-xl sm:text-2xl text-center leading-none">
            We offer people best <br /> way to enjoy their food
          </h2>
          <div className="flex items-center gap-x-3 sm:gap-x-7 lg:gap-x-16">
            <div className="border-2 border-orange-400 p-6 rounded-xl flex flex-col items-center justify-center gap-y-6 w-[110px] h-[160px] sm:min-w-[160px] sm:max-w-[160px] sm:h-[160px] lg:w-[190px] lg:h-[190px]">
              <RamenOutline className="w-10 h-10 sm:w-14 sm:h-14" />
              <p className="text-sm sm:text-base text-center text-gray-900">
                Best food <br /> experience
              </p>
            </div>
            <div className="border-2 border-orange-400 p-6 rounded-xl flex flex-col items-center justify-center gap-y-4  w-[110px] h-[160px] sm:min-w-[160px] sm:max-w-[160px] sm:h-[160px] lg:w-[190px] lg:h-[190px]">
              <DeliveryCarOutline
                className="w-16 h-16"
              />
              <p className="text-sm sm:text-base text-center text-gray-900">
                Different delivery <br /> services
              </p>
            </div>
            <div className="border-2 border-orange-400 p-6 rounded-xl flex flex-col items-center justify-center gap-y-5  w-[110px] h-[160px] sm:min-w-[160px] sm:max-w-[160px] sm:h-[160px] lg:w-[190px] lg:h-[190px]">
              <HeartOutline className="w-10 h-10 lg:w-14 lg:h-14" />
              <p className="text-sm sm:text-base text-center text-gray-900">
                Food from <br /> restaurants you like
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-y-2 sm:gap-x-12 lg:gap-x-24">
          <div>
            <picture>
              <img
                loading="lazy"
                className="min-w-[300px] h-[300px] sm:min-w-[300px] sm:h-[300px] lg:min-w-[430px] lg:h-[430px]"
                src="/assets/plateWithFishPhoto.png"
                alt="food"
              />
            </picture>
          </div>
          <div className="flex flex-col items-center sm:items-start gap-y-4 sm:gap-y-5 sm:w-[100%] lg:w-[30%]">
            <h2 className="text-center sm:text-start text-xl sm:text-3xl font-bold leading-none">
              Living well begins <br /> with eating well
            </h2>
            <p className="text-start px-5 sm:px-0 gray-600 text-base sm:text-lg leading-none">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using Content here, content
              here, making it look like readable English.
            </p>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Home;
