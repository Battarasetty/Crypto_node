import React, { useEffect, useRef, useState } from "react";
import {
  Logo,
  Favorite,
  pie,
  Notification_bold,
  Notification,
  Arrow_down,
  toggle_effect,
  hamburger,
  clear,
  USDT,
  XRP,
  Etherum,
} from "../assets/";
import CancelSharpIcon from "@mui/icons-material/CancelSharp";
import { DarkMode, KeyboardArrowDown, LightMode } from "@mui/icons-material";
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
  SwipeableDrawer,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  disconnectWallet,
  setAccount,
  setProvider,
  setUserBalance,
  setMode,
} from "../redux/wallet/walletSlice";
import MenuIcon from "@mui/icons-material/Menu";
import { ethers } from "ethers";

const Navbar = () => {
  const [hasNotifications, setHasNotifications] = useState(true);
  const [selectedOption, setSelectedOption] = useState("Pool Participants");
  const [arrowRotation, setArrowRotation] = useState(0);
  const [arrowRotation2, setArrowRotation2] = useState(0);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isDropdownOpen2, setDropdownOpen2] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isHovered, setIsHovered] = useState(false);

  const [drawerState, setDrawerState] = useState({
    left: false,
  });

  function DropdownItem({ label, onClick, style }) {
    return (
      <div
        className="p-3 cursor-pointer transition-all hover:bg-gray-100"
        onClick={onClick}
        style={{ color: style.color }}
      >
        {label}
      </div>
    );
  }

  function Dropdown({
    isMobile,
    isDropdownOpen,
    alt,
    dark,
    dropdownRef,
    handleDropdownChange,
    selectedOption,
    arrowRotation,
    options,
  }) {
    return (
      <div
        ref={dropdownRef}
        style={{ backgroundColor: alt }}
        className={`relative ${
          isMobile ? "hidden" : "block md:flex equal-width-dropdown"
        }`}
      >
        <div
          className="flex items-center justify-between gap-[4px] cursor-pointer"
          onClick={handleDropdownChange}
          style={{
            backgroundColor: "transparent",
            padding: "6px",
            borderRadius: "10px",
            border: `1px solid ${isDropdownOpen ? "#1890ff" : "#808080"}`,
            boxShadow: isDropdownOpen
              ? "0px 4px 8px rgba(0, 0, 0, 0.1)"
              : "none",
          }}
        >
          <div
            style={{ color: dark }}
            className="dropdown-style text-white cursor-pointer"
          >
            {selectedOption}
          </div>
          <KeyboardArrowDown
            style={{
              transform: `rotate(${arrowRotation}deg)`,
              transition: "transform 0.3s ease",
              color: isDropdownOpen ? "#1890ff" : "#808080",
            }}
          />
        </div>

        {isDropdownOpen && (
          <div className="absolute top-full left-0 z-10 border text-white border-gray-300 shadow-md max-h-36 overflow-y-auto mt-2 rounded-md">
            {options.map((option, index) => (
              <DropdownItem
                key={index}
                label={option}
                onClick={() => handleOptionClick(option)}
                style={{ color: dark }}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { account, provider, userBalance, mode } = useSelector(
    (state) => state.wallet
  );

  // const { selectedWallet } = useSelector((state) => state.theme.selectedWallet);

  // console.log(selectedWallet);

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const [isPopupOpen, setPopupOpen] = useState(false);

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  const handleDisconnect = async () => {
    try {
      await dispatch(disconnectWallet());

      closePopup();

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
      dispatch(setAccount(storedAccount));
    }
  }, [dispatch]);

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const updateWindowSize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    const handleResize = () => {
      updateWindowSize();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array ensures it only runs once on mount

  useEffect(() => {
    // Check the window size and update your responsive state accordingly
    const isMobileDevice = windowSize.width <= 768;
    setIsMobile(isMobileDevice);
    // Add similar logic for other responsive state variables if needed
  }, [windowSize]);

  const [dropdownContentWidth, setDropdownContentWidth] = useState(170); // Set initial width

  // Function to calculate the width of the dropdown content
  const calculateDropdownContentWidth = () => {
    const contentWidth = dropdownRef.current.offsetWidth; // Adjust this based on your content
    setDropdownContentWidth(contentWidth);
  };

  // Call the function to calculate the width when necessary
  useEffect(() => {
    calculateDropdownContentWidth();
  }, [selectedOption]); // Up

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

  const handleDropdownChange = () => {
    setDropdownOpen(!isDropdownOpen);
    setArrowRotation(isDropdownOpen ? 0 : 180);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setDropdownOpen(false);
    setArrowRotation(0);
  };

  const [selectedOption2, setSelectedOption2] = useState("Ethereum");
  const options2 = ["Ethereum", "Binance", "Avalanche", "Fantom", "Arbitrum"];

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

  useEffect(() => {
    const handleAccountsChanged = (newAccounts) => {
      const { ethereum } = window;
      if (!ethereum) {
        console.error("MetaMask is not installed.");
        return;
      }
      if (newAccounts.length > 0) {
        // Dispatch the setWalletAddress action to update Redux state
        dispatch(setAccount(newAccounts[0]));

        // Update local storage
        localStorage.setItem("connectedAccount", newAccounts[0]);

        // Set the provider when the account changes
        const newProvider = new ethers.providers.Web3Provider(window.ethereum);
        const providerData = {
          network: newProvider._network, // Example: You can extract necessary properties
        };

        // Dispatch only serializable provider data
        dispatch(setProvider(providerData));
      } else {
        // dispatch(setAccount("Not connected")); // This will update the Redux store
        localStorage.removeItem("connectedAccount"); // This will remove the wallet address from local storage

        dispatch(setProvider(null));
        dispatch(setUserBalance(null));
      }
    };

    // Check if MetaMask is installed
    const { ethereum } = window;
    if (ethereum) {
      // Set the initial provider when the component mounts
      const initialProvider = new ethers.providers.Web3Provider(
        window.ethereum
      );
      const providerData = {
        network: initialProvider._network, // Example: You can extract necessary properties
      };

      dispatch(setProvider(providerData));

      // Subscribe to account changes
      ethereum.on("accountsChanged", handleAccountsChanged);

      return () => {
        // Cleanup the subscription when the component unmounts
        ethereum.removeListener("accountsChanged", handleAccountsChanged);
      };
    }
  }, [dispatch]); // Include dispatch in the dependency array

  const list = (anchor) => (
    <div
      className="bg-gray-900 h-full flex flex-col "
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      style={{ background: alt }}
    >
      {/* Close Button */}
      <div className="flex items-end justify-end cursor-pointer">
        {/* <img
          src={clear}
          alt="close_icon"
          className="w-8 h-8 cursor-pointer"
          onClick={toggleDrawer(anchor, false)}
        /> */}
        <CancelSharpIcon sx={{ color: dark, margin: "5px" }} />
      </div>

      {/* Menu Content */}
      <div className="w-[100vw] max-w-[300px]">
        {/* Logo */}
        <div className="flex justify-center items-center p-4">
          <div className="flex items-center cursor-pointer justify-center mr-20">
            <img src={Logo} alt="Logo" className="w-10 h-10 relative" />
            <span className="text-sm font-medium text-[#3840CD] absolute top-[68px] left-[125px]">
              BULL RUN
            </span>
          </div>
        </div>

        <div className="border-t border-gray-600 my-4"></div>

        {/* Token List: USDT, ETH, XBR */}
        <ul className="flex flex-col cursor-pointer items-center space-y-12 p-4">
          <li className="flex gap-2 items-center text-sm text-gray-500">
            <img src={USDT} className="w-4 h-4" />
            <span style={{ color: dark }}>USDT:</span>
            <span className="text-blue-500">0.0000</span>
          </li>
          <li className="flex gap-2 items-center text-sm text-gray-500">
            <img src={Etherum} className="w-4 h-4" />
            <span style={{ color: dark }}>ETH:</span>
            <span className="text-blue-500">0.0000</span>
          </li>
          <li className="flex gap-2 items-center text-sm text-gray-500">
            <img src={XRP} className="w-4 h-4" />
            <span style={{ color: dark }}>XBR:</span>
            <span className="text-blue-500">0.0000</span>
          </li>
        </ul>

        {/* Divider Line */}
        <div className="border-t border-gray-600 my-4"></div>

        {/* Additional Options: Whitelist, Portfolio, Notifications */}
        <div className="flex flex-col cursor-pointer items-center justify-center space-y-12 p-4">
          {/* Whitelist */}
          <div className="flex items-center space-x-2 cursor-pointer transform transition-transform hover:scale-110">
            <img src={Favorite} alt="Favorite Icon" className="w-4 h-4" />
            <p className="text-sm text-[#202020]" style={{ color: dark }}>
              Whitelist
            </p>
          </div>

          {/* Portfolio */}
          <div className="flex items-center space-x-2">
            <img src={pie} alt="Pie Icon" className="w-4 h-4" />
            <p className="text-sm" style={{ color: dark }}>
              Portfolio
            </p>
          </div>

          {/* Notifications */}
          <div className="flex items-center space-x-2">
            <div className="relative">
              <img
                src={hasNotifications ? Notification_bold : Notification}
                alt="Notification Icon"
                className="w-6 h-6"
              />
              {hasNotifications && (
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              )}
            </div>
            <p className="text-sm" style={{ color: dark }}>
              Notification
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <header
        className="border-b sticky top-0 z-50"
        style={{ backgroundColor: alt }}
      >
        <div className="flex justify-between m-auto items-center p-3 ">
          {isMobile ? (
            <div className="flex items-center">
              <div className="flex flex-col items-center cursor-pointer relative">
                <img src={Logo} alt="" className="w-10 h-10 relative" />
                <div className="flex items-center absolute top-[23px] left-[33px]">
                  <span className="text-[10px] font-medium text-[#3840CD]">
                    BULL
                  </span>
                  <span className="text-[10px] font-medium text-[#3840CD]">
                    RUN
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center">
              <Link to="/">
                <div className="flex flex-col items-center relative">
                  <img src={Logo} alt="" className="w-10 h-10 relative" />
                  <div className="flex items-center absolute top-[24px] left-[35px]">
                    <span className="text-[10px] font-medium text-[#3840CD]">
                      BULL
                    </span>
                    <span className="text-[10px] font-medium text-[#3840CD]">
                      RUN
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          )}

          <div
            className={`flex items-center space-x-2 ${
              isMobile ? "justify-end" : ""
            }`}
          >
            {!isMobile && (
              <ul className="flex items-center space-x-4 mr-2">
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
                  <p className="text-sm text-white" style={{ color: dark }}>
                    Whitelist
                  </p>
                </div>
                <div className="flex items-center space-x-2 hover:scale-110 cursor-pointer">
                  <img src={pie} alt="Pie Icon" className="w-4 h-4" />
                  <p className="text-sm text-white" style={{ color: dark }}>
                    Portfolio
                  </p>
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
              className={`flex items-center space-x-2 ${
                isMobile ? "justify-end" : ""
              }`}
            >
              {!isMobile && (
                <div
                  className="flex ml-2 items-center justify-center gap-[4px] cursor-pointer"
                  style={{
                    backgroundColor: isHovered ? "#5763F3" : "transparent",
                    padding: "7px", // Adjusted padding
                    borderRadius: "10px",
                    border: "1px solid #1890ff", // Set border color directly to #1890ff
                    width: isMobile ? "40px" : "45px", // Adjusted width
                    transition: "background-color 0.3s", // Smooth transition for background color change
                  }}
                  onMouseEnter={() => setIsHovered(true)} // Set isHovered to true on mouse enter
                  onMouseLeave={() => setIsHovered(false)} // Set isHovered to false on mouse leave
                >
                  App
                </div>
              )}

              {!isMobile && (
                <div
                  className="dropdown-style text-white text-center cursor-pointer"
                  style={{
                    backgroundColor: "#5763F3",
                    padding: "7px", // Adjusted padding
                    borderRadius: "10px",
                    border: "none",
                    width: isMobile ? "40px" : "70px", // Adjusted width
                    boxShadow: isDropdownOpen
                      ? "0px 4px 8px rgba(0, 0, 0, 0.1)"
                      : "none",
                  }}
                >
                  Node
                </div>
              )}

              {isMobile && (
                <div
                  className="flex ml-2 items-center justify-center gap-[4px] cursor-pointer"
                  style={{
                    backgroundColor: isHovered ? "#5763F3" : "transparent",
                    padding: "5px", // Adjusted padding
                    borderRadius: "10px",
                    border: "1px solid #1890ff", // Set border color directly to #1890ff
                    width: isMobile ? "40px" : "45px", // Adjusted width
                    transition: "background-color 0.3s", // Smooth transition for background color change
                  }}
                  onMouseEnter={() => setIsHovered(true)} // Set isHovered to true on mouse enter
                  onMouseLeave={() => setIsHovered(false)} // Set isHovered to false on mouse leave
                >
                  App
                </div>
              )}

              {isMobile && (
                <div
                  className="dropdown-style text-white text-center cursor-pointer"
                  style={{
                    backgroundColor: "#5763F3",
                    padding: "6px",
                    borderRadius: "10px",
                    border: "none",
                    width: "45px", // Adjusted width for mobile
                    boxShadow: isDropdownOpen
                      ? "0px 4px 8px rgba(0, 0, 0, 0.1)"
                      : "none",
                  }}
                >
                  Node
                </div>
              )}

              {/* Dropdown 1 */}
              <div
                ref={dropdownRef}
                style={{ backgroundColor: alt }}
                className={`relative ${
                  isMobile ? "hidden" : "block md:flex equal-width-dropdown"
                }`}
              >
                <div
                  className="flex items-center justify-between gap-[4px] cursor-pointer"
                  onClick={handleDropdownChange}
                  style={{
                    backgroundColor: "transparent",
                    padding: "6px",
                    borderRadius: "10px",
                    border: `1px solid ${
                      isDropdownOpen ? "#1890ff" : "#808080"
                    }`,
                    boxShadow: isDropdownOpen
                      ? "0px 4px 8px rgba(0, 0, 0, 0.1)"
                      : "none",
                  }}
                >
                  <div
                    style={{ color: dark }}
                    className="dropdown-style text-white cursor-pointer"
                  >
                    {selectedOption}
                  </div>
                  <KeyboardArrowDown
                    style={{
                      transform: `rotate(${arrowRotation}deg)`,
                      transition: "transform 0.3s ease",
                      color: isDropdownOpen ? "#1890ff" : "#808080",
                    }}
                  />
                </div>

                {isDropdownOpen && (
                  <div
                    className="absolute top-full left-0 z-10 border text-white border-gray-300 shadow-md max-h-36 overflow-y-auto mt-2 rounded-md"
                    style={{
                      width: `${dropdownContentWidth}px`,
                      backgroundColor: neutralLight,
                      color: dark,
                    }}
                  >
                    {selectedOption === "Pool Participants" ? (
                      <div
                        onClick={() => handleOptionClick("Pool Creator")}
                        style={{ color: dark }}
                        className="p-3 cursor-pointer transition-all "
                      >
                        Pool Creator
                      </div>
                    ) : (
                      <div
                        onClick={() => handleOptionClick("Pool Participants")}
                        className="p-3 cursor-pointer transition-all "
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
                style={{ backgroundColor: alt }}
                className={`relative ${
                  isMobile ? "hidden" : "block lg:flex equal-width-dropdown"
                }`}
              >
                <div
                  className="flex items-center justify-between gap-[4px] cursor-pointer"
                  onClick={handleDropdownChange2}
                  style={{
                    backgroundColor: "transparent",
                    padding: "6px",
                    borderRadius: "10px",
                    border: `1px solid ${
                      isDropdownOpen2 ? "#1890ff" : "#808080"
                    }`,
                    boxShadow: isDropdownOpen2
                      ? "0px 4px 8px rgba(0, 0, 0, 0.1)"
                      : "none",
                  }}
                >
                  <div
                    style={{ color: dark }}
                    className="dropdown-style text-white cursor-pointer"
                  >
                    {selectedOption2}
                  </div>
                  <KeyboardArrowDown
                    style={{
                      transform: `rotate(${arrowRotation2}deg)`,
                      transition: "transform 0.3s ease",
                      color: isDropdownOpen2 ? "#1890ff" : "#808080",
                    }}
                  />
                </div>

                {isDropdownOpen2 && (
                  <div
                    style={{ backgroundColor: alt }}
                    className="absolute top-full left-0 z-10 border text-white border-gray-300 shadow-md max-h-36 overflow-y-auto mt-2 rounded-md scrollbar-hide"
                  >
                    {options2.map((option, index) => (
                      <div
                        key={index}
                        style={{ color: dark, backgroundColor: neutralLight }}
                        onClick={() => handleOptionClick2(option)}
                        className="p-3 cursor-pointer transition-all "
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center">
                {/* Account Button */}
                {/* <div className="text-white">
                  <button
                    className={`border-none border-2 rounded-lg bg-blue-500 text-white ${
                      isMobile ? "rounded-full" : ""
                    }`}
                    onClick={openPopup}
                    style={{
                      padding: "6px",
                      width: "40px", // Adjusted width for mobile
                    }}
                  >
                    {account && (
                      <>
                        <span>{isMobile ? "M" : account.slice(0, 6)}</span>
                        {!isMobile && " ... "}
                        {!isMobile && <span>{account.slice(-6)}</span>}
                      </>
                    )}
                  </button>
                </div>
                 */}

                {isMobile && (
                  <button
                    className="flex md:w-0 w-[40px] items-center justify-center px-2 py-1.5 rounded-md transition duration-300 ease-in-out hover:bg-yellow-500 hover:text-white border-2 border-yellow-500
              md:border-[1px] md:border-[#D9893A] md:px-4 md:py-1.5 md:rounded-lg md:transition md:duration-300 md:ease-in-out"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
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
                  </button>
                )}

                {!isMobile && (
                  <button
                    className="flex items-center justify-center px-4 py-1 rounded-md transition duration-300 ease-in-out hover:bg-yellow-500 hover:text-white border-2 border-yellow-500
             md:border-2 md:border-[#D9893A] md:px-4 md:py-1.5 md:rounded-md md:transition md:duration-300 md:ease-in-out"
                  >
                    <span className="hidden md:inline">MetaMask</span>
                    {/* <span className="md:hidden">M</span> */}
                  </button>
                )}
                {/* Mode Switch and Hamburger Icon */}
                <div className="flex items-center">
                  <IconButton onClick={() => dispatch(setMode())}>
                    {theme.palette.mode === "dark" ? (
                      <LightMode sx={{ color: dark, fontSize: "25px" }} />
                    ) : (
                      <DarkMode sx={{ fontSize: "25px" }} />
                    )}
                  </IconButton>
                  {/* Hamburger Icon for Mobile */}
                  {isMobile && (
                    <MenuIcon
                      sx={{ cursor: "pointer" }}
                      onClick={toggleDrawer("right", true)}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* Disconnect Wallet Popup/Modal */}
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-black bg-opacity-50 absolute inset-0"></div>
          <div className="bg-white p-6 rounded-md z-10">
            <p className="text-lg mb-4">Disconnect your wallet?</p>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
              onClick={() => {
                handleDisconnect();
              }}
            >
              Disconnect
            </button>
            <button
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
              onClick={closePopup}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      <SwipeableDrawer
        anchor={"right"}
        open={drawerState["right"]}
        onClose={toggleDrawer("right", false)}
        onOpen={toggleDrawer("right", true)}
      >
        {list("right")}
      </SwipeableDrawer>
    </>
  );
};

export default Navbar;
