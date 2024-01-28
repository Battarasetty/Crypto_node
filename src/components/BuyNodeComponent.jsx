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
import {
  USDT_ABI,
  USDT_ADDRESS,
  transferUSDT,
  transferUSDTWithReferral,
} from "../web3Utils.js";
import { useDispatch, useSelector } from "react-redux";
import {
  setAccount,
  setMode,
  setProvider,
  setUserBalance,
} from "../redux/wallet/walletSlice.js";
import { IconButton, useTheme } from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";
import axios from "axios";
import { setSelectedWallet } from "../redux/theme/themeSlice.js";

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
    <div className="relative flex items-center justify-between w-full md:w-[450px] sm:w-[300px] h-[50px] sm:h-[60px]">
      <button
        onClick={onDecrement}
        className={`relative z-10 px-3 py-1 w-[20%] h-full text-white rounded-l-full focus:outline-none overflow-hidden ${
          quantity > 1 ? "bg-[#5763F3]" : "bg-[#2B2E80]"
        } sm:px-8 sm:py-1 sm:w-[10%] sm:h-[60px]`}
      >
        <span className="absolute inset-0 flex items-center justify-center">
          <img src={Minus} alt="sub" className="w-3 h-3 sm:w-4 sm:h-4" />
        </span>
      </button>
      <div className="w-[60%] sm:w-[70%] md:w-[74%] sm:py-6 h-full flex items-center justify-center border-t-2 border-b-2 border-gray-700">
        <p
          className="text-white font-bold text-[14px] sm:text-[16px] md:text-[18px] relative z-10"
          style={{ color: dark }}
        >
          {quantity}
        </p>
      </div>
      <button
        onClick={onIncrement}
        className="relative z-10 px-3 py-1 bg-[#5763F3] w-[20%] h-full text-white rounded-r-full focus:outline-none overflow-hidden 
    sm:py-1 sm:px-8 sm:w-[10%] sm:h-[60px]"
      >
        <span className="absolute inset-0 flex items-center justify-center">
          <img src={Add} alt="sub" className="w-3 h-3 sm:w-4 sm:h-4" />
        </span>
      </button>
    </div>
  );
};

