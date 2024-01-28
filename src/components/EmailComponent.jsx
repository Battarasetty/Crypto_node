import React from "react";
import { subscribe_image } from "../assets";
import { useTheme } from "@mui/material";

const EmailComponent = () => {
  const theme = useTheme();
  const dark = theme.palette.neutral.dark;
  const primaryLight = theme.palette.primary.light;

  return (
    <div
      className="mx-4 md:mx-0 rounded-lg"
      style={{
        backgroundColor: primaryLight,
        boxShadow: "inset 0 2px 2px -2px rgba(21, 20, 71, 0.2), inset 0 -2px 2px -2px rgba(21, 20, 71, 0.2)",
        padding: "20px", // Adding padding for desktop screens
      }}
    >
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between md:justify-center gap-0 md:gap-16">
          <div className="md:w-[55%] mb-4 md:mb-0">
            <h1 className="text-white font-bold text-[20px] mb-4" style={{ color: dark }}>
              Stay on top of crypto investments by following the experts.
            </h1>
            <p className="text-[#838A9B] text-[12px]">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book. It has survived not only five centuries,
            </p>
          </div>
          <div className="md:w-[20%]">
            <img src={subscribe_image} alt="email" className="w-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailComponent;
