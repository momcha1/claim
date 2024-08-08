import { Link } from "react-router-dom";
import { useState } from "react";
import icx from "../../assets/images/ICX.png";
import { tracker } from "../../constants";
import iconbetLogo from "../../assets/images/iconbetLogo.png";
import { WalletConnectModal } from "../../modals/walletConnect.component";

interface NavbarProps {
  connectedAccount: string;
  setConnectedAccount: React.Dispatch<React.SetStateAction<string>>;
}

const Navbar: React.FC<NavbarProps> = ({
  connectedAccount,
  setConnectedAccount,
}) => {
  const [openWalletDrop, setOpenWalletDrop] = useState(false);
  const [openWalletModal, setOpenWalletModal] = useState({
    show: false,
  });
  // const [selectedWalletType, setSelectedWalletType] = useState("");
  // const [isConnected, setIsConnected] = useState(false);
  // const [isConnecting, setIsConnecting] = useState(false);
  // const [icx, setIcx] = useState(null);

  const handleModalClose = () => {
    setOpenWalletModal({
      show: false,
    });
  };

  const handleWalletDisconnect = (type: string) => {
    if (type == "ICON") {
      setConnectedAccount("");
      try {
        localStorage.removeItem("connectedWallet");
      } catch (error) {
        console.error("Failed to remove wallet from localStorage:", error);
      }
    }
    if (type == "LEDGER") {
      setConnectedAccount("");
    }
    setOpenWalletDrop(false);
  };

  return (
    <div className="flex flex-row pt-8 justify-between items-center mx-32 mb-5 h-32 ">
      <div className="">
        <Link to="/">
          <img src={iconbetLogo} className="w-20 h-auto "></img>
        </Link>
      </div>

      <div>
        {connectedAccount ? (
          <div className="flex flex-row text-white gap-5 items-center pl-2">
            <div className="flex flex-row   items-center ">
              <button
                className=""
                type="button"
                onClick={() => setOpenWalletDrop((prevState) => !prevState)}
              >
                <p className=" text-white w-32 truncate ">
                  {connectedAccount.slice(0, 6) +
                    "...." +
                    connectedAccount.slice(
                      connectedAccount.length - 4,
                      connectedAccount.length - 1
                    )}
                </p>
              </button>
              <img src={icx} alt="" className="w-10 h-auto" />
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
        // setSelectedWalletType={setSelectedWalletType}
      />

      {openWalletDrop && (
        <div className="absolute top-[95px] right-[130px] rounded-lg bg-[#1eb6bf] w-[160px] h-fit  text-center  text-white p-2 text-sm">
          <div className="absolute top-[-8px] left-[20px] transform -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-b-8 border-[#1eb6bf]"></div>

          <div className=" border-black rounded p-1 hover:text-black hover:font-bold">
            <button
              onClick={() => {
                handleWalletDisconnect("ICON");
              }}
            >
              Disconnect
            </button>
          </div>

          <div className=" border-black rounded p-1 hover:text-black hover:font-bold">
            <a href={tracker + connectedAccount} target="_blank">
              View address{" "}
            </a>
          </div>
          <div className=" border-black rounded p-1 hover:text-black hover:font-bold">
            <button onClick={() => setOpenWalletModal({ show: true })}>
              Change Wallet
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
