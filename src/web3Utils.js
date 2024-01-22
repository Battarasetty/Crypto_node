// web3Utils.js
import { ethers } from "ethers";

export const USDT_ABI = [
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "_to", type: "address" },
      { name: "_value", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ name: "", type: "bool" }],
    type: "function",
  },
];

export const USDT_ADDRESS = "0x6230Be17697536128bc80302064F790524644D10";

export const transferUSDT = async (recipient, amount, provider, account) => {
  // console.log(recipient, amount);
  // Validate the recipient's address
  if (!ethers.utils.isAddress(recipient)) {
    alert("Please enter a valid Ethereum address.");
    return;
  }

  // Validate the amount
  if (isNaN(amount) || amount <= 0) {
    alert("Please enter a valid amount.");
    return;
  }
  if (!provider || account === "Not connected") {
    console.log("Wallet is not connected");
    return;
  }
  // Create a contract instance
  const contract = new ethers.Contract(USDT_ADDRESS, USDT_ABI, provider);
  // console.log(contract)
  // Get the signer from the provider
  const signer = provider.getSigner();
  // console.log(signer)
  // Connect the contract to the signer
  const contractWithSigner = contract.connect(signer);
  // console.log(contractWithSigner)
  // USDT has 6 decimal places, so we multiply the amount by 1e6 to get the actual amount
  const actualAmount = ethers.utils.parseUnits(amount.toString(), 6);
  console.log(actualAmount)
  // Call the transfer function
  const tx = await contractWithSigner.transfer(recipient, actualAmount);
  // console.log(tx)
  // Wait for the transaction to be mined
  const receipt = await tx.wait();
  console.log("Transaction receipt", receipt);
};
