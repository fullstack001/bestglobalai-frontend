import React from "react";
import extra_background from "../../assets/images/landing/extra_background.png";
import { IoIosArrowForward, IoIosCheckmarkCircleOutline } from "react-icons/io";

const extraData = [
  {
    title: "API Installation",
    description:
      "The assigned developer will negotiate with you to determine what you need to get the best integration on your website and to match with your business model. The price may go up or down based on what you have ordered.",
    price: "$250.00 each",
    features: [
      "Over 128 API choices in 12 business categories.",
      "Qualified Fullstack Developer matched to your business model.",
      "Goal-focused recommendations.",
      "AI-powered automation and guaranteed results.",
      "Negotiations secure and invoicing detailed.",
    ],
  },
  {
    title: "Professional Design of Your ePub3 Landing Page Promotion",
    description:
      "The assigned designer will negotiate with you to determine what you need for your landing page based on the creative elements you want to add for a specific social marketing campaign. They will match the creative concepts based on your business model and product/service.",
    price: "$250.00 each",
    features: [
      "Created inside your account with the Embellisher editor.",
      "Qualified Professional Graphics and Video Designer.",
      "Matched to your campaign audience and objectives.",
      "SEO/SEM created for your landing page.",
      "Advanced analytics and insights.",
    ],
  },
  {
    title:
      "Professional Design of Your Business Website Using Modern Styles and Technologies",
    description:
      "The assigned designer/developer will negotiate with you to determine what you need for your new business model and/or the renovation of your old business model and product/service. The price may go up or down based on your requirements.",
    price: "$250.00 each",
    features: [
      "Created on your website location with latest AI technologies.",
      "Qualified Professional Business Website Designer.",
      "Matched to your business objectives and brand model.",
      "SEO/SEM created for your home page.",
      "Guaranteed to match your design needs and instructions.",
    ],
  },
  {
    title:
      "Professional Search Engine Optimization (SEO) for your business or promotion campaign.",
    description:
      "The assigned SEO professional will assess and negotiate with you to determine what you need for your campaign and promotion. The SEO can apply to your business and for your campaign.",
    price: "$250.00 each",
    features: [
      "Created for your chosen marketing campaign or webpage.",
      "Qualified Professional SEO/SEM developer assigned.",
      "Matched to your campaign audience and objectives.",
      "Meets your business model campaign goals and objectives.",
      "Advanced analytics and insights.",
    ],
  },
  {
    title: "Order the Conversational Chat Avatar with 'knowledge base.'",
    description:
      "The $100 fee is for use of the default avatars available in the paid plan. The $200 fee is for the creation of your selfie video sample that we'll use to create your Chat Avatar.",
    price: "$100.00 each",
    features: [
      "Depending on your business brand, we'll develop the knowledge base content.",
      "You select which default template you want to use in your chat or for the $200, create your own 2-3 minute selfie video.",
      "Length of your chat avatar streams is based on the following calculation.",
      "When streaming an interactive avatar, 1 API credit equals 5 minutes of streaming.",
    ],
  },
  {
    title: "Order the PureVPN server for one month.",
    description:
      "The $10 fee is for use of the VPN server when you want to bypass hackers and spies online. Market to your social media networds without fear. Just use the coupon to redeem your month's worth of protection and use it whenever you have that special social media post to send over a private network. We also have other time limits, so just email us to see what they are. ",
    price: "$10.00 each",
    features: [
      "A coupon is redeemable for a month's PureVPN server use. You'll get the link to go there and get your website version.",
    ],
  },
  {
    title: "Campaign Package",
    description:
      "Some folks don't want AI to do the work. So, we think you might like us to create your campaign for you.  We'll keep you advised every step-from the creation of your interactive landing page to the posting of the invitations with Ayrshare.  We'll give you a developer, a writer, and a designer, and we'll help you market the campaign internationally with our Ayrshare API.  We'll give you the invoice total to be paid after your campaign is ready and approved to run by you in your membership account interface.",
    price: "$1,000 each",
    features: [
      "Human and professional copy writer.",
      "Fullstack Developer and Designer.",
      "You are kept informed every step of the way."
    ],
  },
];

const Extra = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 gap-2 items-center mt-24 text-center container">
      <h3 className="text-4xl sm:text-4xl md:text-6xl mt-6">Extras</h3>

      {extraData.map((item, index) => (
        <div
          key={index}
          className="relative bg-cover bg-center w-full rounded-3xl p-8 mt-12 block md:flex justify-between"
          style={{
            backgroundImage: `url(${extra_background})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div className="bg-opacity-80 rounded-xl p-6 max-w-2xl mx-auto text-left">
            <h3 className="text-2xl font-bold text-gray-900">{item.title}</h3>
            <p className="mt-4 text-gray-700 text-lg">{item.description}</p>
            <div className="text-2xl font-bold text-gray-700 mt-6">
              Starting at{" "}
              <span className="text-3xl text-gray-900">{item.price}</span>
            </div>
            <button className="bg-blue-600 text-white px-6 py-2 w-full text-center rounded-full mt-6 hover:bg-blue-700 transition duration-300 flex justify-center text-2xl">
              Purchase
              <IoIosArrowForward className="ml-2 mt-1" />
            </button>
          </div>
          <div className="mt-8 text-left bg-white p-4 border rounded-3xl flex flex-col justify-center">
            <h4 className="text-lg font-bold text-gray-900 text-left mb-3">
              What's Included
            </h4>
            <ul className="mt-4 text-gray-700">
              {item.features.map((feature, idx) => (
                <li key={idx} className="flex items-start mb-3">
                  <IoIosCheckmarkCircleOutline className="text-green-400 rounded-full w-[28px] h-[24px] text-xl mr-1" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Extra;
