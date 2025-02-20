import React from "react";
import extra_background from "../../assets/images/landing/extra_background.png";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

const Extra = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 gap-2 items-center mt-24 text-center container ">
      <h3 className="text-4xl sm:text-4xl md:text-6xl mt-6 ">Extras</h3>

      <div
        className="relative bg-cover bg-center w-full rounded-3xl p-8 mt-12 block md:flex justify-between"
        style={{
          backgroundImage: `url(${extra_background})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="bg-opacity-80 rounded-xl p-6 max-w-2xl mx-auto text-left">
          <h3 className="text-2xl font-bold text-gray-900">API Installation</h3>
          <p className="mt-4 text-gray-700 text-lg">
            The assigned developer will negotiate with you to determine what you
            need to get the best integration on your website and to match with
            your business model. The price may go up or down based on what you
            have ordered.
          </p>
          <div className="text-2xl font-bold text-gray-700 mt-6">
            Starting at{" "}
            <span className="text-3xl text-gray-900">$250.00 each</span>
          </div>
          <button className="bg-blue-600 text-white px-6 py-2 w-full text-center rounded-full mt-6 hover:bg-blue-700 transition duration-300 flex justify-center text-2xl ">
            Purchase
            <IoIosArrowForward className="ml-2 mt-1" />
          </button>
        </div>
        <div className="mt-8 text-left bg-white p-4 border rounded-3xl flex flex-col justify-center">
          <h4 className="text-lg font-bold text-gray-900 text-left mb-3">
            What's Included
          </h4>
          <ul className="mt-4 text-gray-700 ">
            <li className="flex items-start mb-3">
              {" "}
              <IoIosCheckmarkCircleOutline className="text-green-400 rounded-full w-[28px] h-[24px] text-xl mr-1" />{" "}
              Over 128 API choices in 12 business categories.
            </li>
            <li className="flex items-start mb-3">
              {" "}
              <IoIosCheckmarkCircleOutline className="text-green-400 rounded-full w-[28px] h-[24px] text-xl mr-1" />{" "}
              Qualified Fullstack Developer matched to your business model.
            </li>
            <li className="flex items-start mb-3">
              {" "}
              <IoIosCheckmarkCircleOutline className="text-green-400 rounded-full w-[28px] h-[24px] text-xl mr-1" />{" "}
              Goal-focused recommendations.
            </li>
            <li className="flex items-start mb-3">
              {" "}
              <IoIosCheckmarkCircleOutline className="text-green-400 rounded-full w-[28px] h-[24px] text-xl mr-1" />{" "}
              AI-powered automation and guaranteed results.
            </li>
            <li className="flex items-start">
              {" "}
              <IoIosCheckmarkCircleOutline className="text-green-400 rounded-full w-[28px] h-[24px] text-xl mr-1" />{" "}
              Negotiations secure and invoicing detailed.
            </li>
          </ul>
        </div>
      </div>

      <div
        className="relative bg-cover bg-center w-full rounded-3xl p-8 mt-12 block md:flex justify-between"
        style={{
          backgroundImage: `url(${extra_background})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="bg-opacity-80 rounded-xl p-6 max-w-2xl mx-auto text-left">
          <h3 className="text-2xl font-bold text-gray-900">
            Professional Design of Your ePub3 Landing Page Promotion
          </h3>
          <p className="mt-4 text-gray-700 text-lg">
            The assigned designer will negotiate with you to determine what you
            need for your landing page based on the create elements you want to
            add for a specific social marketing campaign. They will match the
            creative concepts based on your business model and product/service.
            The price may go up or down based on your needs.
          </p>
          <div className="text-2xl font-bold text-gray-700 mt-6">
            Starting at{" "}
            <span className="text-3xl text-gray-900">$250.00 each</span>
          </div>
          <button className="bg-blue-600 text-white px-6 py-2 w-full text-center rounded-full mt-6 hover:bg-blue-700 transition duration-300 flex justify-center text-2xl ">
            Purchase
            <IoIosArrowForward className="ml-2 mt-1" />
          </button>
        </div>
        <div className="mt-8 text-left bg-white p-4 border rounded-3xl flex flex-col justify-center">
          <h4 className="text-lg font-bold text-gray-900 text-left mb-3">
            What's Included
          </h4>
          <ul className="mt-4 text-gray-700 ">
            <li className="flex items-start mb-3">
              {" "}
              <IoIosCheckmarkCircleOutline className="text-green-400 rounded-full w-[28px] h-[24px] text-xl mr-1" />{" "}
              Created inside your account with the Embellisher editor.
            </li>
            <li className="flex items-start mb-3">
              {" "}
              <IoIosCheckmarkCircleOutline className="text-green-400 rounded-full w-[28px] h-[24px] text-xl mr-1" />{" "}
              Qualified Professional Graphics and Video Designer.
            </li>
            <li className="flex items-start mb-3">
              {" "}
              <IoIosCheckmarkCircleOutline className="text-green-400 rounded-full w-[28px] h-[24px] text-xl mr-1" />{" "}
              Matched to your campaign audience and objectives.
            </li>
            <li className="flex items-start mb-3">
              {" "}
              <IoIosCheckmarkCircleOutline className="text-green-400 rounded-full w-[28px] h-[24px] text-xl mr-1" />{" "}
              SEO/SEM created for your landing page.
            </li>
            <li className="flex items-start">
              {" "}
              <IoIosCheckmarkCircleOutline className="text-green-400 rounded-full w-[28px] h-[24px] text-xl mr-1" />{" "}
              Advanced analytics and insights.
            </li>
          </ul>
        </div>
      </div>

      <div
        className="relative bg-cover bg-center w-full rounded-3xl p-8 mt-12 block md:flex justify-between"
        style={{
          backgroundImage: `url(${extra_background})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="bg-opacity-80 rounded-xl p-6 max-w-2xl mx-auto text-left">
          <h3 className="text-2xl font-bold text-gray-900">
            Professional Design of Your Business Website Using Modern Styles and
            Technologies
          </h3>
          <p className="mt-4 text-gray-700 text-lg">
            The assigned designer/developer will negotiate with you to determine
            what you need for your new business model and/or the renovation of
            your old business model and product/service. The price may go up or
            down based on your requirements.
          </p>
          <div className="text-2xl font-bold text-gray-700 mt-6">
            Starting at{" "}
            <span className="text-3xl text-gray-900">$250.00 each</span>
          </div>
          <button className="bg-blue-600 text-white px-6 py-2 w-full text-center rounded-full mt-6 hover:bg-blue-700 transition duration-300 flex justify-center text-2xl ">
            Purchase
            <IoIosArrowForward className="ml-2 mt-1" />
          </button>
        </div>
        <div className="mt-8 text-left bg-white p-4 border rounded-3xl flex flex-col justify-center">
          <h4 className="text-lg font-bold text-gray-900 text-left mb-3">
            What's Included
          </h4>
          <ul className="mt-4 text-gray-700 ">
            <li className="flex items-start mb-3">
              {" "}
              <IoIosCheckmarkCircleOutline className="text-green-400 rounded-full w-[28px] h-[24px] text-xl mr-1" />{" "}
              Created on your website location with latest AI technologies.
            </li>
            <li className="flex items-start mb-3">
              {" "}
              <IoIosCheckmarkCircleOutline className="text-green-400 rounded-full w-[28px] h-[24px] text-xl mr-1" />{" "}
              Qualified Professional Business Website Designer.
            </li>
            <li className="flex items-start mb-3">
              {" "}
              <IoIosCheckmarkCircleOutline className="text-green-400 rounded-full w-[28px] h-[24px] text-xl mr-1" />{" "}
              Matched to your business objectives and brand model.
            </li>
            <li className="flex items-start mb-3">
              {" "}
              <IoIosCheckmarkCircleOutline className="text-green-400 rounded-full w-[28px] h-[24px] text-xl mr-1" />{" "}
              SEO/SEM created for your home page.
            </li>
            <li className="flex items-start">
              {" "}
              <IoIosCheckmarkCircleOutline className="text-green-400 rounded-full w-[28px] h-[24px] text-xl mr-1" />{" "}
              Guaranteed to match your design needs and instructions.
            </li>
          </ul>
        </div>
      </div>

      <div
        className="relative bg-cover bg-center w-full rounded-3xl p-8 mt-12 block md:flex justify-between"
        style={{
          backgroundImage: `url(${extra_background})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="bg-opacity-80 rounded-xl p-6 max-w-2xl mx-auto text-left">
          <h3 className="text-2xl font-bold text-gray-900">
            Professional Search Engine Optimization (SEO) for your business or
            promotion campaign.
          </h3>
          <p className="mt-4 text-gray-700 text-lg">
            The assigned SEO professional will assess and negotiate with you to
            determine what you need for your campaign and promotion. The SEO can
            apply to your business and for your campaign. Based on the latest
            Google and other search engine rules. The price may go up or down
            based on your specific needs for the website and/or campaign.
          </p>
          <div className="text-2xl font-bold text-gray-700 mt-6">
            Starting at{" "}
            <span className="text-3xl text-gray-900">$250.00 each</span>
          </div>
          <button className="bg-blue-600 text-white px-6 py-2 w-full text-center rounded-full mt-6 hover:bg-blue-700 transition duration-300 flex justify-center text-2xl ">
            Purchase
            <IoIosArrowForward className="ml-2 mt-1" />
          </button>
        </div>
        <div className="mt-8 text-left bg-white p-4 border rounded-3xl flex flex-col justify-center">
          <h4 className="text-lg font-bold text-gray-900 text-left mb-3">
            What's Included
          </h4>
          <ul className="mt-4 text-gray-700 ">
            <li className="flex items-start mb-3">
              {" "}
              <IoIosCheckmarkCircleOutline className="text-green-400 rounded-full w-[28px] h-[24px] text-xl mr-1" />{" "}
              Created for your chosen marketing campaign or webpage.
            </li>
            <li className="flex items-start mb-3">
              {" "}
              <IoIosCheckmarkCircleOutline className="text-green-400 rounded-full w-[28px] h-[24px] text-xl mr-1" />{" "}
              Qualified Professional SEO/SEM developer assigned.
            </li>
            <li className="flex items-start mb-3">
              {" "}
              <IoIosCheckmarkCircleOutline className="text-green-400 rounded-full w-[28px] h-[24px] text-xl mr-1" />{" "}
              Matched to your campaign audience and objectives.
            </li>
            <li className="flex items-start mb-3">
              {" "}
              <IoIosCheckmarkCircleOutline className="text-green-400 rounded-full w-[28px] h-[24px] text-xl mr-1" />{" "}
              Meets your business model campaign goals and objectives.
            </li>
            <li className="flex items-start">
              {" "}
              <IoIosCheckmarkCircleOutline className="text-green-400 rounded-full w-[28px] h-[24px] text-xl mr-1" />{" "}
              Advanced analytics and insights.
            </li>
          </ul>
        </div>
      </div>

      <div
        className="relative bg-cover bg-center w-full rounded-3xl p-8 mt-12 block md:flex justify-between"
        style={{
          backgroundImage: `url(${extra_background})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="bg-opacity-80 rounded-xl p-6 max-w-2xl mx-auto text-left">
          <h3 className="text-2xl font-bold text-gray-900">
          Order the Conversational Chat Avatar with "knowledge base."

          </h3>
          <p className="mt-4 text-gray-700 text-lg">
          The $100 fee is for use of the default avatars available in the paid plan. The $200 fee is for creation of your selfie
video sample that we'll use to create your Chat Avatar. Use this on your own home pages or inside the landing page, mail
campaigns, and Ayrshare posts to negotiate sales and inform your users about your products and services.
          </p>
          <div className="text-2xl font-bold text-gray-700 mt-6">
            Starting at{" "}
            <span className="text-3xl text-gray-900">$100.00 each</span>
          </div>
          <button className="bg-blue-600 text-white px-6 py-2 w-full text-center rounded-full mt-6 hover:bg-blue-700 transition duration-300 flex justify-center text-2xl ">
            Purchase
            <IoIosArrowForward className="ml-2 mt-1" />
          </button>
        </div>
        <div className="mt-8 text-left bg-white p-4 border rounded-3xl flex flex-col justify-center">
          <h4 className="text-lg font-bold text-gray-900 text-left mb-3">
            What's Included
          </h4>
          <ul className="mt-4 text-gray-700 ">
            <li className="flex items-start mb-3">
              {" "}
              <IoIosCheckmarkCircleOutline className="text-green-400 rounded-full w-[28px] h-[24px] text-xl mr-1" />{" "}
              Depending on your business brand, we'll develop the knowledge base content.
            </li>
            <li className="flex items-start mb-3">
              {" "}
              <IoIosCheckmarkCircleOutline className="text-green-400 rounded-full w-[28px] h-[24px] text-xl mr-1" />{" "}
              You select which default template you want to use in your chat or for the $200, create your own 2-3 minutes
of selife video.
            </li>
            <li className="flex items-start mb-3">
              {" "}
              <IoIosCheckmarkCircleOutline className="text-green-400 rounded-full w-[28px] h-[24px] text-xl mr-1" />{" "}
              Length of your chat avatar streams is based on the following calculation:              
            </li>
            <li className="flex items-start mb-3">
              {" "}
              <IoIosCheckmarkCircleOutline className="text-green-400 rounded-full w-[28px] h-[24px] text-xl mr-1" />{" "}
              When streaming an interactive avatar, 1 API credit equals 5 minutes of streaming.
            </li>
            
           
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Extra;
