import { useEffect, useState } from "react";

const Leaderboard = () => {
  const [noOfEntries, setNoOfEntries] = useState(20);

  const [leader, setLeader] = useState([]);
  const newLeader = [
    { address: 1111111111111111, amount: 100 },
    { address: 2, amount: 200 },
    { address: 3, amount: 300 },
    { address: 4, amount: 1400 },
    { address: 5, amount: 500 },
    { address: 6, amount: 600 },
    { address: 7, amount: 700 },
    { address: 8, amount: 800 },
    { address: 9, amount: 900 },
    { address: 10, amount: 1000 },
    { address: 11, amount: 1100 },
    { address: 12, amount: 1200 },
    { address: 13, amount: 1300 },
    { address: 14, amount: 1400 },
    { address: 15, amount: 1500 },
    { address: 16, amount: 1600 },
    { address: 17, amount: 1700 },
    { address: 18, amount: 1800 },
    { address: 19, amount: 1900 },
    { address: 20, amount: 2000 },
    { address: 21, amount: 2100 },
    { address: 22, amount: 2200 },
    { address: 23, amount: 2300 },
    { address: 24, amount: 2400 },
    { address: 25, amount: 2500 },
    { address: 26, amount: 2600 },
    { address: 27, amount: 2700 },
    { address: 28, amount: 2800 },
    { address: 29, amount: 2900 },
    { address: 30, amount: 3000 },
    { address: 31, amount: 3100 },
    { address: 32, amount: 3200 },
    { address: 33, amount: 3300 },
    { address: 34, amount: 3400 },
    { address: 35, amount: 3500 },
    { address: 36, amount: 3600 },
    { address: 37, amount: 3700 },
    { address: 38, amount: 3800 },
    { address: 39, amount: 3900 },
    { address: 40, amount: 4000 },
    { address: 41, amount: 4100 },
    { address: 42, amount: 4200 },
    { address: 43, amount: 4300 },
    { address: 44, amount: 4400 },
    { address: 45, amount: 4500 },
    { address: 46, amount: 4600 },
    { address: 47, amount: 4700 },
    { address: 48, amount: 4800 },
    { address: 49, amount: 4900 },
    { address: 50, amount: 5000 },
  ];

  const changePage = (num) => {
    const end = Math.min(50, num + noOfEntries);
    console.log(num, end, "num and end");
    setLeader(newLeader.slice(num, num + noOfEntries));
    console.log("leader length after changing page", leader.length);
  };

  useEffect(() => {
    // const maxEntries = Math.min(noOfEntries, leader.length);
    setLeader(newLeader.slice(0, noOfEntries));
  }, [noOfEntries]);

  return (
    <>
      {/* <div className="">
        <p className="pb-4">Showing {noOfEntries} entries in a page</p>
      </div> */}
      <div className="h-[500px] overflow-y-auto">
        <table className="w-[600px] ">
          <thead>
            <tr className="bg-blue-500 text-white text-left h-[50px]">
              <th className="w-16 pl-4 border h-[50px] border-green-300">
                Address
              </th>
              <th className="pl-4 border h-[50px] border-green-300">
                Sponsor Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {leader.map((item, key) => (
              <tr className="border border-y-gray-200" key={key}>
                <td className="w-16 h-10 border border-y-gray-200 pl-4">
                  {item.address}
                </td>
                <td className="w-32 h-10 border border-y-gray-200 pl-4">
                  {item.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-row gap-5 absolute right-96">
        <button>Previous</button>
        <button
          onClick={() => {
            changePage(0);
          }}
        >
          1
        </button>
        <button
          onClick={() => {
            changePage(20);
          }}
        >
          2
        </button>
        <button
          onClick={() => {
            changePage(40);
          }}
        >
          3
        </button>
        <button>Next</button>
      </div>
    </>
  );
};

export default Leaderboard;
