import React from "react";
import { IoIosArrowForward, IoIosCheckmarkCircleOutline } from "react-icons/io";
import { useDispatch } from "react-redux";
import extra_background from "../../assets/images/landing/extra_background.png";
import { useNavigate } from "react-router-dom";

import { setExtra } from "../../store/getExtra";
import { extraData } from "../../lib/extraData";

const Extra = () => {
  const dispatch = useDispatch();
  const email = localStorage.getItem("email");
  const navigate = useNavigate();

  const purchaseExtra = (item) => {
    console.log(item);
    dispatch(setExtra({ ...item }));
    if (email) {
      navigate("/extra-payment");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 gap-2 items-center mt-24 text-center container">
      <h3 className="text-4xl sm:text-4xl md:text-6xl mt-6">Extras</h3>

      {extraData.map((item, index) => (
        <div
          key={index}
          className="relative bg-cover bg-center w-full rounded-3xl p-8 mt-12 block md:flex justify-between"
          style={{
            backgroundImage: `url(${extra_background})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div className="bg-opacity-80 rounded-xl p-6 max-w-2xl mx-auto text-left">
            <h3 className="text-2xl font-bold text-gray-900">{item.title}</h3>
            <p className="mt-4 text-gray-700 text-lg">{item.description}</p>
            <div className="text-2xl font-bold text-gray-700 mt-6">
              Starting at{" "}
              <span className="text-3xl text-gray-900">{item.price}</span>
            </div>
            <button
              onClick={() => purchaseExtra(item)}
              className="bg-blue-600 text-white px-6 py-2 w-full text-center rounded-full mt-6 hover:bg-blue-700 transition duration-300 flex justify-center text-2xl"
            >
              Purchase
              <IoIosArrowForward className="ml-2 mt-1" />
            </button>
          </div>
          <div className="mt-8 text-left bg-white p-4 border rounded-3xl flex flex-col justify-center">
            <h4 className="text-lg font-bold text-gray-900 text-left mb-3">
              What's Included
            </h4>
            <ul className="mt-4 text-gray-700">
              {item.features.map((feature, idx) => (
                <li key={idx} className="flex items-start mb-3">
                  <IoIosCheckmarkCircleOutline className="text-green-400 rounded-full w-[28px] h-[24px] text-xl mr-1" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Extra;
