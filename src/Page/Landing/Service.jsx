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
      {
        label: "Anime.js: A lightweight JavaScript animation library.",
        link: "https://animejs.com/documentation",
      },
      {
        label:
          "GSAP: A powerful JavaScript library for creating high-performance animations.",
        link: "https://greensock.com/docs",
      },
      {
        label:
          "Three.js: A cross-browser JavaScript library and API for 3D graphics.",
        link: "https://threejs.org/docs",
      },
      {
        label: "Lottie by Airbnb: A library for rendering animations.",
        link: "http://airbnb.io/lottie",
      },
      {
        label: "Popmotion: A functional JavaScript animation library.",
        link: "https://popmotion.io/pure",
      },
      {
        label: "Mo.js: The motion graphics toolbelt for web development.",
        link: "https://mojs.github.io/tutorials",
      },
      {
        label: "Motion One: A modern animation library built for the web.",
        link: "https://motion.dev/docs",
      },
      {
        label: "Web Animations API: API for animating DOM elements.",
        link:
          "https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API",
      },
      {
        label:
          "React Native SVG Animations: Animations for React Native SVG components.",
        link: "https://github.com/react-native-svg/react-native-svg",
      },
      {
        label: "React Native Reanimated: A React Native animation library.",
        link: "https://docs.swmansion.com/react-native-reanimated",
      },
    ],
  },
  {
    title: "Automation API",
    apis: [
      {
        label: "UiPath: An enterprise Robotic Process Automation tool.",
        link: "https://docs.uipath.com",
      },
      {
        label: "Automation Anywhere: A cloud-native RPA solution.",
        link: "https://docs.automationanywhere.com",
      },
      {
        label: "Blue Prism: Intelligent automation platform.",
        link: "https://bpdocs.blueprism.com",
      },
      {
        label: "Workato: Integration and automation platform.",
        link: "https://docs.workato.com",
      },
      {
        label: "Zapier: Automation tool for web applications.",
        link: "https://zapier.com/help",
      },
      {
        label: "MuleSoft Anypoint Platform: API integration platform.",
        link: "https://docs.mulesoft.com",
      },
      {
        label: "Boomi: Cloud-based integration platform.",
        link: "https://help.boomi.com",
      },
      {
        label: "Integromat (Make): Visual automation platform.",
        link: "https://www.integromat.com/en/help",
      },
      {
        label: "Appian: Enterprise low-code automation platform.",
        link: "https://docs.appian.com",
      },
      {
        label: "Bizagi: Digital process automation software.",
        link: "https://help.bizagi.com",
      },
    ],
  },
  {
    title: "Cloud Storage and File Management API",
    apis: [
      {
        label: "Amazon S3: Scalable object storage.",
        link: "https://aws.amazon.com/s3",
      },
      {
        label: "Box: Cloud content management and file sharing service.",
        link: "https://developer.box.com",
      },
      {
        label: "Dropbox: File storage and sharing API.",
        link: "https://www.dropbox.com/developers/documentation",
      },
      {
        label: "Egnyte: Content collaboration and governance.",
        link: "https://developers.egnyte.com/docs",
      },
      {
        label: "Google Drive: Manage Google Drive files and folders.",
        link: "https://developers.google.com/drive",
      },
      {
        label: "Microsoft OneDrive: Cloud storage API for OneDrive.",
        link: "https://docs.microsoft.com/en-us/onedrive/developer",
      },
      {
        label: "Microsoft SharePoint: Collaboration platform APIs.",
        link: "https://docs.microsoft.com/en-us/sharepoint/dev",
      },
      {
        label: "Azure Files: File storage service.",
        link:
          "https://docs.microsoft.com/en-us/rest/api/storageservices/file-service-rest-api",
      },
      {
        label: "Alfresco: Open-source content management.",
        link: "https://docs.alfresco.com",
      },
    ],
  },
  {
    title: "Communication API",
    apis: [
      {
        label: "Twilio: Communication APIs for SMS, voice, and video.",
        link: "https://www.twilio.com/docs",
      },
      {
        label: "Vonage: API for SMS, voice, and video communication.",
        link: "https://developer.vonage.com",
      },
      {
        label: "Agora: Real-time communication APIs.",
        link: "https://docs.agora.io/en",
      },
      {
        label: "MirrorFly: Messaging and communication APIs.",
        link: "https://www.mirrorfly.com/docs",
      },
      {
        label: "Apphitect: Customizable chat API for mobile and web.",
        link: "https://www.apphitect.ae",
      },
      {
        label: "EnableX: Real-time communication platform.",
        link: "https://www.enablex.io/developer",
      },
      {
        label: "Dolby.io: APIs for media processing and communication.",
        link: "https://docs.dolby.io",
      },
      {
        label: "Videosdk.live: Real-time communication SDK.",
        link: "https://docs.videosdk.live",
      },
      {
        label: "Jitsi Meet: Open-source video conferencing API.",
        link: "https://jitsi.org/api",
      },
      {
        label: "Troop Messenger: Team collaboration platform API.",
        link: "https://www.troopmessenger.com/docs",
      },
    ],
  },
  {
    title: "Customer Relationship Management (CRM) API",
    apis: [
      {
        label:
          "Salesforce: A leading customer relationship management platform.",
        link: "https://developer.salesforce.com/docs/apis",
      },
      {
        label: "HubSpot: An all-in-one CRM solution for marketing and sales.",
        link: "https://developers.hubspot.com/docs/api/overview",
      },
      {
        label: "Zoho CRM: A scalable CRM solution for businesses of all sizes.",
        link: "https://www.zoho.com/crm/help/api",
      },
      {
        label: "Pipedrive: A simple yet powerful sales management tool.",
        link: "https://developers.pipedrive.com/docs/api/v1",
      },
      {
        label: "Freshsales: An intuitive CRM for growing businesses.",
        link: "https://developers.freshworks.com/crm",
      },
      {
        label: "Microsoft Dynamics 365: A cloud-based CRM and ERP software.",
        link: "https://docs.microsoft.com/en-us/dynamics365",
      },
      {
        label: "SugarCRM: A flexible CRM platform for business automation.",
        link: "https://apidocs.sugarcrm.com",
      },
      {
        label: "Insightly: A CRM and project management tool in one.",
        link: "https://api.insightly.com/v3.1/Help",
      },
      {
        label: "Nutshell: A CRM focused on simplicity and usability.",
        link: "https://www.nutshell.com/api",
      },
      {
        label:
          "Copper: A CRM built for Google Workspace (formerly ProsperWorks).",
        link: "https://developer.copper.com",
      },
    ],
  },
  {
    title: "Data Analytics and Business Intelligence API",
    apis: [
      {
        label: "Tableau: A data visualization and business intelligence tool.",
        link:
          "https://help.tableau.com/current/api/rest_api/en-us/REST/rest_api.htm",
      },
      {
        label: "Power BI: A Microsoft tool for interactive data visualization.",
        link: "https://docs.microsoft.com/en-us/rest/api/power-bi",
      },
      {
        label:
          "Looker Studio: A business intelligence and big data analytics platform.",
        link: "https://lookerstudio.google.com",
      },
      {
        label:
          "Domo: A cloud-based platform for data integration and visualization.",
        link:
          "https://developer.domo.com/portal/d01f63a6ba662-domo-developer-portal",
      },
      {
        label: "Zoho Analytics: A cloud-based BI and data analytics software.",
        link: "https://www.zoho.com/analytics/api",
      },
      {
        label: "Sisense: A BI platform for infusing analytics into workflows.",
        link: "https://developer.sisense.com",
      },
      {
        label: "SAP BusinessObjects: Enterprise BI solutions by SAP.",
        link: "https://developers.sap.com",
      },
      {
        label: "MicroStrategy: A BI platform for analytics and mobility.",
        link: "https://microstrategy.github.io/rest-api-docs",
      },
      {
        label:
          "Qlik Sense: A self-service data analytics and visualization tool.",
        link: "https://qlik.dev",
      },
      {
        label:
          "TIBCO Spotfire: A data analytics platform for business insights.",
        link: "https://docs.tibco.com/products/tibco-spotfire",
      },
    ],
  },
  {
    title: "Human Resources (HR) and Payroll API",
    apis: [
      {
        label: "ADP Workforce Now: A comprehensive HR management tool.",
        link: "https://developers.adp.com",
      },
      {
        label:
          "Gusto: A payroll, benefits, and HR platform for small businesses.",
        link: "https://docs.gusto.com",
      },
      {
        label: "Paychex Flex: A payroll and HR solution for businesses.",
        link: "https://developer.paychex.com",
      },
      {
        label: "Rippling: A unified platform for HR, IT, and finance.",
        link: "https://rippling.stoplight.io",
      },
      {
        label: "Deel: A payroll platform for remote teams.",
        link: "https://www.deel.com/api",
      },
      {
        label: "Papaya Global: A global payroll and workforce management tool.",
        link: "https://docs.papayaglobal.com/api-reference",
      },
      {
        label: "Paylocity: A cloud-based payroll and HR management platform.",
        link:
          "https://www.paylocity.com/our-products/integrations/apis-developer-resources",
      },
      {
        label: "Workday: An enterprise cloud for HR and finance.",
        link:
          "https://www.workday.com/en-us/products/platform-product-extensions/integrations.html",
      },
      {
        label:
          "Zenefits: An HR software for small and medium-sized businesses.",
        link: "https://developers.zenefits.com",
      },
      {
        label: "BambooHR: A platform for HR management and analytics.",
        link: "https://documentation.bamboohr.com",
      },
    ],
  },

  {
    title: "eCommerce APIs",
    apis: [
      {
        label:
          "Shopify: Comprehensive RESTful API for managing products, orders, and customer data.",
        link: "https://shopify.dev",
      },
      {
        label:
          "WooCommerce: An open-source eCommerce platform built on WordPress.",
        link: "https://woocommerce.com/document/woocommerce-rest-api",
      },
      {
        label:
          "BigCommerce: APIs for product catalog management, order processing, and more.",
        link: "https://developer.bigcommerce.com/api-reference",
      },
      {
        label:
          "Magento: A flexible and scalable API for managing eCommerce operations.",
        link: "https://devdocs.magento.com",
      },
      {
        label:
          "PayPal: APIs for payment processing, subscription management, and more.",
        link: "https://developer.paypal.com/docs/api/overview",
      },
      {
        label:
          "Stripe: APIs for handling online payments, subscriptions, and more.",
        link: "https://stripe.com/docs/api",
      },
      {
        label: "Etsy: APIs for managing shop listings, orders, and more.",
        link: "https://developers.etsy.com/documentation/reference",
      },
      {
        label:
          "eBay: APIs for integrating various eCommerce functionalities like listing products, order management, and more.",
        link: "https://developer.ebay.com/docs",
      },
      {
        label:
          "Amazon: A variety of APIs for managing products, orders, and other eCommerce operations.",
        link: "https://developer.amazonservices.com",
      },
      {
        label:
          "Google Content API for Shopping: Manages product listings on Google Shopping.",
        link: "https://developers.google.com/shopping-content",
      },
    ],
  },
  {
    title: "Financial and Accounting APIs",
    apis: [
      {
        label:
          "QuickBooks: Comprehensive API for handling various accounting tasks like invoices, payments, and payroll.",
        link: "https://developer.intuit.com",
      },
      {
        label:
          "Xero: APIs for accounting, payroll, and various integrations to streamline financial management.",
        link: "https://developer.xero.com",
      },
      {
        label:
          "Sage Intacct: APIs for integrating financial management and accounting services.",
        link:
          "https://developer.intacct.com",
      },
      {
        label:
          "NetSuite: APIs for ERP and financial management, including various business applications.",
        link: "https://www.netsuite.com/portal/platform/developer/suitetalk.shtml",
      },
      {
        label:
          "FreshBooks: APIs for managing invoices, expenses, and other accounting functions.",
        link: "https://www.freshbooks.com/api",
      },
      {
        label:
          "Microsoft Dynamics 365: APIs for a wide range of ERP and financial management functions.",
        link: "https://learn.microsoft.com/dynamics365",
      },
      {
        label:
          "Zoho Books: APIs for comprehensive accounting solutions tailored for small to medium businesses.",
        link: "https://www.zoho.com/books/api",
      },
      {
        label:
          "Tipalti: APIs for automating global mass payments and managing accounts payable.",
        link: "https://documentation.tipalti.com/docs/getting-started",
      },
      {
        label:
          "Wave: APIs for integrating accounting, invoicing, and other financial services for small businesses.",
        link: "https://developer.waveapps.com",
      },
      {
        label:
          "Ramp: APIs for managing business expenses, corporate cards, and financial automation.",
        link: "https://docs.ramp.com",
      },
    ],
  },
  {
    title: "Project Management APIs",
    apis: [
      {
        label: "Asana: APIs for task management, project tracking, and integration with other tools.",
        link: "https://developers.asana.com",
      },
      {
        label: "Trello: APIs for integration with their card and board system for project and task management.",
        link: "https://developer.atlassian.com/cloud/trello/",
      },
      {
        label: "Basecamp: APIs for managing projects, to-dos, and communication.",
        link: "https://github.com/basecamp/bc3-api",
      },
      {
        label: "Jira: APIs for software development project tracking and integration with various developer tools.",
        link: "https://developer.atlassian.com/cloud/jira/platform/rest/v3/",
      },
      {
        label: "ClickUp: APIs for task management, time tracking, and integration with other productivity tools.",
        link: "https://clickup.com/api",
      },
      {
        label: "Monday.com: APIs for managing workflows, tasks, and project timelines.",
        link: "https://monday.com/appdeveloper",
      },
      {
        label: "Wrike: APIs for project management, collaboration, and integration with other enterprise tools.",
        link: "https://developers.wrike.com",
      },
      {
        label: "Smartsheet: APIs for task management, project tracking, and collaboration.",
        link: "https://smartsheet.redoc.ly",
      },
      {
        label: "Teamwork: APIs for project management, time tracking, and resource management.",
        link: "https://developer.teamwork.com",
      },
      {
        label: "Notion: APIs for integration with their workspace management and note-taking tools.",
        link: "https://developers.notion.com",
      },
    ]
  },
  {
    title: "Top Ten Chatbots API",
    apis: [
      {
        label: "D-ID: AI-powered video creation and personalization.",
        link: "https://docs.d-id.com",
      },
      {
        label: "DeepBrain: AI-powered conversational solutions.",
        link: "https://docs.deepbrain.io",
      },
      {
        label: "Dialogflow: Google's natural language understanding platform.",
        link: "https://cloud.google.com/dialogflow/es/docs",
      },
      {
        label: "IBM Watson Assistant: AI assistant for business.",
        link: "https://cloud.ibm.com/apidocs/assistant",
      },
      {
        label:
          "Microsoft Bot Framework: Comprehensive framework for building bots.",
        link: "https://docs.microsoft.com/en-us/azure/bot-service",
      },
      {
        label: "Amelia: AI-powered digital employee.",
        link: "https://amelia.com/ai-digital-assistant-platform",
      },
      {
        label: "LivePerson: Conversational AI solutions for businesses.",
        link: "https://developers.liveperson.com",
      },
      {
        label:
          "Amazon Lex: Build conversational interfaces using voice and text.",
        link: "https://docs.aws.amazon.com/lexv2/latest/dg/what-is.html",
      },
      {
        label: "Rasa: Open source conversational AI.",
        link: "https://rasa.com/docs/rasa",
      },
      {
        label: "Synthesia.io: AI-powered video generation.",
        link: "https://docs.synthesia.io",
      },
    ],
  },
  {
    title: "Top Ten Social Media Scheduling API",
    apis: [
      {
        label: "Buffer: Social media management and scheduling tool.",
        link: "https://buffer.com/developers/api",
      },
      {
        label: "Hootsuite: Social media management platform.",
        link: "https://developer.hootsuite.com/docs/api",
      },
      {
        label: "Sprout Social: Social media management solutions for business.",
        link: "https://developers.sproutsocial.com",
      },
      {
        label: "Later: Visual social media marketing platform.",
        link: "https://developers.later.com",
      },
      {
        label: "Loomly: Brand success platform for social media.",
        link: "https://www.loomly.com/api",
      },
      {
        label: "CoSchedule: Marketing calendar software.",
        link: "https://developers.coschedule.com",
      },
      {
        label: "SocialBee: Social media management tools for entrepreneurs.",
        link: "https://socialbee.io/api",
      },
      {
        label: "MeetEdgar: Social media automation and scheduling tool.",
        link: "https://meetedgar.com/api",
      },
      {
        label: "Sendible: Social media management software for agencies.",
        link: "https://sendible.com/api",
      },
      {
        label: "Planable: Social media content collaboration platform.",
        link: "https://planable.io/api",
      },
    ],
  },
];

const Service = () => {
  const [email, setEmail] = useState("");
  const [selectedAPIs, setSelectedAPIs] = useState([]);

  const handleCheckboxChange = (e, api) => {
    if (e.target.checked) {
      setSelectedAPIs((prevSelectedAPIs) => [...prevSelectedAPIs, api]);
    } else {
      setSelectedAPIs((prevSelectedAPIs) =>
        prevSelectedAPIs.filter(
          (selectedApi) => selectedApi.label !== api.label
        )
      );
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
            className="w-full h-[400px] max-w-4xl mx-auto rounded-lg border-white border-8 border-spacing-4 shadow-lg"
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
                    id={`api-${index}-${idx}`}
                    value={api.label}
                    checked={selectedAPIs.some(
                      (selectedApi) => selectedApi.label === api.label
                    )}
                    onChange={(e) => handleCheckboxChange(e, api)}
                  />
                  <label htmlFor={`api-${index}-${idx}`} className="ml-2">
                    {api.label}
                  </label>
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
