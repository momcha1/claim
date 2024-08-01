import { useState, useEffect } from "react";

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
  const noOfEntries: number = 20;
  const [leader, setLeader] = useState<LeaderData[]>([]);
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
    { address: "0x0000000000000000000000000000000000000021", amount: 2100 },
    { address: "0x0000000000000000000000000000000000000022", amount: 2200 },
    { address: "0x0000000000000000000000000000000000000023", amount: 2300 },
    { address: "0x0000000000000000000000000000000000000024", amount: 2400 },
    { address: "0x0000000000000000000000000000000000000025", amount: 2500 },
    { address: "0x0000000000000000000000000000000000000026", amount: 2600 },
    { address: "0x0000000000000000000000000000000000000027", amount: 2700 },
    { address: "0x0000000000000000000000000000000000000028", amount: 2800 },
    { address: "0x0000000000000000000000000000000000000029", amount: 2900 },
    { address: "0x0000000000000000000000000000000000000030", amount: 3000 },
    { address: "0x0000000000000000000000000000000000000031", amount: 3100 },
    { address: "0x0000000000000000000000000000000000000032", amount: 3200 },
    { address: "0x0000000000000000000000000000000000000033", amount: 3300 },
    { address: "0x0000000000000000000000000000000000000034", amount: 3400 },
    { address: "0x0000000000000000000000000000000000000035", amount: 3500 },
    { address: "0x0000000000000000000000000000000000000036", amount: 3600 },
    { address: "0x0000000000000000000000000000000000000037", amount: 3700 },
    { address: "0x0000000000000000000000000000000000000038", amount: 3800 },
    { address: "0x0000000000000000000000000000000000000039", amount: 3900 },
    { address: "0x0000000000000000000000000000000000000040", amount: 4000 },
    { address: "0x0000000000000000000000000000000000000041", amount: 4100 },
    { address: "0x0000000000000000000000000000000000000042", amount: 4200 },
    { address: "0x0000000000000000000000000000000000000043", amount: 4300 },
    { address: "0x0000000000000000000000000000000000000044", amount: 4400 },
    { address: "0x0000000000000000000000000000000000000045", amount: 4500 },
    { address: "0x0000000000000000000000000000000000000046", amount: 4600 },
    { address: "0x0000000000000000000000000000000000000047", amount: 4700 },
    { address: "0x0000000000000000000000000000000000000048", amount: 4800 },
    { address: "0x0000000000000000000000000000000000000049", amount: 4900 },
    { address: "0x0000000000000000000000000000000000000050", amount: 5000 },
  ];

  const changePage = (num: number) => {
    const end = Math.min(50, num + noOfEntries);
    console.log(num, end, "num and end");
    setLeader(newLeader.slice(num, num + noOfEntries));
    console.log("leader length after changing page", leader.length);
  };

  useEffect(() => {
    const temp = newLeader.slice(0, 20);
    setLeader(temp);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex  items-center justify-center bg-black bg-opacity-70 ">
      <div className="relative w-[900px] h-[630px] bg-[#21214F]  text-white ">
        <h1 className="text-4xl text-[#1EB6BF] font-bold text-center py-5">
          LEADERBOARD
        </h1>
        <div className="h-[500px] overflow-y-auto scrollbar-hide">
          <table className="w-[90%] mx-auto">
            <thead className="">
              <tr className=" h-12 bg-[#374485] shadow-sm shadow-blue-300 mb-2 rounded-sm flex gap-5 pt-3">
                <th className="pl-8 text-left">S.N</th>
                <th className="text-left pl-5 w-[500px]">Address</th>
                <th className="pl-3 text-left "> Amount</th>
              </tr>
            </thead>
            <tbody>
              {leader.length > 0 ? (
                leader.map((item, key) => (
                  <tr
                    className="bg-[#374485] shadow-sm shadow-blue-300 mb-2 rounded-sm flex gap-5 "
                    key={key}
                  >
                    <td className="pl-8 pt-3 ">{key + 1} </td>
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
        <div className="  flex gap-4 text-gray-400 justify-center pt-2">
          <button onClick={() => changePage(0)} className="btn">
            1
          </button>
          <button onClick={() => changePage(noOfEntries)} className="btn">
            2
          </button>
          <button onClick={() => changePage(noOfEntries * 2)} className="btn">
            3
          </button>
          {/* <button className="btn">Next</button> */}
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
