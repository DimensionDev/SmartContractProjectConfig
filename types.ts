import { BigNumber } from "ethers";

export interface Network {
  url?: string;
  chainId?: number;
  accounts?: string[] | string | HDWallet;
  ovm?: boolean;
  gasPrice?: number;
  blockGasLimit?: number;
  initialBaseFeePerGas?: number;
  hardfork?: string;
  gas?: string;
}

export interface HDWallet {
  mnemonic?: string;
  initialIndex?: number;
  path?: string; // default: "m/44'/60'/0'/0"
  count?: number; // default: 20
  // default: 10000 ETH
  //Only for hardhat network.
  accountsBalance?: number;
  passphrase?: string; //default: empty string
}

export interface VRF {
  VRFCoordinator: string;
  LinkAddress: string;
  KeyHash: string;
  Fee: string | BigNumber;
}

export interface ContractAddresses {
  MaskTokenAddress: string;
  UniswapRouterAddress?: string;
}

export type ChainType = {
  Chain: string,
  ChainID: number;
  RPC: string;
  BlockExplorer: string;
  Stage: string;
};
