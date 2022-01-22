import web3 from "./web3";
const address = "0xC6DAfbc493d6A1edE57437f46021E448CDFB7e40";

const abi = [
  {
    inputs: [
      { internalType: "uint256", name: "minimum", type: "uint256" },
      { internalType: "string", name: "campDesc", type: "string" },
      { internalType: "uint256", name: "campGoal", type: "uint256" },
      { internalType: "string", name: "campName", type: "string" },
    ],
    name: "createCampaign",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "deployedCampaigns",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getDeployedCampaigns",
    outputs: [{ internalType: "address[]", name: "", type: "address[]" }],
    stateMutability: "view",
    type: "function",
  },
];

const factory = new web3.eth.Contract(abi, address);

export default factory;
