import web3 from "./web3";

const abi = [
  {
    inputs: [
      { internalType: "uint256", name: "minimum", type: "uint256" },
      { internalType: "address", name: "creator", type: "address" },
      { internalType: "string", name: "campDesc", type: "string" },
      { internalType: "uint256", name: "campGoal", type: "uint256" },
      { internalType: "string", name: "campName", type: "string" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [{ internalType: "uint256", name: "reqId", type: "uint256" }],
    name: "approveRequest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "backersCount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "campaignDescription",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "campaignGoal",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "campaignName",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "desc", type: "string" },
      { internalType: "uint256", name: "val", type: "uint256" },
      { internalType: "address", name: "rec", type: "address" },
    ],
    name: "createRequest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "reqId", type: "uint256" }],
    name: "finalizeRequest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getFullCampaign",
    outputs: [
      { internalType: "address", name: "mgr", type: "address" },
      { internalType: "uint256", name: "ttlSpent", type: "uint256" },
      { internalType: "uint256", name: "minContrib", type: "uint256" },
      { internalType: "uint256", name: "bckrsCnt", type: "uint256" },
      { internalType: "uint256", name: "rqstNmbr", type: "uint256" },
      { internalType: "string", name: "campDesc", type: "string" },
      { internalType: "string", name: "campName", type: "string" },
      { internalType: "uint256", name: "campGoal", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "reqId", type: "uint256" }],
    name: "getFullRequest",
    outputs: [
      { internalType: "string", name: "title", type: "string" },
      { internalType: "string", name: "desc", type: "string" },
      { internalType: "uint256", name: "value", type: "uint256" },
      {
        internalType: "uint256",
        name: "approvalsCount",
        type: "uint256",
      },
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "bool", name: "isClosed", type: "bool" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getShortCampaign",
    outputs: [
      { internalType: "string", name: "name", type: "string" },
      { internalType: "string", name: "desc", type: "string" },
      { internalType: "uint256", name: "goal", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "reqId", type: "uint256" }],
    name: "getShortRequest",
    outputs: [
      { internalType: "string", name: "title", type: "string" },
      { internalType: "string", name: "desc", type: "string" },
      { internalType: "uint256", name: "value", type: "uint256" },
      { internalType: "address", name: "recipient", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "reqId", type: "uint256" },
      { internalType: "address", name: "checkAddress", type: "address" },
    ],
    name: "isApprovedAlready",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "manager",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "minimumContribution",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "participate",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "requestNumber",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSpent",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
];

const campaign = (address) => {
  return new web3.eth.Contract(abi, address);
};

export default campaign;
