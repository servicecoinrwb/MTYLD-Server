const { ethers } = require('ethers');

// CONSTANTS (Use Environment Variables in Vercel Dashboard)
const RPC_URL = process.env.RPC_URL; 
const TOKEN_ADDRESS = process.env.TOKEN_ADDRESS;

const CONTRACT_ABI = [
  "function pricePerToken() view returns (uint256)",
  "function decimals() view returns (uint8)"
];

// The main function Vercel runs
module.exports = async (req, res) => {
  try {
    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const contract = new ethers.Contract(TOKEN_ADDRESS, CONTRACT_ABI, provider);

    // Fetch Data
    const rawPrice = await contract.pricePerToken();
    const price = ethers.formatUnits(rawPrice, 18); // Adjust decimals if needed

    // Return JSON
    res.status(200).json({
      price: Number(price),
      timestamp: Date.now()
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch price" });
  }
};
