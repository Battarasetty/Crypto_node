// import React from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   arrow_right,
//   Logo,
//   MetaMask,
//   trust_wallet,
//   wallet_connect,
//   other_wallet,
// } from "../assets";

// const WalletItem = ({ src, alt, text, onClick }) => (
//   <div
//     className="wallet-item flex items-center justify-between gap-2 w-full p-3 cursor-pointer transition duration-300 ease-in-out transform hover:bg-[#2B2E80] hover:shadow-md"
//     onClick={onClick}
//   >
//     <div className="flex items-center gap-5">
//       <img src={src} alt={alt} className="w-12 h-12" />
//       <span className="text-lg text-[#FFFFFF]">{text}</span>
//     </div>
//     <img src={arrow_right} alt="arrow" className="w-9 h-9 text-[#7724FB]" />
//   </div>
// );

// const ConnectWalletComponent = () => {



//   return (
//     <div className="h-screen flex flex-col items-center mt-2 mx-auto">
//       {/* Step 1 - Box with Box Shadow */}
//       <div className="w-[600px] bg-[#181640] p-6 flex flex-col items-center">
//         <div>
//           <img src={Logo} alt="Founder's Node" className="w-20" />
//         </div>
//         <div className="mt-4">
//           <h2 className="text-white text-3xl uppercase">
//             Connect with a wallet
//           </h2>
//         </div>
//       </div>

//       <h5 className="text-white mt-2 text-[10px]">Not Connect</h5>

//       {/* Step 2 and Remaining Steps */}
//       <div className="w-[350px] flex flex-col items-center mt-5">
//         <WalletItem
//           src={MetaMask}
//           alt="Metamask"
//           text="Metamask"
//           onClick={() => {
//             navigate("/home");
//           }}
//         />
//         <WalletItem src={trust_wallet} alt="Trust Wallet" text="Trust Wallet" />
//         <WalletItem
//           src={wallet_connect}
//           alt="Connect Wallet"
//           text="Connect Wallet"
//         />
//         <WalletItem src={other_wallet} alt="Other Wallet" text="Other Wallet" />
//       </div>

//       {/* Additional Section - BEFORE YOU START */}
//       <div className="w-[350px] mx-auto mt-5 text-center">
//         <h3 className="text-[#EE7AE6] text-[17px] font-semibold mb-2">
//           BEFORE YOU START
//         </h3>
//         <ol className="text-white text-[15px] text-left pl-4 list-decimal-none">
//           <li>1. Download Dapp Wallet app or extension</li>
//           <li>2. Switch to Ethereum Network</li>
//           <li>3. Transfer USDT to your Dapp wallet</li>
//           <li>4. Get an invitation code</li>
//         </ol>
//       </div>
//       <button
//         onClick={handleClick}
//         className="mx-auto mt-5 w-[450px] py-2 rounded-lg text-[20px] font-semibold focus:outline-none bg-gradient-to-r from-[#FE81F3] via-[#568EE1] to-[#8419FE] text-white hover:from-[#2B2E80] hover:via-[#2B2E80] hover:to-[#A970F3]"
//       >
//         BACK
//       </button>
//     </div>
//   );
// };

// export default ConnectWalletComponent;
