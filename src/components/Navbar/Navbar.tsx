import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import iconbetLogo from "../../assets/images/iconbetLogo.png";
import hana from "../../assets/images/hana.png";
import { WalletConnectModal } from "../../modals/walletConnect.component";
import { IconService, HttpProvider } from "icon-sdk-js";
import type { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";

const Navbar = () => {
  // const [isWalletConnected] = useState(false);
  const [balance, setBalance] = useState("");
  const [openWalletDrop, setOpenWalletDrop] = useState(false);
  const [openWalletModal, setOpenWalletModal] = useState({
    show: false,
  });
  const [selectedWalletType, setSelectedWalletType] = useState("");
  // const [isConnected, setIsConnected] = useState(false);
  // const [isConnecting, setIsConnecting] = useState(false);
  // const [icx, setIcx] = useState(null);
  const iconService = new IconService(
    new HttpProvider("https://ctz.solidwallet.io/api/v3")
  );

  const getIcxBalance = async (address: string): Promise<string> => {
    try {
      // Call the ICX getBalance method
      const balance = await iconService.getBalance(address).execute();

      return balance.toString(); // Return balance as a string
    } catch (error) {
      console.error("Failed to fetch ICX balance:", error);
      throw new Error("Error fetching ICX balance");
    }
  };

  useEffect(() => {
    if (connectedAccount) {
      getIcxBalance(connectedAccount?.toString())
        .then((data) => {
          console.log(`ICX Balance: ${data}`);
          setBalance(data);
        })
        .catch((error) => console.error(error));
    }
  });

  const handleModalClose = () => {
    setOpenWalletModal({
      show: false,
    });
  };
  const [connectedAccount, setConnectedAccount] =
    useState<InjectedAccountWithMeta[]>(null);

  const handleWalletDisconnect = (type: string) => {
    if (type == "ICON") {
      setConnectedAccount(undefined);
      try {
        localStorage.removeItem("connectedWallet");
      } catch (error) {
        console.error("Failed to remove wallet from localStorage:", error);
      }
    }
    if (type == "LEDGER") {
      setConnectedAccount(undefined);
    }
    setOpenWalletDrop(false);
  };

  return (
    <div className="flex flex-row py-8 justify-between items-center mx-32 mb-10 h-32 ">
      <div className="">
        <Link to="/">
          <img src={iconbetLogo} className="w-20 h-auto "></img>
        </Link>
      </div>

      <div>
        {connectedAccount ? (
          <div className="flex flex-row text-white gap-5 items-center pl-10">
            <div>
              <p className="">
                {balance} <span className="text-gray-500">ICX</span>
              </p>
            </div>
            <div className="flex flex-row gap-2 items-center ">
              <img src={hana} alt="" className="w-4 h-auto" />
              <button
                className=""
                type="button"
                onClick={() => setOpenWalletDrop((prevState) => !prevState)}
              >
                <p className="w-32 text-white truncate">
                  {connectedAccount?.toString()}
                </p>
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setOpenWalletModal({ show: true })}
            className="bg-[#1EB6BF] w-32 h-10 rounded text-white"
          >
            LOGIN
          </button>
        )}
      </div>
      <WalletConnectModal
        show={openWalletModal.show}
        closeHandler={handleModalClose}
        setConnectedAccount={setConnectedAccount}
        connectedAccount={connectedAccount}
        setSelectedWalletType={setSelectedWalletType}
      />

      {openWalletDrop && (
        <div className="absolute top-[85px] right-[130px] rounded-lg bg-[#68eddd] w-[130px] h-12 text-center pt-3 hover:text-red-500 text-gray-800  border border-white">
          <button
            onClick={() => {
              handleWalletDisconnect("ICON");
            }}
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
