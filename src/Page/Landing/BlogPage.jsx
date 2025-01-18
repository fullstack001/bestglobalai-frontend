import React from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";

const BlogPage = () => {
    const navigate = useNavigate();
    return (
      <div className="bg-gray-950 text-white font-sans">
        <div className="">
          <Nav />
          
        </div>
      </div>
    );
  };
  
  export default BlogPage;