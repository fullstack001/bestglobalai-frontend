import React from "react";
import latest1 from "../../assets/images/landing/latest1.png";
import latest2 from "../../assets/images/landing/latest2.png";
import latest3 from "../../assets/images/landing/latest3.png";
import { FiArrowUpRight } from "react-icons/fi";


const Blog = () => {
  const blogs = [
    {
      image: latest1,
      title: "How AI is Revolutionizing Social Media Marketing",
      link: "/blog/ai-revolutionizing-social-media",
    },
    {
      image: latest2,
      title: "Start Planning for Retirement Today",
      link: "/blog/retirement-planning",
    },
    {
      image: latest3,
      title: "Regain Control with Debt Management",
      link: "/blog/debt-management",
    },
  ];

  return (
    <section className="py-20 text-white">
      {/* Section Header */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 text-center mb-12">
        <button className="bg-gray-800 text-lg px-8 py-1 rounded-full hover:bg-gray-700 transition duration-300 mb-8 text-gray-300">
          From Our Blog
        </button>
        <h3 className="text-4xl sm:text-4xl md:text-6xl mt-6">
          Our latest insight & update
        </h3>
      </div>

      {/* Blog Cards */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {blogs.map((blog, index) => (
          <div
            key={index}
            className=" overflow-hidden shadow-lg group"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-48 rounded-xl object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="p-1 flex">
              
              <a
                href={blog.link}
                className="flex items-center text-blue-400 hover:text-blue-500 transition duration-300 text-xl font-semibold"
              >
               <h4 className=" mb-4 text-gray-400">{blog.title}</h4>
                <FiArrowUpRight  />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* More Updates Button */}
      <div className="text-center mt-12">
        <a
          href="/blog"
          className="bg-gray-800 text-xl px-6 py-2 rounded-full hover:bg-gray-700 transition duration-300 text-white inline-flex items-center"
        >
          More Updates
          <FiArrowUpRight />
        </a>
      </div>
    </section>
  );
};

export default Blog;
