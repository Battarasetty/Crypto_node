import React, { useState } from "react";
import { Logo, USDT, Add, Minus } from "../assets";
import { useNavigate } from "react-router-dom";

const PriceControls = ({ price, onIncrement, onDecrement }) => {
  const isDecrementAllowed = price > 1000;

  return (
    <div className="relative flex items-center justify-between w-[450px] h-[60px]">
      <button
        onClick={onDecrement}
        className={`relative z-10 px-8 py-1 w-[10%] h-[60px] text-white rounded-l-full focus:outline-none overflow-hidden ${
          isDecrementAllowed ? "bg-[#5763F3]" : "bg-[#2B2E80]"
        }`}
      >
        <span className="absolute inset-0 flex items-center justify-center">
          <img src={Minus} alt="sub" className="w-7 h-7" />
        </span>
      </button>
      <div className="w-[74%] h-full border-t-2 border-b-2 border-gray-700 absolute left-[58px] top-0 z-0"></div>
      <p className="text-white font-bold text-[25px] relative z-10">{price}</p>
      <button
        onClick={onIncrement}
        className="relative z-10 px-8 py-1 bg-[#5763F3] w-[10%] h-[60px] text-white rounded-r-full focus:outline-none overflow-hidden"
      >
        <span className="absolute inset-0 flex items-center justify-center">
          <img src={Add} alt="sub" className="w-7 h-7" />
        </span>
      </button>
    </div>
  );
};

const BuyNodeComponent = () => {
  const [price, setPrice] = useState(1000);
  const navigate = useNavigate();

  const handleIncrement = () => {
    setPrice((prevPrice) => prevPrice + 1);
  };

  const handleDecrement = () => {
    setPrice((prevPrice) => (prevPrice > 1000 ? prevPrice - 1 : 1000));
  };

  const [checkBoxes, setCheckBoxes] = useState({
    terms1: false,
    terms2: false,
    terms3: false,
  });

  const handleCheckBoxChange = (name) => {
    setCheckBoxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      [name]: !prevCheckboxes[name],
    }));
  };

  const handleProceed = () => {
    if (checkBoxes.terms1 && checkBoxes.terms2 && checkBoxes.terms3) {
      navigate("/connect-wallet");
    } else {
      console.log("Please check all checkboxes before proceeding.");
    }
  };

  return (
    <div className="h-screen flex flex-col items-center mt-2 mx-auto">
      {/* Step 1 - Box with Box Shadow */}
      <div className="w-[600px] bg-[#181640] p-6 flex flex-col items-center">
        <div>
          <img src={Logo} alt="Founder's Node" className="w-20" />
        </div>
        <div className="mt-4">
          <h2 className="text-white text-3xl">FOUNDER'S NODE</h2>
        </div>
      </div>

      {/* Step 2 and Remaining Steps */}
      <div className="w-[450px]">
        <div className="flex items-center justify-between mt-4">
          <div className="">
            <p className="text-[#4D4C64] text-[18px]">Price:</p>
          </div>

          <div className="flex items-center gap-5 py-4">
            <img src={USDT} alt="USDT" className="w-6" />
            <p className="text-white text-2xl font-[400]">{price.toFixed(2)}</p>
          </div>
        </div>
        <div>
          <h1 className="text-[#4D4C64] text-[18px] mb-2">Quantity</h1>
          {/* Controls */}
          <PriceControls
            price={price}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
          />
        </div>
        {/* Checkboxes for Terms and Conditions */}
        <div className="flex flex-col items-start mt-8 px-8 gap-2">
          <label className="flex items-center space-x-5 checkbox-label">
            <input
              type="checkbox"
              checked={checkBoxes.terms1}
              onChange={() => handleCheckBoxChange("terms1")}
              className="h-4 w-4 text-[#46245F] focus:ring-2 focus:ring-offset-2 focus:ring-[#46245F] focus:ring-opacity-50"
            />
            <p className="text-[#767590] text-[15px]">
              I have read, understand and agree to the{" "}
              <span className="text-[#46245F]">Terms of Service</span>
            </p>
          </label>
          <label className="flex items-center space-x-5 checkbox-label">
            <input
              type="checkbox"
              checked={checkBoxes.terms2}
              onChange={() => handleCheckBoxChange("terms2")}
              className="h-4 w-4 text-[#46245F] focus:ring-2 focus:ring-offset-2 focus:ring-[#46245F] focus:ring-opacity-50"
            />
            <p className="text-[#767590] text-[15px]">
              I have read, understand and agree to the{" "}
              <span className="text-[#46245F]">Privacy Policy</span>
            </p>
          </label>
          <label className="flex items-center space-x-5 checkbox-label">
            <input
              type="checkbox"
              checked={checkBoxes.terms3}
              onChange={() => handleCheckBoxChange("terms3")}
              className="h-5 w-6 text-[#46245F] focus:ring-2 focus:ring-offset-2 focus:ring-[#46245F] focus:ring-opacity-50"
            />
            <p className="text-[#767590] text-[15px]">
              I have read, understand and agree that X Bull Run Founder's Nodes
              are <span className="text-[#46245F]">not investments</span>
            </p>
          </label>
        </div>{" "}
        {/* Remaining Steps */}
        <div className="mt-8 border py-2 px-4 rounded-lg">
          <p className="text-[#46245F] text-[18px] font-bold">
            0x65a0Ffc67eEd8Bc7272efE6A4928517177E874E9
          </p>
        </div>
        <p className="text-center py-4 px-4 text-[#767590] text-[13px]">
          VALID REFERAL WALLET ADDRESS
        </p>
        {/* Proceed Button with Gradient Background */}
        {/* Proceed Button with Gradient Background */}
        {/* Proceed Button with Gradient Background */}
      </div>

      {/* Button  */}
      <button
        onClick={handleProceed}
        className="uppercase w-[450px] py-2 rounded-lg text-[20px] font-semibold focus:outline-none bg-gradient-to-r from-[#FE81F3] via-[#568EE1] to-[#8419FE] text-white hover:from-[#2B2E80] hover:via-[#2B2E80] hover:to-[#A970F3]"
      >
        Proceed
      </button>

      {/* Back  */}
      <p
        className="text-center mt-2 text-white text-[13px] cursor-pointer"
        onClick={() => console.log("Go back")}
      >
        Back
      </p>
    </div>
  );
};

export default BuyNodeComponent;
