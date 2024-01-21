import React from "react";
import { subscribe_image } from "../assets";

const EmailComponent = () => {
  return (
    <div className="" style={{ backgroundColor: "#151447" }}>
      <div className="container flex items-center justify-between mx-auto pt-8 px-[2.25rem]">
        <div className="md:w-[55%] ">
          <h1 className=" text-white font-bold text-[20px]">
            Stay on top of crypto investments by following the experts.
          </h1>
          <p className="mb-4 text-[#838A9B] text-[12px]">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries,
          </p>
        </div>
        <div className="md:w-[20%]">
          <img src={subscribe_image} alt="email" className="" />
        </div>
      </div>
    </div>
  );
};

export default EmailComponent;
