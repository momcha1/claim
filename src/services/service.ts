import { score, provider } from "../constants";

import IconService, {
  HttpProvider,
  CallBuilder,
  CallTransactionBuilder,
} from "icon-sdk-js";
export const { IconConverter } = IconService;

// const provider = new IconService.HttpProvider(
//   "https://lisbon.net.solidwallet.io/api/v3"
// );

const httpProvider = new HttpProvider(provider);
const iconService = new IconService(httpProvider);

export const getBalanceInformation = async (walletAddress: string) => {
  try {
    console.log("callign data from contract");
    console.log(walletAddress);

    const txObj = new CallBuilder()
      .to(score)
      .method("getBalanceInfo")
      .params({ address: "hx8086d7854684dd3bb0ffd4817da00f8fbc933a9b" })
      .build();
    console.log("Txobj", txObj);
    const response = await iconService.call(txObj).execute();
    console.log(response, "response from contract");
    return response;
  } catch (e) {
    console.log("Error in caling contract", e);
    return e;
  }
};

export const getSponsorsList = async (offset: number, limit: number) => {
  try {
    const txOBj = new CallBuilder()
      .to(score)
      .method("getSponsorsRecord")
      .params({ offset: offset, limit: limit })
      .build();

    //now call it
    const response = await iconService.call(txOBj).execute();
    console.log(response, "response");
    return response;
  } catch (e) {
    console.log("Error in calling contract", e);
    return e;
  }
};

export const claimDividend = async (
  index: number,
  proofHashes: string[],
  tapAmount: number,
  amount: number,
  walletAddress: string
) => {
  console.log("Claiming dividends");
  console.log(tapAmount, IconConverter.toHexNumber(tapAmount));

  try {
    // Prepare the transaction object
    const txObj = new CallTransactionBuilder()
      .method("claimDividends")
      .params({
        index: index,
        proofHashes: proofHashes,
        tapAmount: Number(IconConverter.toHex(tapAmount)),
        amount: amount, // ???
      })
      .to(score)
      .nid(2)
      .from(walletAddress)
      .version(IconConverter.toBigNumber("3"))
      .timestamp(new Date().getTime() * 1000)

      .build();

    //txobj
    console.log(txObj);
    // Prepare the transaction data
    const rawTransaction = IconConverter.toRawTransaction(txObj);
    console.log("raw tras", rawTransaction);

    //sign it
    // const signedTransaction = new SignedTransaction(rawTransaction);
    const scoreData: any = {};

    scoreData.value = JSON.stringify({
      jsonrpc: "2.0",
      method: "icx_sendTransaction",
      params: rawTransaction,
      id: 123,
    });

    //Converted to JS Object to dispatch to browser
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
    console.log("Transaction dispatched, awaiting for confirmation");
  } catch (e) {
    console.error("Error in claiming dividends:", e);
    throw e;
  }
};
