import { useState, useEffect } from "react";
import LeaderBoardModal from "../modals/LeaderboardModal";
import { getBalanceInformation, claimDividend } from "../services/service";
import { eventHandler } from "../helpers/eventHandlers";
import { formatNumber } from "../helpers";

interface LandingProps {
  connectedAccount: string;
}

export const Landing: React.FC<LandingProps> = ({ connectedAccount }) => {
  const [toClaim, setToClaim] = useState<number>(0);
  const [amountSponsored, setAmountSponsored] = useState<number>(0);
  const [tap, setTap] = useState<number>(0);
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

  const handleClaimDivided = () => {
    if (!connectedAccount) {
      console.log("No connected account");
    } else {
      claimDividend(
        2,
        [
          "cxb66a3bb8fe7142996c2a74cad001d74f358cb22f",
          "cxb66a3bb8fe7142996c2a74cad001d74f358cb22f",
        ],
        tap * 1e18,

        dividend * 1e18,
        connectedAccount
      );
    }
  };

  useEffect(() => {
    const getInfo = async () => {
      const div = await getBalanceInformation(connectedAccount);
      setTap(Number(div.TAP) / 1e18);

      setdividend(Number(div.dividends) / 1e18);
      console.log(div, "fetched data");
    };
    getInfo();
  }, [connectedAccount]);

  useEffect(() => {
    if (toClaim) {
      setAmountSponsored(dividend - toClaim);
      console.log("claimed, sponsored", toClaim, dividend - toClaim);
    }
  }, [toClaim, dividend]);

  useEffect(() => {
    // Add event listener for json-rpc
    window.addEventListener(
      "ICONEX_RELAY_RESPONSE",
      eventHandler as EventListener
    );

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener(
        "ICONEX_RELAY_RESPONSE",
        eventHandler as EventListener
      );
    };
  }, []);

  return (
    <div className="lg:mx-64 sm:mx-10 sm:px-8 ">
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
      <p className="text-white"></p>
      <div className="bg-custom-gradient rounded-lg  h-[550px] flex flex-row gap-10 justify-center mt-5 pt-5 ">
        {/* amount of tokens available */}

        <div className="bg-black h-[255px] mt-5 ml-10 w-[400px] rounded-lg ">
          <div className="pl-5 pt-10">
            <p className="font-bold text-white text-2xl ">Dividends</p>
          </div>

          <div className="pl-5 pt-5">
            <p className="text-gray-400 text-l">
              TAP Tokens:{" "}
              <span className="text-xl text-[#1EB6BF] font-bold ">
                {formatNumber(tap)}{" "}
              </span>
              <span className=" text-[#1EB6BF] text-sm  font-bold ">TAP</span>
            </p>
          </div>

          <div className="pl-5 pt-5">
            <p className="text-gray-400 text-l">
              Available Dividends :
              <span className="text-[#1EB6BF] text-xl font-bold">
                {" "}
                ~{formatNumber(Number(dividend.toFixed(2)))}
              </span>
              <span className=" text-[#1EB6BF] font-bold text-sm "></span>
            </p>
          </div>
        </div>

        {/* Claim div */}
        <div className=" flex sm:flex-col   gap-5 sm:gap-0 px-10  pt-6 mt-5  bg-[#1EB6BF]  bg-opacity-[10%] rounded-lg w-[55%] h-64 mr-10">
          <div className="flex flex-col  text-white ">
            <p className="italic text-2xl text-white pb-5">Claim your tokens</p>
            <div className="flex flex-row gap-4">
              <div>
                <input
                  type="text"
                  id="hash"
                  name="hash"
                  className="p-5 border h-12 w-64 rounded-lg bg-[#21214F] border-[#21214F] text-white"
                  onChange={handleChange}
                  value={toClaim > 0 ? toClaim : ""}
                  placeholder="Amount to claim"
                />
              </div>

              <div className=" ">
                <button
                  className="bg-[#1EB6BF] text-white text-l  pl-2  rounded-lg w-[150px] h-12 "
                  onClick={() => {
                    handleClaimDivided();
                  }}
                >
                  Claim token
                </button>
              </div>
            </div>
            {error ? (
              <p className="text-red-300 text-sm">{error}</p>
            ) : (
              toClaim > 0 &&
              amountSponsored >= 0 && (
                <div className="absolute top-[430px] mt-2 w-64 bg-white font-bold text-black text-sm rounded-lg p-4">
                  <div className="absolute top-[-8px] left-[40px] transform -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-b-8 border-white-500"></div>
                  {`~${amountSponsored.toFixed(2)} will be sponsored`}
                </div>
              )
            )}
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
