import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Logo,
  USDT,
  Add,
  Minus,
  MetaMask,
  trust_wallet,
  wallet_connect,
  other_wallet,
  arrow_right,
  arrow_left,
  MetaMask_Fox,
} from "../assets";
import { ethers } from "ethers";
import { USDT_ABI, USDT_ADDRESS, transferUSDT } from "../web3Utils.js";
import { useDispatch, useSelector } from "react-redux";
import {
  setAccount,
  setMode,
  setProvider,
  setUserBalance,
} from "../redux/wallet/walletSlice.js";
import { IconButton, useTheme } from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";

const PriceControls = ({ quantity, onIncrement, onDecrement }) => {
  let disableDecrease = quantity > 1;
  const theme = useTheme();
  // console.log(theme.palette.mode);
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;
  return (
    <div className="relative flex items-center justify-between w-full md:w-[450px] h-[60px]">
      <button
        onClick={onDecrement}
        className={`relative z-10 px-8 py-1 w-[10%] h-[60px] text-white rounded-l-full focus:outline-none overflow-hidden ${
          quantity > 1 ? "bg-[#5763F3]" : "bg-[#2B2E80]"
        }`}
      >
        <span className="absolute inset-0 flex items-center justify-center">
          <img src={Minus} alt="sub" className="w-7 h-7" />
        </span>
      </button>
      <div className="w-[74%] md:w-[74%] h-full border-t-2 border-b-2 border-gray-700 absolute left-[58px] top-0 z-0"></div>
      <p
        className="text-white font-bold text-[25px] md:text-[25px] relative z-10"
        style={{ color: dark }}
      >
        {quantity}
      </p>
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

const WalletItem = ({ src, text, onClick }) => {
  const theme = useTheme();
  // console.log(theme.palette.mode);
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  return (
    <div
      className="wallet-item flex items-center justify-between gap-2 w-full p-3 cursor-pointer transition duration-300 ease-in-out transform hover:bg-[#2B2E80] hover:shadow-md"
      onClick={onClick}
    >
      <div className="flex items-center gap-5">
        <img
          src={src}
          alt={alt}
          className="w-10 h-10 md:w-12 md:h-12 text-red-600"
        />
        <span className={`text-lg text-[#FFFFFF]`} style={{ color: dark }}>
          {text}
        </span>
      </div>
      <img src={arrow_left} alt="arrow" className="w-9 h-9 text-[#7724FB]" />
    </div>
  );
};

const BuyNodeComponent = () => {
  const dispatch = useDispatch();
  const { account, provider } = useSelector((state) => state.wallet);
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [checkBoxes, setCheckBoxes] = useState({
    terms1: false,
    terms2: false,
    terms3: false,
  });
  const [recipient, setRecipient] = useState(
    "0x65a0Ffc67eEd8Bc7272efE6A4928517177E874E9"
  );
  const [amount, setAmount] = useState(1000);
  const [recipientError, setRecipientError] = useState("");
  const [amountError, setAmountError] = useState("");
  const [referralBonus, setReferralBonus] = useState(0);
  const [remainingAmount, setRemainingAmount] = useState(0);
  // console.log(referralBonus);
  // console.log(remainingAmount);

  const handleConnectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Please install MetaMask to connect to the wallet.");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      const selectedAccount = accounts[0];
      const newProvider = new ethers.providers.Web3Provider(window.ethereum);

      dispatch(setAccount(selectedAccount));
      dispatch(setProvider(newProvider));
      dispatch(setUserBalance(null));

      localStorage.setItem("connectedAccount", selectedAccount);

      await transferUSDT(
        recipient,
        remainingAmount,
        newProvider,
        selectedAccount
      );

      navigate("/home");
    } catch (error) {
      console.log("Metamask Already Unlocked, Connecting....");
    }
  };

  const handleIncrement = () => {
    setAmount((prevPrice) => {
      let newPrice = prevPrice + 1000;

      if (newPrice > 10000) {
        newPrice = 10000;
      }

      // Increase the quantity by 1, but not exceeding 10
      let newQuantity = Math.min(quantity + 1, 10);

      setQuantity(newQuantity);

      return newPrice;
    });
  };

  const handleDecrement = () => {
    setAmount((prevPrice) => (prevPrice > 1000 ? prevPrice - 1000 : 1000));

    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
  };

  const handleCheckBoxChange = (name) => {
    setCheckBoxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      [name]: !prevCheckboxes[name],
    }));
  };

  const handleReferralInputChange = (e) => {
    const newReferralAddress = e.target.value;

    setReferralAddress(newReferralAddress);

    const isValid = validateReferralAddress(newReferralAddress);
    setIsValidReferral(isValid);

    if (!newReferralAddress) {
      setReferralBonus(0);
      setRemainingAmount(0);
    }
  };

  const handleProceed = () => {
    const isValidReferralAddress = validateReferralAddress(referralAddress);

    if (checkBoxes.terms1 && checkBoxes.terms2 && checkBoxes.terms3) {
      const totalAmount = amount;

      if (isValidReferralAddress) {
        const calculatedReferralBonus = 0.2 * totalAmount;
        const calculatedRemainingAmount = totalAmount - calculatedReferralBonus;

        setReferralBonus(calculatedReferralBonus);
        setRemainingAmount(calculatedRemainingAmount);

        setStep(2);
      } else {
        setRemainingAmount(totalAmount);
        setStep(2);

        console.log(
          "Please provide a valid referral address before proceeding."
        );
      }
    } else {
      setReferralBonus(0);
      setRemainingAmount(0);
      console.log("Please check all checkboxes before proceeding.");
    }
  };

  const handleClickBack = () => {
    setStep(1);
  };

  const theme = useTheme();
  // console.log(theme.palette.mode);
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const [referralAddress, setReferralAddress] = useState("");
  const [isValidReferral, setIsValidReferral] = useState(false);
  // console.log(isValidReferral);
  // console.log(referralBonus);
  console.log(referralAddress);
  // console.log(remainingAmount);

  const validateReferralAddress = (address) => {
    console.log(address.length);
    return address.length === 42;
  };

  return (
    <div className="h-screen flex flex-col items-center mx-auto">
      {/* Step 1 - Box with Box Shadow */}
      <div
        className="w-full md:w-[600px] bg-[#181640] md:p-6 flex flex-col items-center"
        style={{ background: alt }}
      >
        <div>
          <img src={Logo} alt="Founder's Node" className="w-20 mt-2" />
        </div>
        <div className="mt-4">
          <h2 className="text-white text-3xl" style={{ color: dark }}>
            {step === 1 ? "FOUNDER'S NODE" : "Connect with a wallet"}
          </h2>
        </div>
      </div>

      {step === 1 && (
        <div className="w-full p-4 md:p-0 md:w-[450px]">
          <IconButton
            onClick={() => dispatch(setMode())}
            style={{
              position: "fixed",
              top: "0px",
              right: "4px",
              md: { top: "10px" },
              md: { right: "10px" },
              zIndex: 1000,
            }}
          >
            {theme.palette.mode === "dark" ? (
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
            ) : (
              <DarkMode sx={{ fontSize: "25px" }} />
            )}
          </IconButton>
          <div className="flex items-center justify-between mt-4">
            <div className="">
              <p className="text-[#4D4C64] text-[18px]">Price:</p>
            </div>

            <div className="flex items-center gap-5 py-4">
              <img src={USDT} alt="USDT" className="w-6" />
              <p
                className="text-white text-2xl font-[400]"
                style={{ color: dark }}
              >
                {amount.toFixed(2)}
              </p>
            </div>
          </div>
          <div>
            <h1 className="text-[#4D4C64] text-[18px] mb-2">Quantity</h1>
            {/* Controls */}
            <PriceControls
              quantity={quantity}
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
              <p className="text-[#767590] text-[11px] md:text-[15px]">
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
              <p className="text-[#767590] text-[11px] md:text-[15px]">
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
              <p className="text-[#767590] text-[11px] md:text-[15px]">
                I have read, understand and agree that X Bull Run Founder's
                Nodes are{" "}
                <span className="text-[#46245F]">not investments</span>
              </p>
            </label>
          </div>{" "}
          {/* Remaining Steps */}
          <div className="my-5">
            <div className="mt-8 border py-2 px-4 rounded-lg">
              <input
                type="text"
                placeholder="ENTER REFERRAL ADDRESS"
                className="w-full text-[#46245F] text-[12px] md:text-[18px] font-bold p-2 rounded-lg focus:outline-none bg-transparent"
                value={referralAddress}
                onChange={handleReferralInputChange}
              />
            </div>

            {referralAddress && (
              <div>
                {isValidReferral ? (
                  <p className="text-center py-4 px-4 text-[#767590] text-[13px]">
                    VALID REFERRAL WALLET ADDRESS
                  </p>
                ) : (
                  <p className="text-center py-4 px-4 text-[#FF0000] text-[13px]">
                    INVALID REFERRAL WALLET ADDRESS
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {step === 2 && (
        <>
          <IconButton
            onClick={() => dispatch(setMode())}
            style={{
              position: "fixed",
              top: "0px",
              right: "4px",
              md: { top: "10px" },
              md: { right: "10px" },
              zIndex: 1000,
            }}
          >
            {theme.palette.mode === "dark" ? (
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
            ) : (
              <DarkMode sx={{ fontSize: "25px" }} />
            )}
          </IconButton>
          <div>
            <h5
              className="text-white mt-2 text-center text-[10px]"
              style={{ color: dark }}
            >
              {account === "Not connected"
                ? "Not Connected"
                : `Connected: ${account}`}
            </h5>

            <div className="w-full md:w-[350px] flex flex-col items-center mt-3 md:mt-5 md:ml-12">
              <WalletItem
                src={MetaMask_Fox}
                // alt="Metamask"
                text="Metamask"
                onClick={handleConnectWallet}
              />
              <WalletItem
                src={trust_wallet}
                // alt="Trust Wallet"
                text="Trust Wallet"
              />
              <WalletItem
                src={wallet_connect}
                // alt="Connect Wallet"
                text="Connect Wallet"
              />
              <WalletItem
                src={other_wallet}
                // alt="Other Wallet"
                text="Other Wallet"
              />
            </div>

            <div className="w-full md:w-[350px] mx-auto mt-3 md:mt-5 text-center">
              <h3 className="text-[#EE7AE6] text-[17px] font-semibold mb-2">
                BEFORE YOU START
              </h3>
              <ol
                className="text-white text-[15px] text-left pl-4 list-decimal-none"
                style={{ color: dark }}
              >
                <li>1. Download Dapp Wallet app or extension</li>
                <li>2. Switch to Ethereum Network</li>
                <li>3. Transfer USDT to your Dapp wallet</li>
                <li>4. Get an invitation code</li>
              </ol>
            </div>
            <button
              onClick={handleClickBack}
              className="mx-auto mt-5 w-full md:w-[450px] py-2 rounded-lg text-[20px] font-semibold focus:outline-none bg-gradient-to-r from-[#FE81F3] via-[#568EE1] to-[#8419FE] text-white hover:from-[#2B2E80] hover:via-[#2B2E80] hover:to-[#A970F3]"
            >
              BACK
            </button>
          </div>
        </>
      )}

      {/* Button  */}
      {step === 1 && (
        <button
          onClick={handleProceed}
          className={`uppercase w-[90%] md:w-[450px] py-2 rounded-lg text-[20px] font-semibold focus:outline-none ${
            !Object.values(checkBoxes).every((isChecked) => isChecked)
              ? "bg-[#888888] text-[#CCCCCC] cursor-not-allowed"
              : "bg-gradient-to-r from-[#FE81F3] via-[#568EE1] to-[#8419FE] text-white hover:from-[#2B2E80] hover:via-[#2B2E80] hover:to-[#A970F3]"
          }`}
          disabled={!Object.values(checkBoxes).every((isChecked) => isChecked)}
        >
          Proceed
        </button>
      )}

      {/* Back  */}
      {step === 1 && (
        <p
          className="text-center mt-2 text-white text-[13px] cursor-pointer"
          onClick={handleClickBack}
          style={{ color: dark }}
        >
          Back
        </p>
      )}
    </div>
  );
};

export default BuyNodeComponent;
