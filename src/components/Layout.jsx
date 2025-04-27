import React, { useState, useEffect } from "react";
import Tippy from "@tippyjs/react"; // Import Tippy.js
import "tippy.js/dist/tippy.css"; // Import Tippy.js styles
import Sidebar from "./Sidebar"; // Adjust the path as needed
import Navbar from "./Navbar"; // Adjust the path as needed

const Layout = ({ children, titleText }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <main className="flex-1 p-3 sm:p-8 overflow-x-auto">
        <Navbar titleText={titleText} toggleSidebar={toggleSidebar} />
        {children}
      </main>
      <Tippy content="Click to ask Pedro about how to perform technical jobs on these three platforms.">
        <a
          href=" https://labs.heygen.com/interactive-avatar/share?share=eyJxdWFsaXR5IjoiaGlnaCIsImF2YXRhck5hbWUiOiJQZWRyb19Qcm9mZXNzaW9uYWxMb29rX3B1%0D%0AYmxpYyIsInByZXZpZXdJbWciOiJodHRwczovL2ZpbGVzMi5oZXlnZW4uYWkvYXZhdGFyL3YzLzQ1%0D%0AZjdkZTRkYTMyMjQ4ZWY5NTJhOGRiMzI1YWVlMjU4XzU1OTEwL3ByZXZpZXdfdGFyZ2V0LndlYnAi%0D%0ALCJuZWVkUmVtb3ZlQmFja2dyb3VuZCI6dHJ1ZSwia25vd2xlZGdlQmFzZUlkIjoiMjIzY2EyOTJm%0D%0AOWQwNGQyNzhmOWM0OWJlYTkyOGY1ODciLCJ1c2VybmFtZSI6IjA3NDFmN2M1ZTFkMzRhOGNhNTk4%0D%0AM2QxZDc5NjQ1NTBjIn0%3D"
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

export default Layout;
