import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar"; // Adjust the path as needed
import Navbar from "./Navbar"; // Adjust the path as needed

const Layout = ({ children, titleText }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    // Ensure the script is only added once
    if (document.getElementById("heygen-script")) return;

    const script = document.createElement("script");
    script.id = "heygen-script";

    script.innerHTML = `
      (function(window) {
        const host = "https://labs.heygen.com";
        const url = host + "/guest/streaming-embed?share=eyJxdWFsaXR5IjoiaGlnaCIsImF2YXRhck5hbWUiOiJCcnlhbl9JVF9TaXR0aW5nX3B1YmxpYyIs%0D%0AInByZXZpZXdJbWciOiJodHRwczovL2ZpbGVzMi5oZXlnZW4uYWkvYXZhdGFyL3YzLzMzYzlhYzRh%0D%0AZWFkNDRkZmM4YmMwMDgyYTM1MDYyYTcwXzQ1NTgwL3ByZXZpZXdfdGFsa18zLndlYnAiLCJuZWVk%0D%0AUmVtb3ZlQmFja2dyb3VuZCI6ZmFsc2UsImtub3dsZWRnZUJhc2VJZCI6IjIyM2NhMjkyZjlkMDRk%0D%0AMjc4ZjljNDliZWE5MjhmNTg3IiwidXNlcm5hbWUiOiIwNzQxZjdjNWUxZDM0YThjYTU5ODNkMWQ3%0D%0AOTY0NTUwYyJ9&inIFrame=1";
        
        const wrapDiv = document.createElement("div");
        wrapDiv.id = "heygen-streaming-embed";
        
        const container = document.createElement("div");
        container.id = "heygen-streaming-container";
        
        const stylesheet = document.createElement("style");
        stylesheet.innerHTML = \`
          #heygen-streaming-embed {
            z-index: 9999;
            position: fixed;
            right: 40px;
            bottom: 40px;
            width: 150px;
            height: 150px;
            border-radius: 50%;
            border: 2px solid #fff;
            box-shadow: 0px 8px 24px 0px rgba(0, 0, 0, 0.12);
            transition: all linear 0.1s;
            overflow: hidden;
            opacity: 0;
            visibility: hidden;
          }
          #heygen-streaming-embed.show {
            opacity: 1;
            visibility: visible;
          }
          #heygen-streaming-embed.expand {
            height: 366px;
            width: calc(366px * 16 / 9);
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
        \`;

        const iframe = document.createElement("iframe");
        iframe.allowFullscreen = false;
        iframe.title = "Streaming Embed";
        iframe.role = "dialog";
        iframe.allow = "microphone";
        iframe.src = url;

        let visible = false;
        let initial = false;

        window.addEventListener("message", (e) => {
          if (e.origin === host && e.data && e.data.type === "streaming-embed") {
            if (e.data.action === "init") {
              initial = true;
              wrapDiv.classList.toggle("show", initial);
            } else if (e.data.action === "show") {
              visible = true;
              wrapDiv.classList.toggle("expand", visible);
            } else if (e.data.action === "hide") {
              visible = false;
              wrapDiv.classList.toggle("expand", visible);
            }
          }
        });

        container.appendChild(iframe);
        wrapDiv.appendChild(stylesheet);
        wrapDiv.appendChild(container);
        document.body.appendChild(wrapDiv);
      })(globalThis);
    `;

    document.body.appendChild(script);

    // Cleanup function to remove script and HeyGen embed when unmounting
    return () => {
      document.getElementById("heygen-script")?.remove();
      document.getElementById("heygen-streaming-embed")?.remove();
    };
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <main className="flex-1 p-3 sm:p-8 overflow-x-auto">
        <Navbar titleText={titleText} toggleSidebar={toggleSidebar} />
        {children}
      </main>
    </div>
  );
};

export default Layout;
