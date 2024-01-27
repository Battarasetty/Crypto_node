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
  console.log("this one is called")
  console.log(recipient);
  console.log(amount);
  console.log(provider);
  console.log(account);  // console.log(account)
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
  console.log(contract)
  // Get the signer from the provider
  const signer = provider.getSigner();
  console.log(signer)
  // Connect the contract to the signer
  const contractWithSigner = contract.connect(signer);
  console.log(contractWithSigner)
  // USDT has 6 decimal places, so we multiply the amount by 1e6 to get the actual amount
  const actualAmount = ethers.utils.parseUnits(amount.toString(), 6);
  console.log(actualAmount)
  // Call the transfer function
  const tx = await contractWithSigner.transfer(recipient, actualAmount);
  console.log(tx)
  // Wait for the transaction to be mined
  const receipt = await tx.wait();
  console.log("Transaction receipt", receipt);
};

export const transferUSDTWithReferral = async (recipient, amount, referralWalletAddress, provider, account) => {
  console.log("the 2nd is called")
  console.log(recipient, amount, referralWalletAddress, provider, account)
  // Validate the recipient's address
  if (!ethers.utils.isAddress(recipient) || !ethers.utils.isAddress(referralWalletAddress)) {
    alert("Please enter valid Ethereum addresses.");
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
  console.log(contract)
  // Get the signer from the provider
  const signer = provider.getSigner();
  console.log(signer)
  // Connect the contract to the signer
  const contractWithSigner = contract.connect(signer);
  console.log(contractWithSigner)

  // Calculate 80% of the amount for the recipient and 20% for the referral wallet
  const recipientAmount = ethers.utils.parseUnits((amount * 0.8).toString(), 6);
  console.log(recipientAmount)
  const referralWalletAmount = ethers.utils.parseUnits((amount * 0.2).toString(), 6);
  console.log(referralWalletAmount)
  try {
    const txRecipient = await contractWithSigner.transfer(recipient, recipientAmount);
    const receiptRecipient = await txRecipient.wait();
    console.log("Recipient transaction receipt", receiptRecipient);

    const txReferral = await contractWithSigner.transfer(referralWalletAddress, referralWalletAmount);
    const receiptReferral = await txReferral.wait();
    console.log("Referral transaction receipt", receiptReferral);

  } catch (error) {
    console.error("Error occurred while transferring USDT:", error);
  }
};