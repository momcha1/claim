import { Link } from "react-router-dom";
import iconbetLogo from "../../assets/images/iconbetLogo.png";
import { useState } from "react";
import { WalletConnectModal } from "../../modals/walletConnect.component";

const Navbar = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [openWalletModal, setOpenWalletModal] = useState({
    show: false,
  });

  const handleModalClose = () => {
    setOpenWalletModal({
      show: false,
    });
  };
  return (
    <div className="flex flex-row py-8 justify-between items-center mx-64 h-32 ">
      <div className="">
        <Link to="/">
          <img src={iconbetLogo} className="w-20 h-auto "></img>
        </Link>
      </div>

      <div>
        {isWalletConnected ? (
          <div>Wallet connected</div>
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
      />
    </div>
  );
};

export default Navbar;
