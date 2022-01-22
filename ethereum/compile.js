const path = require("path");
const fs = require("fs-extra");
const solc = require("solc");

const buildPath = path.resolve(__dirname, "build");
const campaignPath = path.resolve(__dirname, "contracts", "Campaign.sol");

fs.removeSync(buildPath);

const content = fs.readFileSync(campaignPath, "utf8");

const source = {
  language: "Solidity",
  sources: {
    "Campaign.sol": {
      content,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

const output = JSON.parse(solc.compile(JSON.stringify(source))).contracts[
  "Campaign.sol"
];

for (let contract in output) {
  fs.outputJsonSync(
    path.resolve(buildPath, contract + ".json"),
    output[contract]
  );
}
