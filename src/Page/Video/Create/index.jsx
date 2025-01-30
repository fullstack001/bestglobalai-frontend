import React, { useState } from "react";
import StepProgress from "./components/StepProgress";
import AvatarStep from "./components/Steps/AvatarStep";
import ContentStep from "./components/Steps/ContentStep";
import BackgroundStep from "./components/Steps/BackgroundStep";
import CreateVideoStep from "./components/Steps/CreateVideoStep";
import Layout from "../../../components/Layout";

const steps = [
  { component: AvatarStep, title: "Select Avatar" },
  { component: BackgroundStep, title: "Select Background" },
  { component: ContentStep, title: "Select Voice" },
  { component: CreateVideoStep, title: "Create Video" },
];

const VideoCreatorPage = () => {
  const [videoData, setVideoData] = useState({
    currentStep: 0,
    character: null,
    voice: null,
    background: null,
  });

  const handleNextStep = (data) => {
    setVideoData((prevData) => ({
      ...prevData,
      ...data,
      currentStep: prevData.currentStep + 1,
    }));
  };
  const handleprevStep = (data) => {
    setVideoData((prevData) => ({
      ...prevData,
      ...data,
      currentStep: prevData.currentStep - 1,
    }));
  };
  console.log(videoData);

  const StepComponent = steps[videoData.currentStep].component;

  return (
    <Layout titleText="Video Creator">
      <div className="p-6 ">
        <h1 className="mb-4 text-2xl font-bold text-gray-300">
          {steps[videoData.currentStep].title}
        </h1>
        <StepProgress currentStep={videoData.currentStep} />
        <StepComponent
          onNext={handleNextStep}
          onPrev={handleprevStep}
          videoData={videoData} // Add language property
        />
      </div>
    </Layout>
  );
};

export default VideoCreatorPage;
