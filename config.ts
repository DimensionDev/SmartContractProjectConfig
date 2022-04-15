import { resolve } from "path";
import { ethers } from "ethers";
import { config as envConfig } from "dotenv";
import { Network, ContractAddresses, VRF } from "./types";

envConfig({ path: resolve(__dirname, "./.env") });

const privateKey: string = process.env.PRIVATE_KEY ?? "0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF";
const infuraId: string = process.env.INFURA_PROJECT_ID ?? "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF";
const etherscanKey: string = process.env.ETHERSCAN_KEY ?? "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF";

export function getHardhatNetworkConfig(): Record<string, Network> {
  const networks: Record<string, Network> = require("./info/networks.json");
  for (const chain of Object.keys(networks)) {
    let url = networks[chain].url;
    url = url?.replace("<INFURA-PROJECT-ID>", infuraId);
    networks[chain].url = url;
    if (Array.isArray(networks[chain].accounts)) {
      networks[chain].accounts = [privateKey];
    }
  }
  return networks;
}

// #region Constant config
export const HardhatSolidityConfig = {
  version: "0.8.2",
  settings: {
    optimizer: {
      enabled: true,
      runs: 200,
    },
  },
};

export const HardhatOvmConfig = {
  solcVersion: "0.8.0",
};

export const HardhatGasReporterConfig = {
  currency: "USD",
  gasPrice: 21,
  enabled: true,
};

export const EtherscanConfig = {
  // Your API key for Etherscan
  // Obtain one at https://etherscan.io/
  apiKey: etherscanKey,
};
// #endregion

export function getContractAddress(): Record<string, ContractAddresses> {
  const contractAddress: Record<string, ContractAddresses> = require("./info/contractAddress.json");
  return contractAddress;
}

export function getVrfConfig(): Record<string, VRF> {
  const vrfConfig: Record<string, VRF> = require("./info/chainlinkVRF.json");
  for (const chain of Object.keys(vrfConfig)) {
    const fee = vrfConfig[chain].Fee as string;
    const fee_BigNumber = ethers.utils.parseUnits(fee, 18);
    vrfConfig[chain].Fee = fee_BigNumber;
  }
  return vrfConfig;
}
