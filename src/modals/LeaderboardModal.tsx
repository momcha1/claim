import { useState, useEffect } from "react";
import { getSponsorsList } from "../services/service";
import { saveTableToLocalStorage } from "../helpers/localStorage";

interface LeaderBoardModalProps {
  show: boolean;
  closeHandler: () => void;
}

type LeaderData = {
  address: string;
  amount: number;
};

const LeaderBoardModal: React.FC<LeaderBoardModalProps> = ({
  show,
  closeHandler,
}) => {
  const limitPerPage: number = 10;
  const limit: number = 20;
  const [pageoffset, setpageoffset] = useState(0);
  const [localOffset, setlocalOffset] = useState(0);
  const [offset, setoffset] = useState(0);
  const [leader, setLeader] = useState<LeaderData[]>([]);
  const [twentyData, setTwentyData] = useState<LeaderData>();

  const currentPage = parseInt(`${pageoffset / limitPerPage}`) + 1;
  const newLeader: LeaderData[] = [
    { address: "0x1111111111111111111111111111111111111111", amount: 100 },
    { address: "0x0000000000000000000000000000000000000002", amount: 200 },
    { address: "0x0000000000000000000000000000000000000003", amount: 300 },
    { address: "0x0000000000000000000000000000000000000004", amount: 1400 },
    { address: "0x0000000000000000000000000000000000000005", amount: 500 },
    { address: "0x0000000000000000000000000000000000000006", amount: 600 },
    { address: "0x0000000000000000000000000000000000000007", amount: 700 },
    { address: "0x0000000000000000000000000000000000000008", amount: 800 },
    { address: "0x0000000000000000000000000000000000000009", amount: 900 },
    { address: "0x0000000000000000000000000000000000000010", amount: 1000 },
    { address: "0x0000000000000000000000000000000000000011", amount: 1100 },
    { address: "0x0000000000000000000000000000000000000012", amount: 1200 },
    { address: "0x0000000000000000000000000000000000000013", amount: 1300 },
    { address: "0x0000000000000000000000000000000000000014", amount: 1400 },
    { address: "0x0000000000000000000000000000000000000015", amount: 1500 },
    { address: "0x0000000000000000000000000000000000000016", amount: 1600 },
    { address: "0x0000000000000000000000000000000000000017", amount: 1700 },
    { address: "0x0000000000000000000000000000000000000018", amount: 1800 },
    { address: "0x0000000000000000000000000000000000000019", amount: 1900 },
    { address: "0x0000000000000000000000000000000000000020", amount: 2000 },
  ];
  const getPortionOfSponsors = async (offset: number) => {
    try {
      const list = await getSponsorsList(limit, offset);
      //save to localstorage
      saveTableToLocalStorage(list);
      console.log(list);
    } catch (e) {
      console.log(e);
    }
  };

  const handlePagination = (limit: number) => {
    console.log(pageoffset, limit, currentPage);
    const temp = pageoffset + limit;
    if (temp >= 0) {
      setpageoffset(temp);
    }
    if (currentPage % 2 == 0) {
      setlocalOffset(currentPage / 2);
    }
    console.log(localOffset);
  };

  // to get 20 data to show
  // useEffect(() => {
  //   console.log("Current local storage offset", localOffset);
  //   const localdata: LeaderData = getTableFromLocalStorage(localOffset);
  //   setTwentyData(localdata);
  // }, [localOffset]);

  useEffect(() => {
    console.log("local offset", localOffset);
  }, [localOffset]);

  //to show only 10 data per page
  useEffect(() => {
    console.log(pageoffset, "changed pageoffset", limitPerPage);
    setLeader(newLeader.slice(pageoffset, pageoffset + limitPerPage));
    // setLeader(newLeader);
  }, [pageoffset]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex  items-center justify-center bg-black bg-opacity-70 ">
      <div className="relative w-[900px] h-[630px] bg-[#21214F]  text-white ">
        <h1 className="text-4xl text-[#1EB6BF] font-bold text-center py-5 ">
          LEADERBOARD
        </h1>
        <div className="h-[485px] overflow-y-auto scrollbar-hide">
          <table className="w-[90%] mx-auto">
            <thead className="">
              <tr className="  h-12   bg-[#1EB6BF] shadow-sm shadow-blue-300 mb-2 rounded-sm flex gap-5 pt-3">
                <th className="pl-8 text-left">S.N</th>
                <th className="text-left pl-5 w-[500px]">Address</th>
                <th className="pl-3 text-left "> Amount</th>
              </tr>
            </thead>
            <tbody>
              {leader.length > 0 ? (
                leader.map((item, key) => (
                  // 21214F
                  <tr
                    className={`bg-[#374485]  shadow-sm  mb-2 rounded-sm flex gap-5 ${
                      key % 2 === 0 ? "bg-[#2a2a72]" : "bg-[#2f2f5b]"
                    }`}
                    key={key}
                  >
                    <td className="pl-8 pt-3 ">{pageoffset + key + 1} </td>
                    <td className=" h-10 pt-3 w-[500px] pl-8  ">
                      {item.address}
                    </td>
                    <td className="pl-8 pt-3 h-10">{item.amount}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={2} className="text-center py-4">
                    No Data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex flex-row  gap-5 items-center justify-center pt-4">
          <button
            className="bg-gray-400 p-1 rounded text-white text-sm"
            onClick={() => handlePagination(-limitPerPage)}
          >
            Prev
          </button>
          <p>{currentPage}</p>
          <button
            className="bg-gray-400 p-1 text-sm rounded text-white "
            onClick={() => handlePagination(limitPerPage)}
          >
            Next
          </button>
        </div>
        <div className="text-center pb-6">
          <button
            onClick={closeHandler}
            className="btn text-white text-lg font-semibold pt-2 absolute right-4 top-5"
          >
            X
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeaderBoardModal;
