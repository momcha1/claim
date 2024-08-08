export { getHanaSnowAddress } from "./initializeApp";
// export { ICONEXResponse, eventHandler } from "./eventHandlers";
export { saveWalletToLocalStorage } from "./localStorage";

export const formatNumber = (value: number) => {
  return new Intl.NumberFormat("en-US").format(value);
};
