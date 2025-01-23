import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoCloseCircleOutline } from "react-icons/io5";

import Nav from "./Nav";
import Footer from "./Footer";
const apiPort = process.env.REACT_APP_API_PORT;

const categories = [
  {
    title: "Animation API",
    apis: [
      "Anime.js: A lightweight JavaScript animation library.",
      "GSAP: A powerful JavaScript library for creating high-performance animations.",
      "Three.js: A cross-browser JavaScript library and API for 3D graphics.",
      "Lottie by Airbnb",
      "Popmotion",
      "Mo.js",
      "Motion One",
      "Web Animations API",
      "React Native SVG Animations",
      "React Native Reanimated",
    ],
  },
  {
    title: "Automation API",
    apis: [
      "UiPath",
      "Automation Anywhere",
      "Blue Prism",
      "Workato",
      "Zapier",
      "MuleSoft Anypoint Platform",
      "Boomi",
      "Integromat (Make)",
      "Appian",
      "Bizagi",
    ],
  },
  {
    title: "Cloud Storage and File Management API",
    apis: [
      "Amazon S3",
      "Box",
      "Dropbox",
      "Egnyte",
      "Google Drive",
      "Microsoft OneDrive",
      "Microsoft SharePoint",
      "Azure Files",
      "Alfresco",
    ],
  },
  {
    title: "Communication API",
    apis: [
      "Twilio",
      "Vonage",
      "Agora",
      "MirrorFly",
      "Apphitect",
      "EnableX",
      "Dolby.io",
      "Videosdk.live",
      "Jitsi Meet",
      "Troop Messenger",
    ],
  },
  {
    title: "Customer Relationship Management (CRM) API",
    apis: [
      "Salesforce",
      "HubSpot",
      "Zoho CRM",
      "Pipedrive",
      "Freshsales",
      "Microsoft Dynamics 365",
      "SugarCRM",
      "Insightly",
      "Nutshell",
      "Copper (formerly ProsperWorks)",
    ],
  },
  {
    title: "Data Analytics and Business Intelligence API",
    apis: [
      "Tableau",
      "Power BI",
      "Looker (Looker Studio)",
      "Domo",
      "Zoho Analytics",
      "Sisense",
      "SugarCRM",
      "SAP BusinessObjects",
      "MicroStrategy",
      "Qlik Sense",
      "TIBCO Spotfire",
    ],
  },
  {
    title: "Human Resources (HR) and Payroll API",
    apis: [
      "ADP Workforce Now",
      "Gusto",
      "Paychex Flex",
      "Rippling",
      "Deel",
      "Papaya Global",
      "Paylocity",
      "Workday",
      "Zenefits",
      "BambooHR",
    ],
  },
  {
    title: "eCommerce APIs",
    apis: [
      "Shopify",
      "WooCommerce",
      "BigCommerce",
      "Magento (Adobe Commerce)",
      "PayPal",
      "Stripe",
      "Etsy",
      "eBay",
      "Amazon",
      "Google Content API for Shopping",
    ],
  },
  {
    title: "Financial and Accounting APIs",
    apis: [
      "QuickBooks Online",
      "Xero",
      "Sage Intacct",
      "NetSuite",
      "FreshBooks",
      "Microsoft Dynamics 365",
      "Zoho Books",
      "Tipalti",
      "Wave",
      "Ramp",
    ],
  },
  {
    title: "Project Management APIs",
    apis: [
      "Asana",
      "Trello",
      "Basecamp",
      "Jira",
      "ClickUp",
      "Monday.com",
      "Wrike",
      "Smartsheet",
      "Teamwork",
      "Notion",
    ],
  },
  {
    title: "Top Ten Chatbots API",
    apis: [
      "D-ID",
      "DeepBrain",
      "Dialogflow",
      "IBM Watson Assistant",
      "Microsoft Bot Framework",
      "Amelia",
      "LivePerson",
      "Amazon Lex",
      "Rasa",
      "Synthesia.io",
    ],
  },
  {
    title: "Top Ten Social Media Scheduling API",
    apis: [
      "Buffer",
      "Hootsuite",
      "Sprout Social",
      "Later",
      "Loomly",
      "CoSchedule",
      "SocialBee",
      "MeetEdgar",
      "Sendible",
      "Planable",
    ],
  },
];

const Service = () => {
  const [email, setEmail] = useState("");
  const [selectedAPIs, setSelectedAPIs] = useState([]);

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedAPIs([...selectedAPIs, value]);
    } else {
      setSelectedAPIs(selectedAPIs.filter((api) => api !== value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error(
        <div className="custom-toast flex">
          <IoCloseCircleOutline className="custom-icon" />
          <div className="mt-4">Please enter your email address.</div>
        </div>,
        {
          className: "error-toast",
          autoClose: 3000,
          hideProgressBar: true,
        }
      );
      return;
    }

    if (selectedAPIs.length === 0) {
      toast.error(
        <div className="custom-toast flex">
          <IoCloseCircleOutline className="custom-icon" />
          <div className="mt-4">Please select at least one API.</div>
        </div>,
        {
          className: "error-toast",
          autoClose: 3000,
          hideProgressBar: true,
        }
      );
      return;
    }

    try {
      const response = await fetch(`${apiPort}/api/service`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          selectedAPIs,
        }),
      });

      if (response.ok) {
        alert("Your selection has been sent successfully.");
        setEmail("");
        setSelectedAPIs([]);
      } else {
        alert("Failed to send your selection. Please try again later.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while sending your selection.");
    }
  };

  return (
    <div className="bg-gray-950">
      <Nav />
      <div
        id="container-normal"
        className="container py-28 mx-auto max-w-6xl relative w-full bg-cover bg-center text-white font-sans"
      >
        <h1 className="text-2xl mt-10 font-bold text-center">
          Welcome to Best Global AI - Select Your APIs
        </h1>
        <div className="relative mt-10">
          <iframe
            className="w-full h-auto max-w-4xl mx-auto rounded-lg border-white border-8 border-spacing-4 shadow-lg"
            src="https://www.youtube.com/embed/5hq9ZBiFmrU"
            title="API Installation Choices"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>
        <form onSubmit={handleSubmit}>
          <ToastContainer />
          <div className="flex justify-between">
            <div>
              <label htmlFor="emailInput" className="block mt-4 font-semibold">
                Enter Your Email:
              </label>
              <input
                id="emailInput"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="border p-2 w-full max-w-lg mt-2 text-black"
              />
            </div>
            <div>
              <button
                type="submit"
                className="mt-6 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Submit
              </button>
            </div>
          </div>

          {categories.map((category, index) => (
            <div key={index}>
              <h2 className="mt-6 text-xl font-bold">{category.title}</h2>
              {category.apis.map((api, idx) => (
                <div key={idx} className="mt-2 flex">
                  <input
                    type="checkbox"
                    value={api}
                    onChange={handleCheckboxChange}
                  />
                  <div className="ml-2">{api}</div>
                </div>
              ))}
            </div>
          ))}
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Service;
