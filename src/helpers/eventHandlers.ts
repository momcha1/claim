export class ICONEXResponse {
  static walletAddress: string;
  static TxnHash: number;
  static iconSigningResult: string;
  static hasAccount: boolean;

  static getWalletAddress() {
    return this.walletAddress;
  }

  static setWalletAddress(walletAddress: string) {
    this.walletAddress = walletAddress;
  }
  static getHasAccount() {
    return this.hasAccount;
  }

  static setHasAccount(hasAccount: boolean) {
    this.hasAccount = hasAccount;
  }

  static getIconSigningResult() {
    return this.iconSigningResult;
  }

  static setIconSigningResult(iconSigningResult: string) {
    this.iconSigningResult = iconSigningResult;
  }

  static getTxnHash() {
    return this.TxnHash;
  }

  static setTxnHash(txnHash: number) {
    this.TxnHash = txnHash;
  }
}
import { saveResultToLocalStorage } from "./localStorage";

export const eventHandler = (event: CustomEvent) => {
  const { type, payload } = event.detail;

  switch (type) {
    case "RESPONSE_ADDRESS":
      ICONEXResponse.setWalletAddress(payload);
      break;

    case "RESPONSE_HAS_ACCOUNT":
      ICONEXResponse.setHasAccount(payload.hasAccount);
      break;

    case "RESPONSE_SIGNING":
      ICONEXResponse.setIconSigningResult(payload);
      break;
    case "CANCEL_SIGNING":
      ICONEXResponse.setIconSigningResult("");
      break;

    case "RESPONSE_JSON-RPC":
      if (payload?.code) {
        console.log(`Transaction Failed : ${payload.message}`);
      }

      switch (payload.id) {
        case 123:
          ICONEXResponse.setTxnHash(payload.result);
          console.log(payload.result, "result");
          saveResultToLocalStorage(payload.result);
          break;
        default:
          break;
      }
      break;

    case "CANCEL_JSON-RPC":
      console.log("User cancelled");
      ICONEXResponse.setTxnHash(-1);
      return Error("Use cancelled the transaction");
      break;

    default:
      return;
  }
};
