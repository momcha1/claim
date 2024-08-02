import hana from "../assets/images/hana.png";
import { useState } from "react";
interface WalletConnectModalProps {
  show: boolean;
  closeHandler: () => void;
}

export const WalletConnectModal: React.FC<WalletConnectModalProps> = ({
  show,
  closeHandler,
}) => {
  const [selectedWallet, setSelectedWallet] = useState<string>("");
  //
  if (!show) return null;

  const handleHanaLogin = () => {};

  const handleLedgerLogin = () => {};
  return (
    <div className="fixed inset-0 flex flex-col  items-center justify-center bg-black bg-opacity-80 ">
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
              <button className="" onClick={handleLedgerLogin}>
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
              className="btn text-white text-lg font-semibold pt-2 absolute top-[320px] right-[770px] "
            >
              X
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
