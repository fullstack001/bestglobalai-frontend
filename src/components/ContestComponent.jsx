// ContestPromo.tsx
import React, { useEffect, useState } from "react";
import Tippy from "@tippyjs/react"; // Import Tippy.js
import "tippy.js/dist/tippy.css"; // Import Tippy.js styles

const ContestPromo = () => {
  const [countdown, setCountdown] = useState("");

  return (
    <div className="bg-[#f7f9fc] p-6 mt-12 md:p-10 rounded-xl shadow-md max-w-4xl mx-auto font-sans text-gray-800">
      <h2 className="text-2xl md:text-3xl font-bold text-[#2c3e50] mb-4">
        🎉 Win a Custom AI-Powered Landing Page – Designed Just for You!
      </h2>
      <p>
        To celebrate the launch of{" "}
        <a
          href="https://bestglobalai.com"
          target="_blank"
          rel="noreferrer"
          className="text-[#2980b9] font-bold"
        >
          Best Global AI
        </a>
        , we’re giving away{" "}
        <strong>three professionally crafted interactive landing pages</strong>
        —designed by our extraordinary team of{" "}
        <strong>Ukrainian developers</strong> and guided by our Founder and CEO,{" "}
        <strong>Professor James Musgrave</strong>.
      </p>
      <p className="mt-3 italic text-sm text-gray-600">
        This isn’t just a prize—it’s the start of a relationship.
      </p>
      <p className="mt-3">
        Our mission is simple: <em className="font-bold">Make AI personal</em>.
        That means working <strong>with</strong> you, not just{" "}
        <strong>for</strong> you.
      </p>
      <ul className="list-disc ml-5 my-4 space-y-2">
        <li>💬 Meet directly with your designer & Professor Musgrave</li>
        <li>🎨 Approve every step—nothing goes live until it’s perfect</li>
        <li>
          🌍 Option to be featured in our blog and promos{" "}
          <em className="text-xs">(with your permission)</em>
        </li>
      </ul>
      <h3 className="text-xl font-semibold text-[#27ae60] mt-6 mb-2">
        🕒 Countdown to Contest Close
      </h3>
      <div className="text-lg font-bold text-[#c0392b] mb-4">{countdown}</div>
      <div className="my-8">
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSfqzCleEzcpVcdhcKdGaJfhAB7Hsx8oVbbCKsWbuTT2N2Wl9Q/viewform?embedded=true"
          width="100%"
          height="1706"
          frameBorder="0"
          marginHeight={0}
          marginWidth={0}
        >
          Loading…
        </iframe>
      </div>
      <p>
        You can also ask questions directly to our friendly Conversational
        Avatar below!
      </p>
      <p className="italic text-gray-500 mt-6">
        Let’s build something amazing—together.
      </p>
      <hr className="my-8" />
      <h3 className="text-xl font-semibold text-[#2c3e50] mt-6 mb-4">
        📩 Stay Updated with AI Insights
      </h3>
      <p className="mb-4">
        Signup for Professor Musgrave's opt-in newsletter that provides the
        latest advances in AI social media marketing and other related news.
        Those who signup will be given 15% off the add-on purchase of a
        conversational avatar ($100-$200) value on
      </p>
      <a
        href="https://bestglobalai.com/signup?ref=67aa111989d7a86e34468b07"
        target="_blank"
        rel="noreferrer"
        className="inline-block bg-[#27ae60] text-white font-bold py-2 px-4 rounded hover:bg-[#219150] transition"
      >
        Subscribe Now
      </a>
      <hr className="my-8" />
      <h3 className="text-2xl text-[#2c3e50] font-semibold mb-4">
        🌟 What Our Clients Say
      </h3>
      <blockquote className="bg-[#ecf0f1] p-4 border-l-4 border-[#2980b9] mb-4">
        “Working with the Best Global AI team was an eye-opener. Their
        personalized approach blew me away—and the final product got me real
        leads.”
        <br />
        <strong>– Sasha K., Online Educator</strong>
      </blockquote>
      <blockquote className="bg-[#ecf0f1] p-4 border-l-4 border-[#2980b9] mb-4">
        “Their Ukrainian developers are seriously talented. I loved being part
        of the creative process and now my brand finally feels like *me*.”
        <br />
        <strong>– Thomas M., Small Retail Owner</strong>
      </blockquote>
      <blockquote className="bg-[#ecf0f1] p-4 border-l-4 border-[#2980b9] mb-2">
        “James Musgrave treats you like a real partner, not just a client. Best
        team I’ve worked with in years.”
        <br />
        <strong>– Delia R., Indie Publisher</strong>
      </blockquote>
      <Tippy content="Click here to ask Rika about the contest and our business. ">
        <a
          href="https://labs.heygen.com/interactive-avatar/share?share=eyJxdWFsaXR5IjoiaGlnaCIsImF2YXRhck5hbWUiOiJSaWthX0JsdWVfU3VpdF9wdWJsaWMiLCJw%0D%0AcmV2aWV3SW1nIjoiaHR0cHM6Ly9maWxlczIuaGV5Z2VuLmFpL2F2YXRhci92My9lOWE2OTMzZTEw%0D%0AZjk0MjczYTcyYTQ4NGQ5OWZmNTYxOF81NTQzMC9wcmV2aWV3X3RhbGtfMS53ZWJwIiwibmVlZFJl%0D%0AbW92ZUJhY2tncm91bmQiOnRydWUsImtub3dsZWRnZUJhc2VJZCI6ImEyY2UzZjk1MjdiZDRjZGQ4%0D%0AODJkN2RlZTU0M2RjYjUwIiwidXNlcm5hbWUiOiIwNzQxZjdjNWUxZDM0YThjYTU5ODNkMWQ3OTY0%0D%0ANTUwYyJ9"
          target="_blank"
          rel="noreferrer"
          className="fixed bottom-[5%] left-[5%] bg-[#27ae60] text-xl text-white p-4 rounded-full shadow-lg hover:bg-[#219150] transition"
          style={{ zIndex: 1000 }}
        >
          💬
        </a>
      </Tippy>
    </div>
  );
};

export default ContestPromo;
