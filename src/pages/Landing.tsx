import { useState, useEffect } from "react";
import LeaderBoardModal from "../modals/LeaderboardModal";
import { getBalanceInformation, claimDividend } from "../services/service";
import { tracker } from "../constants";

interface LandingProps {
  connectedAccount: string;
}

export const Landing: React.FC<LandingProps> = ({ connectedAccount }) => {
  const [toClaim, setToClaim] = useState<number>(0);
  const [amountSponsored, setAmountSponsored] = useState<number>(0);
  const [tap, setTap] = useState<number>();
  const [dividend, setdividend] = useState<number>(0);

  const [error, setError] = useState<string>("");
  const [modalDetails, setModalDetails] = useState({
    show: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10) || 0;

    if (value > dividend) {
      setError("Can't claim more than available tokens");
    } else {
      setError("");
      setToClaim(value);
    }
  };

  const handleModalClose = () => {
    setModalDetails({
      show: false,
    });
  };

  useEffect(() => {
    const getInfo = async () => {
      const div = await getBalanceInformation(connectedAccount);
      setTap(Number(div.TAP));

      setdividend(Number(div.dividends));
      console.log(div, "fetched data");
    };
    getInfo();
  });

  useEffect(() => {
    if (toClaim) {
      setAmountSponsored(dividend - toClaim);
      console.log("claimed, sponsored", toClaim, dividend - toClaim);
    }
  }, [toClaim, dividend]);

  useEffect(() => {
    const handleIconexRelayRequest = (event: CustomEvent) => {
      // Handle the event, for example, display a message or update state
      console.log("Received ICONEX_RELAY_REQUEST event:", event.detail);
    };

    // Add event listener
    window.addEventListener(
      "ICONEX_RELAY_REQUEST",
      handleIconexRelayRequest as EventListener
    );

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener(
        "ICONEX_RELAY_REQUEST",
        handleIconexRelayRequest as EventListener
      );
    };
  }, []);

  return (
    <div className="mx-64">
      <div className="flex flex-row justify-between ">
        <h1 className="text-white text-2xl  font-bold">My Dashboard</h1>

        <button
          className="text-white text-xl rounded "
          onClick={() => {
            setModalDetails({
              show: true,
            });
          }}
        >
          View Leaderboard
        </button>
      </div>
      <p className="text-white">
        {connectedAccount ? (
          <div>
            Your connected wallet is{" "}
            <a href={tracker + connectedAccount} target="_blank">
              {connectedAccount}
            </a>
          </div>
        ) : (
          ""
        )}
      </p>
      <div className="bg-custom-gradient rounded-lg  h-[550px] flex flex-row gap-10 justify-center mt-5 pt-5 ">
        {/* amount of tokens available */}

        <div className="pt-16 px-10 bg-[#1EB6BF]  bg-opacity-[10%] rounded-lg w-[30%] h-64 ml-5 mt-5">
          <p className="text-center text-white font-medium">Available tokens</p>
          <div className="flex pt-5 flex-col  gap-5">
            <p className="text-white text-l">TAP Tokens: {tap / 1e18} TAP</p>
            <p className="text-white text-l">
              Available Dividends : ~{dividend / 1e18}
            </p>
          </div>
        </div>
        {/* Claim div */}
        <div className="flex flex-row gap-5 px-10  pt-10 mt-5  bg-[#1EB6BF]  bg-opacity-[10%] rounded-lg w-[60%] h-64 mr-5">
          <div className="flex flex-col text-white ">
            <p className="italic text-2xl text-white pb-5">Claim your tokens</p>
            <input
              type="text"
              id="hash"
              name="hash"
              className="p-5 border h-12 w-64 rounded-lg bg-[#21214F] border-[#21214F] text-white"
              onChange={handleChange}
              value={toClaim > 0 ? toClaim : ""}
              placeholder="Amount to claim"
            />
            {error ? (
              <p className="text-red-300 text-sm">{error}</p>
            ) : (
              toClaim > 0 &&
              amountSponsored >= 0 && (
                <div className="absolute top-[430px] mt-2 w-64 bg-white font-bold text-black text-sm rounded-lg p-4">
                  <div className="absolute top-[-8px] left-[40px] transform -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-b-8 border-white-500"></div>
                  {`${amountSponsored} will be sponsored`}
                </div>
              )
            )}
          </div>
          <div className="pt-[50px] ">
            <button
              className="bg-[#1EB6BF] text-white text-xl pl-2  rounded-lg w-[200px] h-12 "
              onClick={() => {
                claimDividend(
                  2,
                  [
                    "cxb66a3bb8fe7142996c2a74cad001d74f358cb22f",
                    "cxb66a3bb8fe7142996c2a74cad001d74f358cb22f",
                  ],
                  Number(tap),
                  Number(dividend)
                );
              }}
            >
              Claim token
            </button>
          </div>
        </div>
      </div>
      <LeaderBoardModal
        show={modalDetails.show}
        closeHandler={handleModalClose}
      />
    </div>
  );
};

export default Landing;
