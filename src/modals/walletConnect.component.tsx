import hana from "../assets/images/hana.png";
import { useState } from "react";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import type { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";

// import Transport from "@ledgerhq/hw-transport-webhid";
// import AppIcx from "@ledgerhq/hw-app-icx";
import { ICONEXResponse, eventHandler } from "../helpers/eventHandlers";
import "react-toastify/dist/ReactToastify.css";
interface WalletConnectModalProps {
  show: boolean;
  closeHandler: () => void;
  connectedAccount: InjectedAccountWithMeta | undefined;
  setConnectedAccount: React.Dispatch<
    React.SetStateAction<InjectedAccountWithMeta[] | undefined>
  >;
  setSelectedWalletType: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
}
const BASE_PATH = `44'/4801368'/0'/0'`;

export const WalletConnectModal: React.FC<WalletConnectModalProps> = ({
  show,
  closeHandler,
  setConnectedAccount,
  connectedAccount,
  setSelectedWalletType,
}) => {
  // const [selectedWallet, setSelectedWallet] = useState<string>("");
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [webhidTransport, setWebhidTransport] = useState(null);
  const [icx, setIcx] = useState(null);
  const [currPage, setCurrPage] = useState(1);
  const [walletAddresses, setWalletAddresses] = useState([]);
  const [walletPaths, setWalletPaths] = useState([]);
  const addressPerPage = 4;
  const handleHanaLogin = async () => {
    setSelectedWalletType("ICON");
    console.log("Connecting to hana button");
    if (connectedAccount) {
      console.log("already connected");
      toast.info("Sign out from current wallet first", {
        theme: "dark",
      });
    } else {
      // const allAccounts = await getHanaSnowAddress();
      window.dispatchEvent(
        new CustomEvent("ICONEX_RELAY_REQUEST", {
          detail: {
            type: "REQUEST_ADDRESS",
          },
        })
      );
    }
  };

  const saveWalletToLocalStorage = (account: InjectedAccountWithMeta) => {
    try {
      localStorage.setItem("connectedWallet", JSON.stringify(account));
    } catch (error) {
      console.error("Failed to save wallet to localStorage:", error);
    }
  };

  useEffect(() => {
    function handleResponse(event: Event) {
      const { type, payload } = event.detail;

      if (type === "RESPONSE_ADDRESS") {
        setConnectedAccount(payload);
        ICONEXResponse.setWalletAddress(payload);
        saveWalletToLocalStorage(payload);

        toast.success("Wallet Connected", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          theme: "dark",
        });
      }
      closeHandler();
    }

    window.addEventListener("ICONEX_RELAY_RESPONSE", handleResponse);

    return () => {
      window.removeEventListener("ICONEX_RELAY_RESPONSE", handleResponse);
    };
  }, []);

  const loadAddresses = async (suppressError, icx) => {
    let i = 0;
    let counter;
    const addresses = [];
    const paths = [];
    while (i < addressPerPage) {
      suppressError = true;
      counter = (currPage - 1) * addressPerPage + i;
      console.log("counter = ", counter);
      const path = `${BASE_PATH}/${counter}'`;
      console.log("PATH= ", path);
      let { address } = await icx.getAddress(path, false, true);
      address = address.toString();
      console.log("a wallet ", address);
      addresses.push(address);
      paths.push(path);
      i++;
    }
    console.log("ADDRESSES FOR A PAGE: ", addresses);
    setWalletAddresses(addresses);
    setWalletPaths(paths);
  };

  // const handleLedgerLogin = () => {
  //   console.log("logging to ledger");
  //   const suppressError = false;
  //   setIsConnecting(true);
  //   Transport.create()
  //     .then(async (transport) => {
  //       transport.setDebugMode();
  //       const icx = new AppIcx(transport);
  //       setIcx(icx);
  //       console.log("Transportation channel established");
  //       try {
  //         setIsConnected(true);
  //         //test if its working first
  //         await icx.getAddress(`${BASE_PATH}/0'`, false, true);

  //         //our func here
  //         await loadAddresses(suppressError, icx);

  //         setIsConnecting(false);
  //       } catch (error) {
  //         if (suppressError) {
  //           console.warn(
  //             "Failed connecting to Ledger with suppress error",
  //             error
  //           );
  //           // NotificationManager.error(error.message instanceof string , "Connecting to Ledger Failed")
  //           toast.error("Connecting to Ledger failed");
  //           // props.onHide();
  //         } else {
  //           console.warn("Failed connecting to ledger", error);
  //           toast.error("Connecting to Ledger Failed", error);
  //           // NotificationManager.error("Connecting to Ledger Failed")
  //           // props.onHide();
  //         }
  //         setIsConnected(false);
  //         setIsConnecting(false);
  //       }
  //     })
  //     .catch((error) => {
  //       toast.error("Transport channel could not be established", error);
  //       setIsConnecting(false);
  //       setIsConnected(false);
  //       // props.onHide();
  //     });
  // };

  useEffect(() => {
    console.log(connectedAccount, "connected acc");
  }, [connectedAccount]);

  useEffect(() => {
    const fetchWalletFromLocalStorage = () => {
      try {
        const savedWallet = localStorage.getItem("connectedWallet");
        if (savedWallet) {
          const wallet = JSON.parse(savedWallet);
          setConnectedAccount(wallet);
          ICONEXResponse.setWalletAddress(connectedAccount);
        }
      } catch (error) {
        console.error("Failed to fetch wallet from localStorage:", error);
      }
    };

    fetchWalletFromLocalStorage();
  }, []);

  if (!show) return null;
  return (
    <div className="fixed inset-0 flex flex-col  items-center justify-center bg-black bg-opacity-80  ">
      <div className="border border-gray-700  pt-10 bg-[#1d2862] w-[400px] h-72 rounded-lg">
        <div className="flex flex-col items-center justify-center text-white gap-5 ">
          <div className="text-center text-2xl font-bold ">
            <h3>Sign in with:</h3>
          </div>
          <div className="flex flex-row gap-16">
            <div className="flex flex-col gap-2">
              <button onClick={handleHanaLogin}>
                <img src={hana} alt="" className="w-[70px] h-[80px]" />
              </button>{" "}
              <p className="text-center">Hana</p>
            </div>
            <div className="flex flex-col gap-2">
              <button
                className=""
                //  onClick={handleLedgerLogin}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 420 420"
                  role="logo"
                  aria-label="Ledger hardware wallet logo"
                  width="80"
                  height="80"
                >
                  <g fill="white">
                    <path d="M349.17 15.335h-183v245.6h245.6v-181.7c.1-34.5-28.1-63.9-62.6-63.9zm-239.2 0h-30.7c-34.5 0-64 28.1-64 64v30.7h94.7zm-94.7 152.2h94.7v94.7h-94.7zm301.9 245.6h30.7c34.5 0 64-28.1 64-64v-30.6h-94.7zm-151-94.6h94.7v94.7h-94.7zm-150.9 0v30.7c0 34.5 28.1 64 64 64h30.7v-94.7z"></path>
                  </g>
                </svg>
              </button>
              <p className="text-center">Ledger</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-center w-80">
              Use at your own risk. Project contributors are not liable for any
              lost or stolen funds.
            </p>
          </div>
          <div className="text-center pb-6">
            <button
              onClick={closeHandler}
              className="btn text-gray-400 text-lg font-semibold pt-2 absolute top-[220px] right-[580px] "
            >
              X
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
