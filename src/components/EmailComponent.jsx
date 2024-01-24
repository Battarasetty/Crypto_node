import React from "react";
import { subscribe_image } from "../assets";
import { useTheme } from "@mui/material";

const EmailComponent = () => {
  const theme = useTheme();
  // console.log(theme.palette.mode);
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  return (
    <div
      className=""
      style={{
        backgroundColor: primaryLight,
        boxShadow: "inset 0 2px 2px -2px rgba(21, 20, 71, 0.2), inset 0 -2px 2px -2px rgba(21, 20, 71, 0.2)"
      }}
    >
      <div className="container flex items-center justify-between mx-auto md:pt-8 px-[2.25rem]">
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