const WalletItem = ({ icon, text, onClick, walletName }) => {
  const theme = useTheme();
  const dark = theme.palette.neutral.dark;

  return (
    <div
      className="wallet-item flex items-center justify-between gap-2 w-full p-3 cursor-pointer transition duration-300 ease-in-out transform hover:bg-[#2B2E80] hover:shadow-md"
      onClick={() => onClick(walletName)}
    >
      <div className="flex items-center gap-5">
        {icon} {/* Render the SVG icon directly */}
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
  const { account, provider, userBalance, mode } = useSelector(
    (state) => state.wallet
  );

  // console.log(selectedWallet);
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [checkBoxes, setCheckBoxes] = useState({
    terms1: false,
    terms2: false,
    terms3: false,
  });
  const [recipientError, setRecipientError] = useState("");
  const [amountError, setAmountError] = useState("");

  const [recipient, setRecipient] = useState(
    "0xE8101C518a6fD0C60dFE5e09E8F82bfC10634f1e"
  );
  const [amount, setAmount] = useState(1000);
  const [referralAddress, setReferralAddress] = useState("");
  const [isValidReferral, setIsValidReferral] = useState(false);
  // console.log(isValidReferral);
  // console.log(referralBonus);
  // console.log(referralAddress);
  // console.log(remainingAmount);
  // console.log(referralBonus);
  // console.log(remainingAmount);

  const handleConnectWallet = async (walletName) => {
    console.log("calling", walletName);
    dispatch(setSelectedWallet(walletName));

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

      // Extract necessary serializable data from newProvider
      const providerData = {
        network: newProvider._network,
      };

      dispatch(setProvider(providerData));
      dispatch(setUserBalance(null));
      dispatch(setAccount(selectedAccount));

      localStorage.setItem("connectedAccount", selectedAccount);

      // Check if there is a referral address
      const isValidReferralAddress = validateReferralAddress(referralAddress);

      if (isValidReferralAddress) {
        console.log("calling1");
        await transferUSDTWithReferral(
          recipient,
          amount,
          referralAddress,
          newProvider,
          selectedAccount
        );
      } else {
        console.log("calling2");
        await transferUSDT(recipient, amount, newProvider, selectedAccount);
      }

      const transactionDetails = {
        fromAddress: "senderAddressValue",
        toAddress: recipient,
        txHash: "transactionHashValue",
        nodesQuantity: 5,
        totalAmount: 1000,
        amountToOwner: 900,
        referralWalletAddress: referralAddress,
        amountToReferralWallet: 100,
      };

      // Store the USDT transaction details in the backend database
      await storeUSDTTransactionDetails(transactionDetails);

      navigate("/home");
    } catch (error) {
      console.log("Metamask Already Unlocked, Connecting....");
    }
  };

  const storeUSDTTransactionDetails = async (transactionDetails) => {
    try {
      // Make an API call to your backend server to store the transaction details
      const response = await axios.post(
        "http://152.67.7.210:9090/v1/xbr/usdt-transaction",
        transactionDetails
      );
      console.log("Transaction details stored successfully:", response.data);
    } catch (error) {
      console.error("Error storing transaction details:", error);
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

  // API FUNCTION FOR VERIFY-REFERAL-WALLET
  const verifyReferralWallet = async (referralAddress) => {
    console.log(referralAddress);
    try {
      // Make POST request to the verify-referral-wallet endpoint
      const response = await axios.post(
        "http://152.67.7.210:9090/v1/xbr/verify-referral-wallet",
        {
          referralWalletAddress: referralAddress,
        }
      );

      console.log(response.data);
    } catch (error) {
      // console.log("harish");
      console.error("Error verifying referral wallet:", error);
    }
  };

  const handleReferralInputChange = (e) => {
    const newReferralAddress = e.target.value;

    setReferralAddress(newReferralAddress);
    const isValid = validateReferralAddress(newReferralAddress);
    setIsValidReferral(isValid);

    verifyReferralWallet(newReferralAddress);
  };

  const handleProceed = () => {
    if (checkBoxes.terms1 && checkBoxes.terms2 && checkBoxes.terms3) {
      if (!referralAddress || validateReferralAddress(referralAddress)) {
        setStep(2);
      } else {
        console.log(
          "Please provide a valid referral address before proceeding."
        );
      }
    } else {
      console.log("Please check all checkboxes before proceeding.");
    }
  };

  const validateReferralAddress = (address) => {
    // console.log(address.length);
    return address.length === 42;
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

  return (
    <div className="h-screen flex flex-col items-center mx-auto">
      {/* Step 1 - Box with Box Shadow */}
      <div
        className="w-full md:w-[600px] bg-[#181640] p-4 md:p-6 flex flex-col items-center"
        style={{ background: alt }}
      >
        <div>
          {/* Adjust image size for mobile screens */}
          <img src={Logo} alt="Founder's Node" className="w-12 md:w-20 mt-2" />
        </div>
        <div className="mt-2 md:mt-4">
          {/* Adjust text size for mobile screens */}
          <h2
            className="text-white text-xl md:text-3xl"
            style={{ color: dark }}
          >
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
              <LightMode
                sx={{ color: dark, fontSize: { xs: "15px", md: "6xl" } }}
              />
            ) : (
              <DarkMode
                sx={{ color: dark, fontSize: { xs: "15px", md: "6xl" } }}
              />
            )}
          </IconButton>
          <div className="flex items-center justify-between mt-0 md:mt-4">
            <div className="">
              <p className="text-[#4D4C64] text-sm md:text-[18px]">Price:</p>
            </div>

            <div className="flex items-center gap-3 md:gap-5 py-4">
              {/* Adjust image size for small screens */}
              <img src={USDT} alt="USDT" className="w-4 md:w-6" />
              {/* Adjust text size for small screens */}
              <p
                className="text-white text-sm md:text-2xl font-[400]"
                style={{ color: dark }}
              >
                {amount.toFixed(2)}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-[#4D4C64] text-sm md:text-[18px] mb-2">
              Quantity
            </h1>
            {/* Controls */}
            <PriceControls
              quantity={quantity}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
            />
          </div>
          {/* Checkboxes for Terms and Conditions */}
          <div className="flex flex-col items-start mt-8 px-8 gap-4 md:gap-4">
            <label className="flex items-center space-x-5 checkbox-label">
              <input
                type="checkbox"
                checked={checkBoxes.terms1}
                onChange={() => handleCheckBoxChange("terms1")}
                className="cursor-pointer h-4 w-4 text-[#46245F] focus:ring-2 focus:ring-offset-2 focus:ring-[#46245F] focus:ring-opacity-50"
              />
              <p className="text-[#767590] text-[11px] md:text-[15px] cursor-pointer">
                I have read, understand and agree to the{" "}
                <span className="text-[#46245F]">Terms of Service</span>
              </p>
            </label>

            <label className="flex items-center space-x-5 checkbox-label">
              <input
                type="checkbox"
                checked={checkBoxes.terms2}
                onChange={() => handleCheckBoxChange("terms2")}
                className="cursor-pointer h-4 w-4 text-[#46245F] focus:ring-2 focus:ring-offset-2 focus:ring-[#46245F] focus:ring-opacity-50"
              />
              <p className="text-[#767590] text-[11px] md:text-[15px] cursor-pointer">
                I have read, understand and agree to the{" "}
                <span className="text-[#46245F]">Privacy Policy</span>
              </p>
            </label>

            <label className="flex items-center space-x-5 checkbox-label ">
              <input
                type="checkbox"
                checked={checkBoxes.terms3}
                onChange={() => handleCheckBoxChange("terms3")}
                className="cursor-pointer h-5 w-6 text-[#46245F] focus:ring-2 focus:ring-offset-2 focus:ring-[#46245F] focus:ring-opacity-50"
              />
              <p className="text-[#767590] text-[11px] md:text-[15px] cursor-pointer">
                I have read, understand and agree that X Bull Run Founder's
                Nodes are{" "}
                <span className="text-[#46245F]">not investments</span>
              </p>
            </label>
          </div>

          {/* Remaining Steps */}
          <div className="mt-8 flex flex-col gap-2 md:gap-4">
            <div>
              <div
                className="border py-[6px] px-4 rounded-lg focus-within:border-[#5763F3]"
                style={{ borderColor: dark }}
              >
                <input
                  type="text"
                  placeholder="ENTER REFERRAL ADDRESS"
                  className="w-full text-[#46245F] text-sm md:text-[14px] p-[6px] rounded-lg focus:outline-none bg-transparent border-none focus:border-none focus:ring-0"
                  value={referralAddress}
                  style={{ color: dark }}
                  onChange={handleReferralInputChange}
                />
              </div>

              {/* Add margin-top to create space between input and proceed button */}
              <div className="mt-3">
                {referralAddress && (
                  <div>
                    {/* Add a margin-top to create space */}
                    {isValidReferral ? (
                      <p className="text-center py-1 text-[#5E6B89] text-[13px]">
                        Valid referral wallet address
                      </p>
                    ) : (
                      <p className="text-center py-1 text-[#FF0000] text-[13px]">
                        Invalid referral wallet address
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={handleProceed}
              className={`uppercase w-full md:w-[450px] py-1 md:py-[6px] rounded-lg text-[20px] font-semibold focus:outline-none ${
                !Object.values(checkBoxes).every((isChecked) => isChecked)
                  ? "bg-[#888888] text-[#CCCCCC] cursor-not-allowed opacity-50" // Add opacity when disabled
                  : "bg-gradient-to-r from-[#FE81F3] via-[#568EE1] to-[#8419FE] text-white hover:from-[#2B2E80] hover:via-[#2B2E80] hover:to-[#A970F3]"
              }`}
              disabled={
                !Object.values(checkBoxes).every((isChecked) => isChecked)
              }
            >
              Proceed
            </button>
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
              <LightMode
                sx={{ color: dark, fontSize: { xs: "15px", md: "6xl" } }}
              />
            ) : (
              <DarkMode
                sx={{ color: dark, fontSize: { xs: "15px", md: "6xl" } }}
              />
            )}
          </IconButton>
          <div className="flex flex-col gap-2">
            <h5
              className="text-white mt-2 text-center text-[10px]"
              style={{ color: dark }}
            >
              {account === "Not connected"
                ? "Not Connected"
                : `Connected: ${account}`}
            </h5>

            <div className="w-full md:w-[350px] flex flex-col gap-2 md:gap-0 items-center mt-3 md:mt-5 md:ml-12">
              <WalletItem
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="45"
                    height="45"
                    viewBox="0 0 83.625 77.599"
                  >
                    <g id="MetaMask_Fox" transform="translate(-31.3 -35)">
                      <path
                        id="Path_2444"
                        data-name="Path 2444"
                        d="M206.84,35.5,174.6,59.445l5.962-14.127Z"
                        transform="translate(-96.53 0)"
                        fill="#e2761b"
                        stroke="#e2761b"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1"
                      />
                      <path
                        id="Path_2445"
                        data-name="Path 2445"
                        d="M37.3,35.5,69.283,59.672l-5.67-14.354ZM100.13,91,91.543,104.16l18.372,5.055L115.2,91.3ZM33.9,91.3l5.249,17.918,18.372-5.055L48.935,91Z"
                        transform="translate(-1.42 0)"
                        fill="#e4761b"
                        stroke="#e4761b"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1"
                      />
                      <path
                        id="Path_2446"
                        data-name="Path 2446"
                        d="M92.92,114.676,87.8,122.42l18.242.81-.648-19.6Zm36.064,0L116.346,103.4l-.421,19.83,18.21-.81ZM93.956,150.059l10.952-5.346-9.461-7.388Zm23.038-5.346,10.984,5.346-1.523-12.734Z"
                        transform="translate(-37.855 -45.899)"
                        fill="#e4761b"
                        stroke="#e4761b"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1"
                      />
                      <path
                        id="Path_2447"
                        data-name="Path 2447"
                        d="M140.822,236.246,129.838,230.9l.875,7.161-.1,3.013Zm-34.022,0,10.207,4.828-.065-3.013.81-7.161Z"
                        transform="translate(-50.698 -132.086)"
                        fill="#d7c1b3"
                        stroke="#d7c1b3"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1"
                      />
                      <path
                        id="Path_2448"
                        data-name="Path 2448"
                        d="M119.737,181.738l-9.137-2.689,6.448-2.949Zm13.252,0,2.689-5.638,6.48,2.949Z"
                        transform="translate(-53.267 -95.043)"
                        fill="#233447"
                        stroke="#233447"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1"
                      />
                      <path
                        id="Path_2449"
                        data-name="Path 2449"
                        d="M88.887,189.739l1.555-13.155-10.142.292Zm32.467-13.155,1.555,13.155,8.587-12.864Zm7.712-14.484-18.21.81,1.685,9.364,2.689-5.638,6.48,2.949Zm-38.947,7.485,6.48-2.949,2.657,5.638,1.717-9.364L82.73,162.1Z"
                        transform="translate(-32.785 -85.579)"
                        fill="#cd6116"
                        stroke="#cd6116"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1"
                      />
                      <path
                        id="Path_2450"
                        data-name="Path 2450"
                        d="M87.8,162.1,95.447,177l-.259-7.42Zm38.98,7.485-.324,7.42,7.679-14.9Zm-20.737-6.675-1.717,9.364,2.139,11.049.486-14.549Zm9.883,0-.875,5.832.389,14.581,2.171-11.049Z"
                        transform="translate(-37.855 -85.579)"
                        fill="#e4751f"
                        stroke="#e4751f"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1"
                      />
                      <path
                        id="Path_2451"
                        data-name="Path 2451"
                        d="M133.022,187.889l-2.171,11.049,1.555,1.069,9.461-7.388.324-7.42ZM110.6,185.2l.259,7.42,9.461,7.388,1.555-1.069-2.139-11.049Z"
                        transform="translate(-53.267 -101.194)"
                        fill="#f6851b"
                        stroke="#f6851b"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1"
                      />
                      <path
                        id="Path_2452"
                        data-name="Path 2452"
                        d="M130.616,252.228l.1-3.013-.81-.713H117.687l-.745.713.065,3.013L106.8,247.4l3.564,2.916,7.226,5.022H130l7.258-5.022,3.564-2.916Z"
                        transform="translate(-50.698 -143.24)"
                        fill="#c0ad9e"
                        stroke="#c0ad9e"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1"
                      />
                      <path
                        id="Path_2453"
                        data-name="Path 2453"
                        d="M151,228.669l-1.555-1.069h-8.975l-1.555,1.069-.81,7.161.745-.713h12.216l.81.713Z"
                        transform="translate(-71.857 -129.856)"
                        fill="#161616"
                        stroke="#161616"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1"
                      />
                      <path
                        id="Path_2454"
                        data-name="Path 2454"
                        d="M111.671,61l2.754-13.22L110.31,35.5,79.139,58.635,91.128,68.777l16.946,4.958,3.759-4.374-1.62-1.166,2.592-2.365L110.8,64.273l2.592-1.977ZM31.8,47.78,34.554,61,32.8,62.3,35.4,64.273,33.42,65.828l2.592,2.365-1.62,1.166,3.726,4.374,16.946-4.958L67.053,58.635,35.883,35.5Z"
                        transform="translate(0 0)"
                        fill="#763d16"
                        stroke="#763d16"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1"
                      />
                      <path
                        id="Path_2455"
                        data-name="Path 2455"
                        d="M109.494,94.217,92.548,89.259,97.7,97l-7.679,14.9,10.109-.13H115.2Zm-53.01-4.958L39.538,94.217,33.9,111.779H48.935l10.077.13L51.365,97ZM79.49,97.813l1.069-18.7L85.484,65.8H63.613l4.86,13.317,1.134,18.7.389,5.9.032,14.516H79l.065-14.516Z"
                        transform="translate(-1.42 -20.482)"
                        fill="#f6851b"
                        stroke="#f6851b"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1"
                      />
                    </g>
                  </svg>
                }
                text="Metamask"
                onClick={handleConnectWallet}
                walletName="Metamask"
                // fillColor={dark}
              />

              <WalletItem
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="45"
                    height="45"
                    viewBox="0 0 73.187 84.273"
                  >
                    <g
                      id="trust-wallet-token-twt-seeklogo"
                      transform="translate(-29.008 -23.711)"
                    >
                      <path
                        id="Path_2456"
                        data-name="Path 2456"
                        d="M513.1,369.641a4.286,4.286,0,0,1,4.28,4.341c-.205,12.266-.679,21.648-1.564,29.075-.862,7.427-2.16,12.944-4.115,17.408a27.668,27.668,0,0,1-4.852,7.552,37.787,37.787,0,0,1-8.724,6.709c-1.372.82-2.8,1.631-4.293,2.481-3.193,1.813-6.7,3.807-10.686,6.472a4.257,4.257,0,0,1-4.752,0c-4.043-2.694-7.6-4.714-10.818-6.538q-1.074-.609-2.1-1.2a45.69,45.69,0,0,1-10.12-7.262,25.9,25.9,0,0,1-5.043-7.242,50.637,50.637,0,0,1-4.029-14.445c-1.246-8.012-1.859-18.487-2.089-33.011a4.288,4.288,0,0,1,1.215-3.062,4.362,4.362,0,0,1,3.065-1.276h1.77c5.451.02,17.487-.514,27.9-8.618a4.294,4.294,0,0,1,5.247,0c10.409,8.1,22.445,8.645,27.923,8.618m-7.776,48.083a42.758,42.758,0,0,0,3.292-12.036c1.008-6.544,1.626-15.433,1.916-27.528-6.419-.186-17.448-1.42-27.962-8.5-10.514,7.057-21.542,8.288-27.942,8.5.227,10,.679,17.777,1.4,23.887.823,6.953,1.995,11.667,3.457,14.979A18.382,18.382,0,0,0,461,422.216a29.539,29.539,0,0,0,6.808,5.188c1.221.731,2.568,1.494,4.029,2.324,2.61,1.477,5.6,3.167,8.928,5.287,3.273-2.087,6.215-3.759,8.8-5.228.778-.442,1.521-.862,2.231-1.275a38.533,38.533,0,0,0,8.289-5.82,18.112,18.112,0,0,0,3.447-4.966"
                        transform="translate(-415.184 -336.42)"
                        fill={dark} // Pass the fill color dynamically
                        fillRule="evenodd"
                        />
                    </g>
                  </svg>
                }
                text="Trust Wallet"
                // onClick={handleConnectWallet}
                walletName="TrustWallet"
                // fillColor={dark} // Define the fill color dynamically
              />
              <WalletItem
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="45"
                    height="45"
                    viewBox="0 0 86.926 53.099"
                  >
                    <g
                      id="Layer_x0020_1"
                      transform="translate(-22.852 -38.824)"
                    >
                      <g id="_2806050136896" transform="translate(0.31 0.001)">
                        <path
                          id="Path_2457"
                          data-name="Path 2457"
                          d="M446.051,744.629a36.98,36.98,0,0,1,51.376,0l1.7,1.644a1.76,1.76,0,0,1,0,2.492l-5.832,5.673a.866.866,0,0,1-1.272,0l-2.333-2.28a25.806,25.806,0,0,0-35.841,0l-2.492,2.439a.866.866,0,0,1-1.272,0l-5.832-5.673a1.76,1.76,0,0,1,0-2.492l1.856-1.8Zm63.412,11.77,5.2,5.09a1.76,1.76,0,0,1,0,2.492l-23.435,22.852a1.825,1.825,0,0,1-2.545,0l-16.648-16.224a.484.484,0,0,0-.636,0l-16.648,16.224a1.825,1.825,0,0,1-2.545,0l-23.435-22.852a1.76,1.76,0,0,1,0-2.492l5.2-5.09a1.824,1.824,0,0,1,2.545,0l16.648,16.224a.484.484,0,0,0,.636,0L470.441,756.4a1.824,1.824,0,0,1,2.545,0l16.648,16.224a.484.484,0,0,0,.636,0L506.918,756.4a1.824,1.824,0,0,1,2.545,0Z"
                          transform="translate(-405.708 -695.426)"
                          fill={dark}
                        />
                      </g>
                    </g>
                  </svg>
                }
                text="Connect Wallet"
                // onClick={handleConnectWallet}
                walletName="connectWallet"
                // fillColor={dark} // Define the fill color dynamically
              />

              <WalletItem
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="45"
                    height="45"
                    viewBox="0 0 76.661 67.853"
                  >
                    <g
                      id="Group_1546"
                      data-name="Group 1546"
                      transform="translate(-2003.985 -1075.61)"
                    >
                      <path
                        id="Path_2458"
                        data-name="Path 2458"
                        d="M94.189,86.783H35.182a4.081,4.081,0,0,1-4.077-4.077V39.573a1.689,1.689,0,0,1,3.378,0V82.706a.708.708,0,0,0,.7.7H94.189a.708.708,0,0,0,.7-.7V46.521a.708.708,0,0,0-.7-.7h-29.5a1.689,1.689,0,1,1,0-3.378h29.5a4.082,4.082,0,0,1,4.077,4.075V82.706a4.081,4.081,0,0,1-4.077,4.077"
                        transform="translate(1981.38 1049.623)"
                        fill={dark}
                        stroke="#fff"
                        stroke-linejoin="round"
                        stroke-width="2"
                      />
                      <path
                        id="Path_2459"
                        data-name="Path 2459"
                        d="M87.826,46.564H37.354a6.249,6.249,0,0,1,0-12.5H63.331a1.689,1.689,0,0,1,0,3.378H37.354a2.871,2.871,0,1,0,0,5.742H87.826a2.871,2.871,0,0,0,0-5.742H78.658a1.689,1.689,0,1,1,0-3.378h9.168a6.249,6.249,0,0,1,0,12.5"
                        transform="translate(1981.38 1048.883)"
                        fill={dark}
                        stroke="#fff"
                        stroke-linejoin="round"
                        stroke-width="2"
                      />
                      <path
                        id="Path_2460"
                        data-name="Path 2460"
                        d="M87.514,66.914h-6.47a6.249,6.249,0,0,1,0-12.5h6.47a1.689,1.689,0,0,1,0,3.378h-6.47a2.871,2.871,0,0,0,0,5.742h6.47a1.689,1.689,0,0,1,0,3.378"
                        transform="translate(1989.845 1052.826)"
                        fill={dark}
                        stroke="#fff"
                        stroke-linejoin="round"
                        stroke-width="2"
                      />
                      <path
                        id="Path_2461"
                        data-name="Path 2461"
                        d="M42.1,47.592a1.689,1.689,0,0,1-.719-3.218L74.687,28.756,82.972,45.14a1.69,1.69,0,1,1-3.015,1.526l-6.8-13.46L42.812,47.432a1.685,1.685,0,0,1-.716.16"
                        transform="translate(1983.182 1047.854)"
                        fill={dark}
                        stroke="#fff"
                        stroke-linejoin="round"
                        stroke-width="2"
                      />
                      <path
                        id="Path_2462"
                        data-name="Path 2462"
                        d="M93.253,91.451l-11.2-19.4a5.286,5.286,0,0,0-9.157,0l-11.2,19.4a5.287,5.287,0,0,0,4.578,7.93h22.4a5.287,5.287,0,0,0,4.578-7.93"
                        transform="translate(1943 1044.083)"
                        fill="#ee7ae6"
                      />
                      <path
                        id="Path_2463"
                        data-name="Path 2463"
                        d="M75.074,86.228a1.69,1.69,0,0,1-1.689-1.689V78.594a1.689,1.689,0,1,1,3.378,0v5.945a1.69,1.69,0,0,1-1.689,1.689"
                        transform="translate(1945.403 1045.535)"
                        fill="#fff"
                      />
                      <path
                        id="Path_2464"
                        data-name="Path 2464"
                        d="M75.074,90.575a1.69,1.69,0,0,1-1.689-1.689v-.381a1.689,1.689,0,1,1,3.378,0v.381a1.69,1.69,0,0,1-1.689,1.689"
                        transform="translate(1945.403 1047.455)"
                        fill="#fff"
                      />
                    </g>
                  </svg>
                }
                text="Other Wallet"
                // onClick={handleConnectWallet}
                walletName="OtherWallet"
                // fillColor={dark} // Define the fill color dynamically
              />
            </div>

            <div className="w-full md:w-[350px] mx-auto mt-3 md:mt-5 text-center">
              <h3 className="text-[#EE7AE6] text-[14px] md:text-[17px] font-semibold mb-2">
                BEFORE YOU START
              </h3>
              <ol
                className="text-white text-[12px] md:text-[15px] text-left pl-4 list-decimal-none"
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

      {/* Back  */}
      {step === 1 && (
        <p
          className="text-center mt-0 md:mt-2 text-white text-[13px] cursor-pointer"
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
