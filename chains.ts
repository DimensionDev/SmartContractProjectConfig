import path from "path";
import fs from "fs/promises";
import { parse } from "csv-parse/sync";
import { ChainType } from "./types";

const CHAIN_INFO_PATH = path.resolve(__dirname, "Chains.csv");

export async function getChainID(chainName: string): Promise<number> {
  const chainInfo = await loadChainInfo();
  return chainInfo[chainName].ChainID;
}

export async function getAllBrowserPath(section: string): Promise<Record<string, string>> {
  const chainInfo = await loadChainInfo();
  let browserPath: Record<string, string> = {};
  for (const chainName of Object.keys(chainInfo)) {
    const domain = chainInfo[chainName].BlockExplorerDomain;
    let zone: string;
    if (section == "address") {
      zone = section;
    } else {
      zone = chainInfo[chainName].BlockExplorerBlock;
    }
    browserPath[chainName] = `https://${domain}/${zone}/`;
  }
  return browserPath;
}

async function loadChainInfo(): Promise<Record<string, ChainType>> {
  const data = await fs.readFile(CHAIN_INFO_PATH, "utf-8");
  const columns = ["Chain", "ChainID", "RPC", "BlockExplorerDomain", "BlockExplorerBlock"]
  const records = parse(data, { delimiter: ',', columns, from: 2 });
  let chainInfo: Record<string, ChainType> = {};
  for (const { Chain, ChainID, RPC, BlockExplorerDomain, BlockExplorerBlock } of records) {
    let chain = {
      ChainID,
      RPC,
      BlockExplorerDomain,
      BlockExplorerBlock,
    }
    chainInfo[Chain] = chain
  }
  return chainInfo;
}
