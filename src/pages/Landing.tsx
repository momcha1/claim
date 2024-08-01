import { useState, useEffect } from "react";
import LeaderBoardModal from "../modals/LeaderboardModal";
import iconbetLogo from "../assets/images/iconbetLogo.png";
export const Landing = () => {
  const [toClaim, setToClaim] = useState<number>(0);
  const [amountSponsored, setAmountSponsored] = useState<number>(0);
  const availableToken: number = 4600;
  const [error, setError] = useState<string>("");
  const [modalDetails, setModalDetails] = useState({
    show: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10) || 0;

    if (value > availableToken) {
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
    if (toClaim) {
      setAmountSponsored(availableToken - toClaim);
      console.log("claimed, sponsored", toClaim, availableToken - toClaim);
    }
  }, [toClaim, availableToken]);

  return (
    <>
      <h1 className="text-white text-2xl mx-32 font-bold">My Dashboard</h1>
      <div className="flex justify-end ">
        <button
          className="text-white text-xl rounded absolute right-32 top-32 p-2"
          onClick={() => {
            setModalDetails({
              show: true,
            });
          }}
        >
          View Leaderboard
        </button>
      </div>
      <div className="bg-custom-gradient rounded-lg mx-32 h-screen flex flex-row gap-10 justify-center mt-5 p-10 ">
        {/* amount of tokens available */}

        <div className="pt-16 px-10 bg-[#1EB6BF]  bg-opacity-[10%] rounded-lg w-[20%] h-64 ml-5 mt-5">
          <p className="text-center text-white font-medium">Available tokens</p>
          <div className="flex pt-5 flex-row items-center gap-5">
            <img src={iconbetLogo} className="w-16" alt="" />
            <p className="text-white text-3xl"> {availableToken}</p>
          </div>
        </div>
        {/* Claim div */}
        <div className="flex flex-row gap-5 px-16  pt-10 mt-5  bg-[#1EB6BF]  bg-opacity-[10%] rounded-lg w-[60%] h-[300px]">
          <div className="flex flex-col ">
            <p className="italic text-2xl text-white pb-5">
              Claim your tokens.
            </p>
            <input
              type="text"
              id="hash"
              name="hash"
              className="p-5 border h-12 w-64 rounded-lg bg-[#21214F] border-[#21214F] text-white"
              onChange={handleChange}
              value={toClaim > 0 ? toClaim : ""}
              placeholder="Enter no of tokens"
            />
            {error ? (
              <p className="text-red-300 text-sm">{error}</p>
            ) : (
              toClaim > 0 &&
              amountSponsored >= 0 && (
                <p className="text-gray-400">
                  {amountSponsored} will be sponsored.
                </p>
              )
            )}
          </div>
          <div className="pt-[50px] ">
            <button className="bg-[#1EB6BF] text-white text-xl pl-2  rounded-lg w-[200px] h-12 ">
              Claim token
            </button>
          </div>
        </div>
      </div>
      <LeaderBoardModal
        show={modalDetails.show}
        closeHandler={handleModalClose}
      />
    </>
  );
};

export default Landing;
