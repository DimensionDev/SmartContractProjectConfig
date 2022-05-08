import path from "path";
import fs from "fs/promises";
import { parse } from "csv-parse/sync";
import { ChainType } from "./types";
import { URL } from "url";
import { dropRight } from "lodash";

const CHAIN_INFO_PATH = path.resolve(__dirname, "chains.csv");

export async function getChainID(chainName: string): Promise<number> {
  const records = await loadChainInfo();
  const getChain = records.find(chain => chain.Chain === chainName);
  if (!getChain) throw "No such chain";
  return getChain.ChainID;
}

export async function getAllBrowserPath(section: string): Promise<Record<string, string>> {
  const records = await loadChainInfo();
  return Object.fromEntries(
    records.map(({ Chain, BlockExplorer}) => {
      const url = new URL(`https://${BlockExplorer}`);
      if (section === "address"){
        /**
         *  For exceptional example who uses Blockscout for block info inspection:
         *  their chain name will be included in pathname rather than hostname
         */
        if(url.hostname === "blockscout.com"){
          const pathnameArray = url.pathname.split("/");
          const newPathname = Array.from(dropRight(pathnameArray, 2)).join("/");
          url.pathname = `${newPathname}/address/`;
        } else {
          url.pathname = "/address/"
        }
      }
      return [Chain, url.toString()];
    })
  );
}

async function loadChainInfo(): Promise<ChainType[]> {
  const data = await fs.readFile(CHAIN_INFO_PATH, "utf-8");
  const columns = ["Chain", "ChainID", "RPC", "BlockExplorer", "Stage"]
  return parse(data, { delimiter: ',', columns, from: 2, skip_empty_lines: true });
}
