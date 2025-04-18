import React, { useEffect } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import ContestPromo from "../../components/ContestComponent";

const Contest = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.innerHTML = `!function(window){const host="https://labs.heygen.com",url=host+"/guest/streaming-embed?share=eyJxdWFsaXR5IjoiaGlnaCIsImF2YXRhck5hbWUiOiJHcmFoYW1fQ2hhaXJfU2l0dGluZ19wdWJs%0D%0AaWMiLCJwcmV2aWV3SW1nIjoiaHR0cHM6Ly9maWxlczIuaGV5Z2VuLmFpL2F2YXRhci92My8yMTQ2%0D%0AZTJjOGMwNzA0NWMwYjM1OTg2ODNkNDQ3M2ZkZF81NTM0MC9wcmV2aWV3X3RhcmdldC53ZWJwIiwi%0D%0AbmVlZFJlbW92ZUJhY2tncm91bmQiOmZhbHNlLCJrbm93bGVkZ2VCYXNlSWQiOiJhMmNlM2Y5NTI3%0D%0AYmQ0Y2RkODgyZDdkZWU1NDNkY2I1MCIsInVzZXJuYW1lIjoiMDc0MWY3YzVlMWQzNGE4Y2E1OTgz%0D%0AZDFkNzk2NDU1MGMifQ%3D%3D&inIFrame=1",clientWidth=document.body.clientWidth,wrapDiv=document.createElement("div");wrapDiv.id="heygen-streaming-embed";const container=document.createElement("div");container.id="heygen-streaming-container";const stylesheet=document.createElement("style");stylesheet.innerHTML=\`
      #heygen-streaming-embed {
        z-index: 9999;
        position: fixed;
        left: 40px;
        bottom: 40px;
        width: 200px;
        height: 200px;
        border-radius: 50%;
        border: 2px solid #fff;
        box-shadow: 0px 8px 24px 0px rgba(0, 0, 0, 0.12);
        opacity: 0;
        visibility: hidden;
        overflow: hidden;
      }
      #heygen-streaming-embed.show {
        opacity: 1;
        visibility: visible;
      }
      #heygen-streaming-embed.expand {
        ${
          document.body.clientWidth < 540
            ? "height: 266px; width: 96%; left: 50%; transform: translateX(-50%);"
            : "height: 366px; width: calc(366px * 16 / 9);"
        }
        border: 0;
        border-radius: 8px;
      }
      #heygen-streaming-container {
        width: 100%;
        height: 100%;
      }
      #heygen-streaming-container iframe {
        width: 100%;
        height: 100%;
        border: 0;
      }
    \`;const iframe=document.createElement("iframe");iframe.allowFullscreen=!1,iframe.title="Streaming Embed",iframe.role="dialog",iframe.allow="microphone",iframe.src=url;let visible=!1,initial=!1;window.addEventListener("message",(e=>{e.origin===host&&e.data&&e.data.type&&"streaming-embed"===e.data.type&&("init"===e.data.action?(initial=!0,wrapDiv.classList.toggle("show",initial)):"show"===e.data.action?(visible=!0,wrapDiv.classList.toggle("expand",visible)):"hide"===e.data.action&&(visible=!1,wrapDiv.classList.toggle("expand",visible)))})),container.appendChild(iframe),wrapDiv.appendChild(stylesheet),wrapDiv.appendChild(container),document.body.appendChild(wrapDiv)}(globalThis);`;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="bg-gray-950 text-white font-sans">
      <Nav />
      <div className="mt-28">
        <ContestPromo />
      </div>
      <Footer />
    </div>
  );
};

export default Contest;
