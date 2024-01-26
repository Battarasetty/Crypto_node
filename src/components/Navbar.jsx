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
} from "../assets/";
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
import { ethers } from "ethers";

const Navbar = () => {
  const [hasNotifications, setHasNotifications] = useState(true);
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
  const { account, provider, userBalance, mode } = useSelector(
    (state) => state.wallet
  );

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
        dispatch(setProvider(newProvider));
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
      dispatch(setProvider(initialProvider));

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
      className=""
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className="flex items-end justify-end cursor-pointer">
        <img
          src={clear}
          alt="cross_icon"
          className="w-8 h-8 cursor-pointer"
          onClick={toggleDrawer(anchor, false)}
        />{" "}
      </div>
      <div className="w-[100vw] max-w-[300px]">
        <div className="flex justify-center items-center p-4">
          <div className="flex items-center cursor-pointer justify-center mr-20">
            <img src={Logo} alt="" className="w-10 h-10 relative" />
            <span className="text-sm font-medium text-[#3840CD] absolute top-[68px] left-[125px]">
              BULL RUN
            </span>
          </div>
        </div>
        <ul className="flex flex-col cursor-pointer items-center space-y-12 p-4">
          {mockDataToken.map((item) => (
            <li
              key={item.id}
              className="flex gap-2 items-center text-sm text-gray-500"
            >
              <span>{item.token}:</span>
              <span className="text-blue-500">{item.value.toFixed(4)}</span>
            </li>
          ))}
        </ul>
        <div className="flex flex-col cursor-pointer items-center space-y-12 p-4 mt-5">
          <div
            className="flex items-center space-x-2 cursor-pointer transform transition-transform hover:scale-110"
            // onClick={handleWhitelistClick}
          >
            <img src={Favorite} alt="Favorite Icon" className="w-4 h-4" />
            <p className="text-sm text-[#202020]">Whitelist</p>
          </div>
          <div className="flex items-center space-x-2">
            <img src={pie} alt="Pie Icon" className="w-4 h-4" />
            <p className="text-sm">Portfolio</p>
          </div>
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
        </div>
      </div>
    </div>
  );

  return (
    <>
      <header className="border-b" style={{ backgroundColor: alt }}>
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
                <div className="flex flex-col items-center relative">
                  <img src={Logo} alt="" className="w-12 h-12 relative" />
                  <div className="flex items-center absolute top-[27px] left-[38px]">
                    <span className="text-sm font-medium text-[#3840CD]">
                      BULL
                    </span>
                    <span className="text-sm font-medium text-[#3840CD]">
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
                  //  onClick={handleDropdownChange}
                  style={{
                    backgroundColor: "transparent",
                    padding: "6px",
                    borderRadius: "10px",
                    border: `2px solid ${
                      isDropdownOpen ? "#1890ff" : "#808080"
                    }`,
                    width: isMobile ? "20px" : "50px",
                    boxShadow: isDropdownOpen
                      ? "0px 4px 8px rgba(0, 0, 0, 0.1)"
                      : "none",
                  }}
                >
                  App
                </div>
              )}

              {!isMobile && (
                <div
                  className="dropdown-style text-white text-center cursor-pointer"
                  style={{
                    backgroundColor: "#5763F3",
                    padding: "7px",
                    borderRadius: "10px",
                    border: "none",
                    width: isMobile ? "40px" : "70px",
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
                  className="dropdown-style text-white text-center cursor-pointer"
                  style={{
                    backgroundColor: "#5763F3",
                    padding: "6px",
                    borderRadius: "10px",
                    border: "none",
                    width: "40px", // Adjusted width for mobile
                    boxShadow: isDropdownOpen
                      ? "0px 4px 8px rgba(0, 0, 0, 0.1)"
                      : "none",
                  }}
                >
                  N
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
                    border: `2px solid ${
                      isDropdownOpen ? "#1890ff" : "#808080"
                    }`,
                    width: "170px",
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
                  <div className="absolute w-[170px] top-full left-0 z-10 border text-white border-gray-300 shadow-md max-h-36 overflow-y-auto mt-2 rounded-md">
                    {selectedOption === "Pool Participants" ? (
                      <div
                        onClick={() => handleOptionClick("Pool Creator")}
                        style={{ color: dark }}
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
                    border: `2px solid ${
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
                    className="absolute w-[170px] top-full left-0 z-10 border text-white border-gray-300 shadow-md max-h-36 overflow-y-auto mt-2 rounded-md scrollbar-hide"
                  >
                    {options2.map((option, index) => (
                      <div
                        key={index}
                        style={{ color: dark }}
                        onClick={() => handleOptionClick2(option)}
                        className="p-3 cursor-pointer transition-all hover:bg-gray-100"
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center">
                {/* Account Button */}
                <div className="text-white">
                  <button
                    className={`p-1.5 border-none border-2 rounded-lg bg-blue-500 text-white ${
                      isMobile ? "rounded-full" : ""
                    }`}
                    onClick={openPopup}
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
                    <img
                      src={hamburger}
                      alt="hamburger_menu"
                      className="w-8 h-8 cursor-pointer"
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
