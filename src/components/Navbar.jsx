import React, { useEffect, useRef, useState } from "react";
import {
  Logo,
  Favorite,
  pie,
  Notification_bold,
  Notification,
  Arrow_down,
  toggle_effect,
} from "../assets/";
import {
  DarkMode,
  LightMode,
} from "@mui/icons-material";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";
// import ConnectWalletModal from "../../components/ConnectWalletModal";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  disconnectWallet,
  setAccount,
  setProvider,
  setUserBalance,
  setMode
} from "../redux/wallet/walletSlice";
// import { useSelector } from "react-redux";
// import { WhiteListModal } from "../../components";
// import { SwipeableDrawer } from "@mui/material";

const Navbar = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [hasNotifications, setHasNotifications] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Pool Participants");
  const [arrowRotation, setArrowRotation] = useState(0);
  const [arrowRotation2, setArrowRotation2] = useState(0);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isDropdownOpen2, setDropdownOpen2] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [drawerState, setDrawerState] = useState({
    left: false,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { account, provider, userBalance } = useSelector(
    (state) => state.wallet
  );

  // const theme = useTheme();
  // const neutralLight = theme.palette.neutral.light;
  // const dark = theme.palette.neutral.dark;
  // const background = theme.palette.background.default;
  // const primaryLight = theme.palette.primary.light;
  // const alt = theme.palette.background.alt;


  const handleDisconnect = async () => {
    try {
      dispatch(disconnectWallet());

      navigate("/");
    } catch (error) {
      console.error("Error disconnecting wallet:", error);
    }
  };

  const mockDataToken = [
    {
      id: 1,
      token: "USDT",
      value: 0.0,
    },
    {
      id: 2,
      token: "ETH",
      value: 0.0,
    },
    {
      id: 3,
      token: "XBR",
      value: 0.0,
    },
  ];

  const dropdownRef = useRef(null);
  const dropdownRef2 = useRef(null);

  useEffect(() => {
    // Check for connected wallet in local storage when component mounts
    const storedAccount = localStorage.getItem("connectedAccount");
    if (storedAccount) {
      setWalletAddress(storedAccount);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        dropdownRef2.current &&
        !dropdownRef2.current.contains(event.target)
      ) {
        setDropdownOpen(false);
        setArrowRotation(0);

        setDropdownOpen2(false);
        setArrowRotation2(0);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isDropdownOpen, isDropdownOpen2]);

  //   const whitelist = useSelector((state) => state.whitelist.whitelist);

  // const connectWallet = async () => {
  //   if (
  //     typeof window !== "undefined" &&
  //     typeof window.ethereum !== "undefined"
  //   ) {
  //     try {
  //       // Metamask is installed
  //       const accounts = await window.ethereum.request({
  //         method: "eth_requestAccounts",
  //       });

  //       // Set the wallet address
  //       setWalletAddress(accounts[0]);

  //       // Trigger handleConnectWallet function
  //       handleConnectWallet();

  //       console.log(accounts[0]);
  //     } catch (error) {
  //       console.error(error.message);
  //     }
  //   } else {
  //     // Metamask is not installed
  //     console.log("please install Metamask");
  //   }
  // };

  // const getCurrentWalletConnected = async () => {
  //   if (
  //     typeof window !== "undefined" &&
  //     typeof window.ethereum !== "undefined"
  //   ) {
  //     try {
  //       const accounts = await window.ethereum.request({
  //         method: "eth_accounts",
  //       });
  //       if (accounts.length > 0) {
  //         setWalletAddress(accounts[0]);
  //         console.log(accounts[0]);
  //       } else {
  //         console.log("Connect the metamask using Connect Button");
  //       }
  //     } catch (error) {
  //       console.error(error.message);
  //     }
  //   } else {
  //     // Metamask is not installed
  //     console.log("please install Metamask");
  //   }
  // };

  // useEffect(() => {
  //   getCurrentWalletConnected();
  //   addWalletListener();

  //   // Attach event listener
  //   window.addEventListener("resize", handleResize);

  //   // Cleanup event listener on component unmount
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  // const addWalletListener = async () => {
  //   if (
  //     typeof window !== "undefined" &&
  //     typeof window.ethereum !== "undefined"
  //   ) {
  //     window.ethereum.on("accountsChanged", (accounts) => {
  //       setWalletAddress(accounts[0]);
  //       console.log(accounts[0]);
  //     });
  //   } else {
  //     // Metamask is not installed
  //     setWalletAddress("");
  //     console.log("please install Metamask");
  //   }
  // };

  //   const handleWhitelistClick = () => {
  //     setWhitelistModalOpen(true);
  //   };

  //   const closeWhitelistModal = () => {
  //     setWhitelistModalOpen(false);
  //   };

  const handleDropdownChange = () => {
    setDropdownOpen(!isDropdownOpen);
    setArrowRotation(isDropdownOpen ? 0 : 180); // Rotate 180 degrees when opening, reset to 0 when closing
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setDropdownOpen(false);
    setArrowRotation(0);
  };

  const [selectedOption2, setSelectedOption2] = useState("Ethereum"); // Make sure you have this state variable
  const options2 = ["Ethereum", "Binance", "Avalanche", "Fantom", "Arbitrum"]; // Make sure you have this array

  const handleDropdownChange2 = () => {
    setDropdownOpen2(!isDropdownOpen2);
    setArrowRotation2(isDropdownOpen2 ? 0 : 180);
  };

  const handleOptionClick2 = (option) => {
    setSelectedOption2(option);
    setDropdownOpen2(false);
    setArrowRotation2(0);
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerState({ ...drawerState, [anchor]: open });
  };

  return (
    <>
      <header className="border-b">
        <div className="flex justify-between m-auto items-center p-3 ">
          {isMobile ? (
            <div className="flex items-center">
              <div className="flex flex-col items-center cursor-pointer">
                <img src={Logo} alt="" className="w-12 h-12 relative" />
                <span className="text-sm font-medium text-[#3840CD] absolute top-[38px] left-[50px]">
                  BULL RUN
                </span>
              </div>
            </div>
          ) : (
            <div className="flex items-center">
              <Link to="/">
                <div className="flex flex-col items-center">
                  <img src={Logo} alt="" className="w-12 h-12 relative" />
                  {/* <span className="text-sm font-medium text-[#3840CD] absolute top-[38px] left-[50px]">
                    BULL RUN
                  </span> */}
                </div>
              </Link>
            </div>
          )}

          <div className="flex items-center space-x-6">
            {!isMobile && (
              <ul className="flex items-center space-x-6">
                {mockDataToken.map((item) => (
                  <li
                    key={item.id}
                    className="flex gap-2 items-center text-sm text-gray-500"
                  >
                    <span>{item.token}:</span>
                    <span className="text-blue-500">
                      {item.value.toFixed(4)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
            {!isMobile && (
              <div className="flex items-center space-x-4">
                <div
                  className="flex items-center space-x-2 cursor-pointer transform transition-transform hover:scale-110"
                  //   onClick={handleWhitelistClick}
                >
                  <img src={Favorite} alt="Favorite Icon" className="w-4 h-4" />
                  <p className="text-sm text-white">Whitelist</p>
                </div>
                <div className="flex items-center space-x-2 hover:scale-110 cursor-pointer">
                  <img src={pie} alt="Pie Icon" className="w-4 h-4" />
                  <p className="text-sm text-white">Portfolio</p>
                </div>
                <div className="relative hover:scale-110 cursor-pointer">
                  <img
                    src={hasNotifications ? Notification_bold : Notification}
                    alt="Notification Icon"
                    className="w-6 h-6"
                  />
                  {hasNotifications && (
                    <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                  )}
                </div>
              </div>
            )}
            <div
              className={`flex items-center space-x-4 ${
                isMobile ? "justify-end" : ""
              }`}
            >
              <div
                className="dropdown-style text-white text-center cursor-pointer"
                style={{
                  backgroundColor: "#5763F3", // Set background color to #5763F3
                  padding: "6px",
                  borderRadius: "10px",
                  border: "none",
                  width: "100px", // Set your desired width
                  boxShadow: isDropdownOpen
                    ? "0px 4px 8px rgba(0, 0, 0, 0.1)"
                    : "none",
                }}
              >
                Node
              </div>

              {/* Dropdown 1 */}
              <div
                ref={dropdownRef}
                className={`relative ${isMobile ? "hidden" : "block"}`}
              >
                <div
                  className="flex items-center justify-between gap-[4px] cursor-pointer"
                  onClick={handleDropdownChange}
                  style={{
                    backgroundColor: "transparent", // Set to 'transparent'
                    padding: "6px",
                    borderRadius: "10px",
                    border: `2px solid ${
                      isDropdownOpen ? "#1890ff" : "#808080"
                    }`,
                    width: "170px",
                    boxShadow: isDropdownOpen
                      ? "0px 4px 8px rgba(0, 0, 0, 0.1)"
                      : "none",
                  }}
                >
                  <div className="dropdown-style text-white cursor-pointer">
                    {selectedOption}
                  </div>
                  <img
                    src={Arrow_down}
                    alt="arrow_down"
                    className="w-3 h-3"
                    style={{
                      fill: isDropdownOpen ? "#1890ff" : "#808080",
                      transform: `rotate(${arrowRotation}deg)`,
                      transition: "transform 0.3s ease",
                    }}
                  />
                </div>

                {isDropdownOpen && (
                  <div className="absolute w-[170px] top-full left-0 z-10 border text-white border-gray-300 shadow-md max-h-36 overflow-y-auto mt-2 rounded-md">
                    {selectedOption === "Pool Participants" ? (
                      <div
                        onClick={() => handleOptionClick("Pool Creator")}
                        className="p-3 cursor-pointer transition-all hover:bg-gray-100"
                      >
                        Pool Creator
                      </div>
                    ) : (
                      <div
                        onClick={() => handleOptionClick("Pool Participants")}
                        className="p-3 cursor-pointer transition-all hover:bg-gray-100"
                      >
                        Pool Participant
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Dropdown 2 */}
              <div
                ref={dropdownRef2}
                className={`relative ${isMobile ? "hidden" : "block"}`}
              >
                <div
                  className="flex items-center justify-between gap-[4px] cursor-pointer"
                  onClick={handleDropdownChange2}
                  style={{
                    backgroundColor: "transparent", // Set to 'transparent'
                    padding: "6px",
                    borderRadius: "10px",
                    border: `2px solid ${
                      isDropdownOpen2 ? "#1890ff" : "#808080"
                    }`,
                    boxShadow: isDropdownOpen2
                      ? "0px 4px 8px rgba(0, 0, 0, 0.1)"
                      : "none",
                    width: "125px",
                  }}
                >
                  <div className="dropdown-style text-white cursor-pointer">
                    {selectedOption2}
                  </div>
                  <img
                    src={Arrow_down}
                    alt="arrow_down"
                    className={`w-3 h-3 ${
                      isDropdownOpen2 ? "text-blue-500" : "text-gray-500"
                    }`}
                    style={{
                      fill: isDropdownOpen2 ? "#1890ff" : "#808080",
                      transform: `rotate(${arrowRotation2}deg)`,
                      transition: "transform 0.3s ease",
                    }}
                  />{" "}
                </div>

                {isDropdownOpen2 && (
                  <div className="absolute w-[170px] text-white top-full left-0 z-10 border border-gray-300 shadow-md max-h-36 overflow-y-auto mt-2 rounded-md">
                    {options2.map((option, index) => (
                      <div
                        key={index}
                        onClick={() => handleOptionClick2(option)}
                        className="p-3 cursor-pointer transition-all hover:bg-gray-100"
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Connect Wallet */}
              <div className="text-white">
                <button
                  className={`p-1.5 border-none border-2 rounded-lg bg-blue-500 text-white ${
                    isMobile ? "rounded-full" : ""
                  }`}
                  onClick={handleDisconnect}
                >
                  {walletAddress ? (
                    <>
                      <span>{walletAddress.slice(0, 6)}</span> ...
                      <span>{walletAddress.slice(-6)}</span>{" "}
                    </>
                  ) : (
                    "Connect Wallet"
                  )}
                </button>
              </div>
              <div>
                <img
                  src={toggle_effect}
                  alt="light_dark_mode"
                  className="w-6 h-6 cursor-pointer"
                />
              </div>

              {/* Hamburger Icon for Mobile */}
              {/* {isMobile && (
                <img
                  src={hamburger}
                  alt="hamburger_menu"
                  className="w-8 h-8 cursor-pointer"
                  onClick={toggleDrawer("right", true)}
                />
              )} */}
            </div>
          </div>
        </div>

        {/* <div className="w-[80vw] mx-auto">
          <ConnectWalletModal
            open={openModal}
            handleClose={handleClose}
            onPoolCreatorClick={handlePoolCreatorClick}
            onPoolParticipantClick={handlePoolParticipantClick}
          />
        </div> */}
      </header>

      {/* <WhiteListModal
        open={isWhitelistModalOpen}
        handleClose={closeWhitelistModal}
        title="Whitelisted Items"
        content={
          <ul>
            {whitelist.map((item) => (
              <li key={item._id}>
                <p className="text-white">_id: {item._id}</p>
                <p className="text-white">Pool ID: {item["Pool ID"]}</p>
              </li>
            ))}
          </ul>
        }
      /> */}

      {/* <SwipeableDrawer
        anchor={"right"}
        open={drawerState["right"]}
        onClose={toggleDrawer("right", false)}
        onOpen={toggleDrawer("right", true)}
      >
        {list("right")}
      </SwipeableDrawer> */}
    </>
  );
};

export default Navbar;
