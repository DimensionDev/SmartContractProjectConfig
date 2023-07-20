import { resolve } from "path";
import { ethers } from "ethers";
import { config as envConfig } from "dotenv";
import { NetworksUserConfig, ContractAddresses, VRF, HttpNetworkUserConfig } from "./types";

envConfig({ path: resolve(__dirname, "./.env") });

const privateKey = process.env.PRIVATE_KEY ?? `0x${"F".repeat(64)}`;
const alchemyId = process.env.ALCHEMY_PROJECT_ID ?? "F".repeat(32);
const etherscanKey = process.env.ETHERSCAN_KEY ?? "F".repeat(34);

export function getHardhatNetworkConfig(): NetworksUserConfig {
  const networks: NetworksUserConfig = require("./info/networks.json");
  for (const networkName of Object.keys(networks)) {
    if (Array.isArray(networks[networkName]?.accounts)) {
      networks[networkName]!.accounts = [privateKey];
    }
    if (networkName === "hardhat") continue;
    const chain = networks[networkName] as HttpNetworkUserConfig;
    chain.url = chain.url?.replace("<ALCHEMY-PROJECT-ID>", alchemyId);
    networks[networkName] = chain;
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

export const getContractAddress = (): Record<string, ContractAddresses> => require("./info/contractAddress.json");

export function getVrfConfig(): Record<string, VRF> {
  const vrfConfig: Record<string, VRF> = require("./info/chainlinkVRF.json");
  for (const chain of Object.keys(vrfConfig)) {
    vrfConfig[chain].Fee = ethers.utils.parseUnits(String(vrfConfig[chain].Fee), 18);
  }
  return vrfConfig;
}
