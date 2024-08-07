/// <reference types="vite/client" />
interface Window {
  // walletLinkExtension is injected by the Coinbase Wallet extension
  walletLinkExtension?: unknown;
  ethereum?: {
    on(arg0: string, arg1: EventListener, arg2: boolean): unknown;
    // set by the Coinbase Wallet mobile dapp browser
    isCoinbaseWallet?: true;
    // set by the MetaMask browser extension (also set by Brave browser when using built-in wallet)
    isMetaMask?: true;
    isLedgerConnect?: truse;
    autoRefreshOnNetworkChange?: boolean;
  };
  web3?: Record<string, unknown>;
}
