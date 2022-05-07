import { BigNumber } from "ethers";

export interface NetworksUserConfig {
  hardhat?: HardhatNetworkUserConfig;

  [networkName: string]:
    | HardhatNetworkUserConfig
    | HttpNetworkUserConfig
    | undefined;
}

//#region Hardhat network config
export interface HardhatNetworkUserConfig {
  chainId?: number;
  from?: string;
  gas?: "auto" | number;
  gasPrice?: "auto" | number;
  gasMultiplier?: number;
  initialBaseFeePerGas?: number;
  hardfork?: string;
  mining?: HardhatNetworkMiningUserConfig;
  accounts?: HardhatNetworkAccountsUserConfig;
  blockGasLimit?: number;
  minGasPrice?: number | string;
  throwOnTransactionFailures?: boolean;
  throwOnCallFailures?: boolean;
  allowUnlimitedContractSize?: boolean;
  initialDate?: string;
  loggingEnabled?: boolean;
  forking?: HardhatNetworkForkingUserConfig;
  coinbase?: string;
}

//#region  hardhat mining config
interface HardhatNetworkMiningUserConfig {
  auto?: boolean;
  interval?: number | [number, number];
  mempool?: HardhatNetworkMempoolUserConfig;
}

interface HardhatNetworkMempoolUserConfig {
  order?: string;
}
//#endregion

interface HardhatNetworkForkingUserConfig {
  enabled?: boolean;
  url: string;
  blockNumber?: number;
}

//#region  hardhat network normal accounts config
type HardhatNetworkAccountsUserConfig =
  | HardhatNetworkAccountUserConfig[]
  | HardhatNetworkHDAccountsUserConfig;

interface HardhatNetworkAccountUserConfig {
  privateKey: string;
  balance: string;
}
//#endregion

interface HardhatNetworkHDAccountsUserConfig {
  mnemonic?: string;
  initialIndex?: number;
  count?: number;
  path?: string;
  accountsBalance?: string;
  passphrase?: string;
}
//#endregion

//#region  Http chain network config
export interface HttpNetworkUserConfig {
  chainId?: number;
  from?: string;
  gas?: "auto" | number;
  gasPrice?: "auto" | number;
  gasMultiplier?: number;
  url?: string;
  timeout?: number;
  httpHeaders?: { [name: string]: string };
  accounts?: HttpNetworkAccountsUserConfig;
}

type HttpNetworkAccountsUserConfig = "remote" | string[] | HDAccountsUserConfig;

interface HDAccountsUserConfig {
  mnemonic: string;
  initialIndex?: number;
  count?: number;
  path?: string;
  passphrase?: string;
}
//#endregion

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
  Chain: string;
  ChainID: number;
  RPC: string;
  BlockExplorer: string;
  Stage: string;
};
