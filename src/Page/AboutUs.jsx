import React from "react";
import Nav from "./Landing/Nav";
import Footer from "./Landing/Footer";

const teamMembers = [
  {
    name: "James Musgrave",
    role: "Chief Executive Officer",
    image: "/images/12_1.jpeg",
    bio:
      "James Musgrave is the Founder and CEO of Best Global AI, a visionary technology company dedicated to 'Making AI Personal.' With a passion for innovation and personalized digital experiences, James has positioned Best Global AI at the forefront of AI-driven marketing and customer relations solutions. A dynamic entrepreneur and acclaimed author, James brings a creative and human-centered approach to artificial intelligence, helping businesses worldwide harness cutting-edge AI technologies to forge genuine, lasting connections with their audiences. Under his leadership, Best Global AI has successfully implemented sophisticated API solutions and engaging digital platforms, enabling businesses to highlight their unique strengths and build meaningful customer relationships. Committed to authenticity and innovation, James continues to shape the future of personalized AI, empowering clients to deliver impactful, humanized experiences in a rapidly evolving digital landscape.",
  },
  {
    name: "Nazar Zaiets",
    role: "Full-Stack Engineer",
    image: "/images/12_2.png",
    bio:
      "Nazar Zaiets is a Full-Stack Engineer at Best Global AI, specializing in AI-driven web applications and cloud computing. With a robust background in both front-end and back-end development, Nazar plays a crucial role in building and maintaining the company's sophisticated digital platforms. His expertise in cloud technologies ensures that Best Global AI's solutions are scalable, reliable, and secure. Nazar's commitment to innovation and excellence drives him to continuously explore new technologies and methodologies, making him an invaluable asset to the team. He is passionate about leveraging AI to create seamless and efficient user experiences, helping businesses achieve their digital transformation goals.",
  },
  {
    name: "Ilonka Kalanchuk",
    role: "Full-Stack Engineer",
    image: "/images/12_4.jpg",
    bio:
      "Ilonka Kalanchuk is a Full-Stack Engineer at Best Global AI, with a passion for scalable AI solutions and automation. Ilona's expertise spans across various programming languages and frameworks, enabling her to develop robust and efficient software solutions. She is dedicated to optimizing processes and implementing automation to enhance productivity and reduce operational costs. Ilona's innovative approach and problem-solving skills make her a key contributor to the development of cutting-edge AI technologies at Best Global AI. Her commitment to continuous learning and improvement ensures that the company stays ahead in the rapidly evolving field of artificial intelligence.",
  },
];

const AboutUs = () => {
  return (
    <>
      <Nav />
      <div className="max-w-7xl mx-auto px-6 py-28">
        {/* Heading Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">About Us</h1>
          <p className="text-lg text-gray-600 mt-2">
            Empowering businesses with cutting-edge AI solutions.
          </p>
        </div>

        {/* YouTube Video Section */}
        <div className="flex justify-center mb-12">
          <div className="w-full md:w-3/4 lg:w-2/3 aspect-video">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/fVccQLilXEQ?si=dskSM1aVccTLfaVb"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Ukraine Support Banner */}
        <div className="bg-yellow-400 text-blue-900 text-center py-6 px-4 rounded-lg mb-12 shadow-md">
          <img src="/images/ukraine.png" alt="flag" className="w-24 mx-auto" />
          <h2 className="text-3xl font-bold mb-2">We Support Ukraine</h2>
          <p className="text-lg">
            At Best Global AI, we proudly stand with Ukraine in its fight for
            freedom and sovereignty. Our hearts are with all who are affected.
          </p>
        </div>

        {/* Team Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-6 text-center"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 mx-auto rounded-full border-4 border-gray-200"
              />
              <h3 className="text-xl font-semibold mt-4">{member.name}</h3>
              <p className="text-gray-500">{member.role}</p>
              <p className="text-gray-700 mt-2">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
