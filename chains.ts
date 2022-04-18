import path from "path";
import fs from "fs/promises";
import { parse } from "csv-parse/sync";
import { ChainType } from "./types";
import * as lodash from "lodash";

const CHAIN_INFO_PATH = path.resolve(__dirname, "chains.csv");

export async function getChainID(chainName: string): Promise<number> {
  const records = await loadChainInfo();
  const getChain: ChainType = records.find(chain => chain.Chain == chainName);
  return getChain.ChainID;
}

export async function getAllBrowserPath(section: string): Promise<Record<string, string>> {
  const records = await loadChainInfo();
  return Object.fromEntries(
    records.map(({ Chain, BlockExplorerDomain, BlockExplorerBlock }) => {
      return section == "address" ?
        [Chain, `https://${BlockExplorerDomain}/address/`] :
        [Chain, `https://${BlockExplorerDomain}/${BlockExplorerBlock}/`]
    })
  );
}

async function loadChainInfo(): Promise<Array<ChainType>> {
  const data = await fs.readFile(CHAIN_INFO_PATH, "utf-8");
  const columns = ["Chain", "ChainID", "RPC", "BlockExplorerDomain", "BlockExplorerBlock"]
  const records = parse(data, { delimiter: ',', columns, from: 2 });
  return records;
}
