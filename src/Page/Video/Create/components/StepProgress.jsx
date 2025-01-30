import React from "react";

const steps = ["Replica", "Background", "Content", "Create"];

const StepProgress = ({ currentStep }) => {
  return (
    <div className="mb-4 flex justify-between text-gray-500">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full ${
              currentStep >= index
                ? "bg-purple-500 text-white"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            {index + 1}
          </div>
          <span className="ml-2">{step}</span>
        </div>
      ))}
    </div>
  );
};

export default StepProgress;
