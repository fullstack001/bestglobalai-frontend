import React, { useEffect } from "react";
import Nav from "./Nav";
import Hero from "./Hero";
import Feature from "./Feature";
import Subscription from "./Subscription";
import Extra from "./Extra";
import Blog from "./Blog";
import Footer from "./Footer";

const Landing = () => {
  // useEffect(() => {
  //   // Create script element
  //   const script = document.createElement("script");
  //   script.innerHTML = `!function(window){const host="https://labs.heygen.com",url=host+"/guest/streaming-embed?share=eyJxdWFsaXR5IjoiaGlnaCIsImF2YXRhck5hbWUiOiJKdW5lX0hSX3B1YmxpYyIsInByZXZpZXdJ%0D%0AbWciOiJodHRwczovL2ZpbGVzMi5oZXlnZW4uYWkvYXZhdGFyL3YzLzc0NDQ3YTI3ODU5YTQ1NmM5%0D%0ANTVlMDFmMjFlZjE4MjE2XzQ1NjIwL3ByZXZpZXdfdGFsa18xLndlYnAiLCJuZWVkUmVtb3ZlQmFj%0D%0Aa2dyb3VuZCI6ZmFsc2UsImtub3dsZWRnZUJhc2VJZCI6IjZkMWI2YmVmMjA2ZTQ0MDA4OTM4OWM1%0D%0AOGZjMjk3ZDMyIiwidXNlcm5hbWUiOiIwNzQxZjdjNWUxZDM0YThjYTU5ODNkMWQ3OTY0NTUwYyJ9&inIFrame=1",clientWidth=document.body.clientWidth,wrapDiv=document.createElement("div");wrapDiv.id="heygen-streaming-embed";const container=document.createElement("div");container.id="heygen-streaming-container";const stylesheet=document.createElement("style");stylesheet.innerHTML=\`
  //     #heygen-streaming-embed {
  //       z-index: 9999;
  //       position: fixed;
  //       left: 40px;
  //       bottom: 40px;
  //       width: 150px;
  //       height: 150px;
  //       border-radius: 50%;
  //       border: 2px solid #fff;
  //       box-shadow: 0px 8px 24px 0px rgba(0, 0, 0, 0.12);
  //       transition: all linear 0.1s;
  //       overflow: hidden;
  //       opacity: 0;
  //       visibility: hidden;
  //     }
  //     #heygen-streaming-embed.show {
  //       opacity: 1;
  //       visibility: visible;
  //     }
  //     #heygen-streaming-embed.expand {
  //       \${clientWidth < 540 ? "height: 266px; width: 96%; left: 50%; transform: translateX(-50%);" : "height: 366px; width: calc(366px * 16 / 9);"}
  //       border: 0;
  //       border-radius: 8px;
  //     }
  //     #heygen-streaming-container {
  //       width: 100%;
  //       height: 100%;
  //     }
  //     #heygen-streaming-container iframe {
  //       width: 100%;
  //       height: 100%;
  //       border: 0;
  //     }
  //   \`;const iframe=document.createElement("iframe");iframe.allowFullscreen=!1,iframe.title="Streaming Embed",iframe.role="dialog",iframe.allow="microphone",iframe.src=url;let visible=!1,initial=!1;window.addEventListener("message",(e=>{e.origin===host&&e.data&&e.data.type&&"streaming-embed"===e.data.type&&("init"===e.data.action?(initial=!0,wrapDiv.classList.toggle("show",initial)):"show"===e.data.action?(visible=!0,wrapDiv.classList.toggle("expand",visible)):"hide"===e.data.action&&(visible=!1,wrapDiv.classList.toggle("expand",visible)))})),container.appendChild(iframe),wrapDiv.appendChild(stylesheet),wrapDiv.appendChild(container),document.body.appendChild(wrapDiv)}(globalThis);`;

  //   // Append script to <head>
  //   document.head.appendChild(script);

  //   return () => {
  //     // Remove script when leaving Landing page
  //     document.head.removeChild(script);

  //     // Remove injected elements from DOM
  //     const embedDiv = document.getElementById("heygen-streaming-embed");
  //     if (embedDiv) {
  //       embedDiv.remove();
  //     }
  //   };
  // }, []);

  return (
    <div className="bg-gray-950 text-white font-sans">
      <div className="">
        <Nav />
        <Hero />
        <div className="bg-yellow-100 p-6 rounded-xl shadow-lg mt-12 text-center max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            🎁 Enter to Win a Free Professional Landing Page!
          </h2>
          <p className="mb-4 text-gray-700">
            Enter to win a free professional landing page promotion for your
            business. Click the button below.
          </p>
          <a
            href="/contest"
            className="inline-block bg-[#27ae60] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#219150] transition"
          >
            Enter the Contest
          </a>
        </div>
        <Feature />
        <Subscription />
        <Extra />
        <Blog />
        <Footer />
        <a
          href="https://labs.heygen.com/interactive-avatar/share?share=eyJxdWFsaXR5IjoiaGlnaCIsImF2YXRhck5hbWUiOiJLYXR5YV9Qcm9mZXNzaW9uYWxMb29rX3B1%0D%0AYmxpYyIsInByZXZpZXdJbWciOiJodHRwczovL2ZpbGVzMi5oZXlnZW4uYWkvYXZhdGFyL3YzLzM0%0D%0AOGRkZjUwM2M2NTRiOWJiYmI4YmVhOWY5MjEwZWFkXzU1ODcwL3ByZXZpZXdfdGFyZ2V0LndlYnAi%0D%0ALCJuZWVkUmVtb3ZlQmFja2dyb3VuZCI6dHJ1ZSwia25vd2xlZGdlQmFzZUlkIjoiNmQxYjZiZWYy%0D%0AMDZlNDQwMDg5Mzg5YzU4ZmMyOTdkMzIiLCJ1c2VybmFtZSI6IjA3NDFmN2M1ZTFkMzRhOGNhNTk4%0D%0AM2QxZDc5NjQ1NTBjIn0%3D "
          target="_blank"
          rel="noreferrer"
          className="fixed bottom-[5%] left-[5%] bg-[#27ae60] text-xl text-white p-4 rounded-full shadow-lg hover:bg-[#219150] transition"
          style={{ zIndex: 1000 }}
        >
          💬
        </a>
      </div>
    </div>
  );
};

export default Landing;
