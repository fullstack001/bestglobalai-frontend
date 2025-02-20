import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import ai_icon from "../../assets/images/landing/ai_icon.png";
import ai_background from "../../assets/images/landing/ai_background.png";
import interactive_avatar_icon from "../../assets/images/landing/interactive_avatar.png";
import interactive_background from "../../assets/images/landing/interactive_avatar_backgroun.png";
import multilanguage_icon from "../../assets/images/landing/multilanguage_icon.png";
import multilanguage_background from "../../assets/images/landing/multilanguage_background.png";
import socialMedia_integration_icon from "../../assets/images/landing/socialMedia_integration_icon.png";
import socialMedia_integration_image from "../../assets/images/landing/paid_progress.png";
import chat_icon from "../../assets/images/landing/chat_icon.png";
import generate_blog from "../../assets/images/landing/generate_blog.png";
import chart_icon from "../../assets/images/landing/chart_icon.png";
import customizable_icon from "../../assets/images/landing/customizable_icon.png";
import customizable_image from "../../assets/images/landing/budget_background.png";
import three_steps from "../../assets/images/landing/3steps.png";


const Feature = () => {
  const navigate = useNavigate();
  const [scrollDirection, setScrollDirection] = useState(0);
  const controls = useAnimation();
  const control1 = useAnimation();

  // Track scroll direction
  useEffect(() => {
    let lastScrollTop = 0;
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > lastScrollTop) {
        setScrollDirection(1); // Scroll Down
      } else {
        setScrollDirection(-1); // Scroll Up
      }
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Prevent negative scrolling
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Trigger motion on scroll
  useEffect(() => {
    controls.start({
      x: scrollDirection === 1 ? "100vw" : "-100vw", // Move right on scroll down, left on scroll up
      transition: {
        duration: 20, // Adjust speed of motion
        ease: "linear",
        repeat: Infinity, // Infinite loop
      },
    });

    control1.start({
      x: scrollDirection === 1 ? "-100vw" : "100vw", // Move right on scroll down, left on scroll up
      transition: {
        duration: 20, // Adjust speed of motion
        ease: "linear",
        repeat: Infinity, // Infinite loop
      },
    });
  }, [scrollDirection, controls, control1]);

  return (
    <section className="py-20 text-white">
      {/* Section Title */}
      <div className="text-center mb-10 container mx-auto">
        <button
          //   onClick={() => navigate("/get-started")}
          className="bg-gray-800 text-lg px-8 py-1 rounded-full hover:bg-gray-800 transition duration-300 mb-8 text-gray-300"
        >
          FUTURE OF MARKETING
        </button>
        <h2 className="text-3xl sm:text-4xl mt-5 mb-8">Main Features</h2>
        <p className="text-lg sm:text-xl text-gray-300 max-w-screen-md m-auto mt-5">
          The only three platforms you'll need to scale your social marketing to
          the next level. It's your “one-stop shop” for creating dynamic,
          interactive social media landing pages that collect new users to
          market to later. Deliver to your followers and buyers in the most
          secure interface available for world-wide marketing. Whether you're a
          new solopreneur or a larger professional, you'll be given a plan that
          goes with your specific business model. Whether you need just a simple
          plan to increase traffic and sales, or an entire API installation and
          integration, we can help you reach your goals and objectives matching
          you with experienced, full-stack developers and designers at a price
          you can afford.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-16 items-center container">
        <div className="text-center md:text-left">
          <div className="w-16 h-16 rounded-full bg-white text-center py-4">
            <img src={ai_icon} alt="AI Icon" className="w-8 h-8 mx-auto" />
          </div>

          <h3 className="text-4xl mt-6 mb-4">AI-Powered Automation</h3>
          <p className="text-lg sm:text-xl text-gray-300 mb-6">
            Effortlessly manage your social media and mailing campaigns with
            intelligent automation. Our AI ensures timely and relevant content
            delivery across multiple channels, reducing manual effort and
            maximizing impact.
          </p>
          <button
            onClick={() => navigate("/signup")}
            className="bg-blue-500 text-lg px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300 border-s-blue-800"
          >
            Learn more
          </button>
        </div>

        <div className="relative">
          <img
            src={ai_background}
            alt="AI Background"
            className="w-full rounded-lg shadow-lg"
          />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-16 items-center mt-10 container">
        <div className="relative">
          <img
            src={interactive_background}
            alt="AI Background"
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        <div className="text-center md:text-left">
          <div className="w-16 h-16 rounded-full bg-white text-center py-4">
            <img
              src={interactive_avatar_icon}
              alt="AI Icon"
              className="w-8 h-8 mx-auto"
            />
          </div>

          <h3 className="text-4xl mt-6 mb-4">Interactive Avatars</h3>
          <p className="text-lg sm:text-xl text-gray-300 mb-6">
            Bring your campaigns to life with realistic, interactive avatars
            that engage users in personalized conversations. Tailor each
            interaction to your audience's needs for an immersive and impactful
            experience.
          </p>
          <button
            onClick={() => navigate("/signup")}
            className="bg-blue-500 text-lg px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300 border-s-blue-800"
          >
            Learn more
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-16 items-center mt-10 container">
        <div className="text-center md:text-left">
          <div className="w-16 h-16 rounded-full bg-white text-center py-4">
            <img
              src={multilanguage_icon}
              alt="AI Icon"
              className="w-8 h-8 mx-auto"
            />
          </div>

          <h3 className="text-4xl mt-6 mb-4">Multi-Language Support</h3>
          <p className="text-lg sm:text-xl text-gray-300 mb-6">
            Reach a global audience with support for multiple languages. Our
            avatars and AI-driven content adapt to different languages and
            cultures, ensuring your message resonates no matter where your
            audience is.
          </p>
          <button
            onClick={() => navigate("/signup")}
            className="bg-blue-500 text-lg px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300 border-s-blue-800"
          >
            Learn more
          </button>
        </div>

        <div className="relative">
          <img
            src={multilanguage_background}
            alt="AI Background"
            className="w-full rounded-lg shadow-lg"
          />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-16 items-center mt-10 container">
        <div className="relative">
          <img
            src={socialMedia_integration_image}
            alt="AI Background"
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        <div className="text-center md:text-left">
          <div className="w-16 h-16 rounded-full bg-white text-center py-4">
            <img
              src={socialMedia_integration_icon}
              alt="AI Icon"
              className="w-8 h-8 mx-auto"
            />
          </div>

          <h3 className="text-4xl mt-6 mb-4">
            Seamless Social Media Integration
          </h3>
          <p className="text-lg sm:text-xl text-gray-300 mb-6">
            Connect to major social media platforms with ease. Schedule,
            automate, and optimize your posts while analyzing performance to
            continuously improve your strategy.
          </p>
          <button
            onClick={() => navigate("/signup")}
            className="bg-blue-500 text-lg px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300 border-s-blue-800"
          >
            Learn more
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-16 items-center mt-10 container">
        <div className="text-center md:text-left">
          <div className="w-16 h-16 rounded-full bg-white text-center py-4">
            <img src={chat_icon} alt="AI Icon" className="w-8 h-8 mx-auto" />
          </div>

          <h3 className="text-4xl mt-6 mb-4">Personalized Email Campaigns</h3>
          <p className="text-lg sm:text-xl text-gray-300 mb-6">
            Create, schedule, and automate personalized email campaigns tailored
            to your audience's preferences. Use AI to craft content that speaks
            directly to each recipient, enhancing engagement and conversion
            rates.
          </p>
          <button
            onClick={() => navigate("/signup")}
            className="bg-blue-500 text-lg px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300 border-s-blue-800"
          >
            Learn more
          </button>
        </div>

        <div className="relative">
          <img
            src={generate_blog}
            alt="AI Background"
            className="w-full rounded-lg shadow-lg"
          />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-16 items-center mt-10 container">
        <div className="relative">
          <img
            src={socialMedia_integration_image}
            alt="AI Background"
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        <div className="text-center md:text-left">
          <div className="w-16 h-16 rounded-full bg-white text-center py-4">
            <img src={chart_icon} alt="AI Icon" className="w-8 h-8 mx-auto" />
          </div>

          <h3 className="text-4xl mt-6 mb-4">
            Real-Time Analytics and Insights
          </h3>
          <p className="text-lg sm:text-xl text-gray-300 mb-6">
            Track the success of your campaigns in real-time. Use data- driven
            insights to fine-tune your strategy, identify opportunities for
            growth, and maximize your return on investment (ROI).
          </p>
          <button
            onClick={() => navigate("/signup")}
            className="bg-blue-500 text-lg px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300 border-s-blue-800"
          >
            Learn more
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-16 items-center mt-10 container">
        <div className="text-center md:text-left">
          <div className="w-16 h-16 rounded-full bg-white text-center py-4">
            <img
              src={customizable_icon}
              alt="AI Icon"
              className="w-8 h-8 mx-auto"
            />
          </div>

          <h3 className="text-4xl mt-6 mb-4">Scalable and Customizable</h3>
          <p className="text-lg sm:text-xl text-gray-300 mb-6">
            Whether you're a small business or a large enterprise, our platform
            scales with your needs. Customize the avatars, messaging, and
            campaign strategies to match your brand and target audience.
          </p>
          <button
            onClick={() => navigate("/signup")}
            className="bg-blue-500 text-lg px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300 border-s-blue-800"
          >
            Learn more
          </button>
        </div>

        <div className="relative">
          <img
            src={customizable_image}
            alt="AI Background"
            className="w-full rounded-lg shadow-lg"
          />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 gap-16 items-center mt-24 text-center container">
        <h3 className="text-4xl sm:text-4xl md:text-6xl mt-6 mb-4">
          Simple 3 step process
        </h3>

        <div className="relative">
          <img
            src={three_steps}
            alt="AI Background"
            className="w-full rounded-lg shadow-lg"
          />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 gap-16 items-center mt-24 text-center container">
        <h3 className="text-4xl sm:text-4xl md:text-6xl mt-6 ">
          We are ready to help
        </h3>

        <div className="mt-2 text-xl text-gray-400">
          Whether you want to do it yourself, or you want to pay us to manage it
          and do it for you, there's a plan for you! When you sign-up, you'll be
          asked what your business model is, and then we'll match you up with an
          experienced consultant to give you some possible options to grow your
          social media presence. You'll also get a full menu of possible API
          integrations if you need them on your website. Finally, our CEO's
          ePub3 text Best Global AI: Making AI Personal will be available on
          your free eReader inside the Embellisher Studio.
        </div>

        <div className="relative mt-10">         
          <iframe
            className="w-full h-[400px] max-w-4xl mx-auto rounded-lg border-white border-8 border-spacing-4 shadow-lg"
            src="https://www.youtube.com/embed/AyZUvl-r6tA?si=ofjQE7eyNLkcCI2P"
            title="API Installation Choices #artificialintelligencemarketing #motivation #news"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 gap-2 items-center mt-24 text-center container ">
        <button
          //   onClick={() => navigate("/get-started")}
          className="bg-gray-800 text-lg px-8 py-1 rounded-full hover:bg-gray-800 transition duration-300 mb-8 text-gray-300 mx-auto"
        >
          EXTENSIVE INTEGRATION
        </button>
        <h3 className="text-4xl sm:text-4xl md:text-6xl mt-6 ">
          Crafted for AI-Driven Marketing, SaaS, and Business Growth
        </h3>

        <div className="mt-6 text-xl text-gray-400">
          Our platform is designed for businesses looking to enhance their
          marketing strategies with cutting-edge AI automation. Whether you're a
          startup, SaaS provider, or enterprise, our solution empowers you to
          streamline your campaigns while engaging your audience with
          interactive avatars and personalized experiences.
        </div>
      </div>

      <div className="mx-auto px-6 md:px-12 grid grid-cols-1 gap-2 items-center mt-24 text-center ">
        <div className="space-y-6 overflow-hidden">
          {/* Row 1 */}
          <div className="flex space-x-8">
            <motion.div animate={controls} className="flex space-x-8">
              <div className="bg-blue-100 text-blue-900 rounded-lg text-4xl px-4 py-2 font-semibold ">
                AI-Powered Marketing
              </div>
              <div className="bg-gray-200 text-gray-900 rounded-lg text-4xl px-4 py-2 font-semibold">
                Interactive Avatars for Engagement
              </div>
              <div className="bg-blue-100 text-blue-900 rounded-lg text-4xl px-4 py-2 font-semibold">
                Seamless Integration
              </div>
            </motion.div>
          </div>

          {/* Row 2 */}
          <motion.div
            animate={control1}
            className="flex space-x-8 items-center justify-center"
          >
            <div className="bg-gray-200 text-gray-900 rounded-lg text-4xl px-4 py-2 font-semibold">
              Perfect for SaaS Businesses
            </div>
            <div className="bg-blue-100 text-blue-900 rounded-lg text-4xl px-4 py-2 font-semibold">
              Tailored Solutions
            </div>
            <div className="bg-gray-200 text-gray-900 rounded-lg text-4xl px-4 py-2 font-semibold">
              Rich Documentation
            </div>
            <div className="bg-blue-200 text-gray-900 rounded-lg text-4xl px-4 py-2 font-semibold">
              Developer Friendly
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Feature;
