import web3 from "./web3";

export const getAccountsList = async () => {
  return await web3.eth.getAccounts();
};
