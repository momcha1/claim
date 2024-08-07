import { score, provider } from "../constants";

import IconService, {
  HttpProvider,
  CallBuilder,
  CallTransactionBuilder,
  SignedTransaction,
} from "icon-sdk-js";
export const { IconConverter } = IconService;

// const provider = new IconService.HttpProvider(
//   "https://lisbon.net.solidwallet.io/api/v3"
// );

const httpProvider = new HttpProvider(provider);
const iconService = new IconService(httpProvider);

export const getBalanceInformation = async (walletAddress: string) => {
  console.log(provider);
  try {
    console.log("callign data from contract");
    console.log(walletAddress, "wallet addres");
    const amount = await iconService.getBalance(walletAddress).execute();
    console.log(amount);
    const txObj = new CallBuilder()
      .to(score)
      .method("getBalanceInfo")
      .params({ address: "hx8086d7854684dd3bb0ffd4817da00f8fbc933a9b" })
      .build();
    console.log("Txobj", txObj);
    const response = await iconService.call(txObj).execute();
    console.log(response, "response from contract");
    return response;
    console.log("tx obj", txObj);
  } catch (e) {
    console.log("Error in caling contract", e);
  }
};

export const claimDividend = async (
  index: number,
  proofHashes: string[],
  tapAmount: number,
  amount: number
) => {
  console.log("Claiming dividends");

  try {
    // Prepare the transaction object
    const txObj = new CallTransactionBuilder()
      .method("claimDividends")
      .params({
        index: index,
        proofHashes: proofHashes,
        tapAmount: tapAmount,
        amount: amount,
      })
      .to(score)
      .build();

    // Prepare the transaction data for relaying
    const scoreData: any = {};
    scoreData.value = JSON.stringify({
      jsonrpc: "2.0",
      method: "icx_sendTransaction",
      params: IconConverter.toRawTransaction(txObj),
      id: 50889,
    });

    const parsed = JSON.parse(scoreData.value);
    console.log("Parsed transaction data:", parsed);

    // Dispatch event to relay transaction request
    window.dispatchEvent(
      new CustomEvent("ICONEX_RELAY_REQUEST", {
        detail: {
          type: "REQUEST_JSON-RPC",
          payload: parsed,
        },
      })
    );
  } catch (e) {
    console.error("Error in claiming dividends:", e);
    throw e;
  }
};
