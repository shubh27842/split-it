import React, { useEffect } from "react";
import { darkBtnMd, lightBtnMd } from "../utils/styles";
import { useNavigate } from "react-router";
import axios from "axios";
import { apiEndPoint } from "../utils/api.js";

export const OweDetail = ({ data = {} }) => {
  console.log("OweDetail", data);
  const { name, owe, owed, groupOwe } = data;
  return (
    <div className="bg-white p-2 rounded-lg shadow-md">
      <div className="flex p-2 pb-0 items-center">
        <div className="w-10 h-10 border-2 border-gray-400 rounded-full bg-gray-300"></div>
        <div className=" ml-2">
          <div className="mb-0">{name}</div>
          {owe - owed > 0 ? (
            <div className="text-sm text-green-500">
              Rs {(owe - owed).toFixed(2)}
            </div>
          ) : (
            <div className="text-sm text-orange-500">
              Rs {(owed - owe).toFixed(2)}
            </div>
          )}
          {/* <div className="text-sm">Rs {(owe - owed).toFixed(2)}</div> */}
        </div>
      </div>
      <ul className="list-disc list-inside pl-2">
        {Object.values(groupOwe || {}).map((group) => {
          if (group.owedAmount > 0) {
            return (
              <li key={group.groupId} className="text-xs text-gray-500 ">
                You owe {name}{" "}
                <span className="text-orange-500">Rs {group.owedAmount}</span>{" "}
                for
                <span className="font-medium"> {group.groupName}</span>
              </li>
            );
          }
          if (group.oweAmount > 0) {
            return (
              <li key={group.groupId} className="text-xs text-gray-500 ">
                {name} owes you{" "}
                <span className="text-green-500">Rs {group.oweAmount}</span> for
                <span className="font-medium"> {group.groupName}</span>
              </li>
            );
          }
          return null;
        })}
        {/* <li className="text-xs text-gray-500 ">
          You owe Prateek <span className="text-orange-500">Rs 600</span> for
          <span className="font-medium"> Jaipur trip</span>
        </li>
        <li className="text-xs text-gray-500 ">
          Prateek owes you<span className="text-green-500">Rs 400</span> for
          <span className="font-medium"> Udaipur trip</span>
        </li> */}
      </ul>
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = React.useState(null);
  const fetchDashboardData = async () => {
    // Fetch data from the server
    try {
      const response = await axios.get(`${apiEndPoint}/group/getDashboardData`);
      console.log(response);
      if (response.status === 200) {
        setData(response.data.data);
        console.log("Dashboard data:", response.data.data);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };
  useEffect(() => {
    fetchDashboardData();
  }, []);
  return (
    <div className="h-full">
      <div className="bg-gray-200 rounded-t-lg">
        <div className="flex justify-between p-2 sm:p-4 border-b-2 border-b-gray-400">
          <div className="text-xl">Dashboard</div>
          <div className="flex">
            <button
              className={darkBtnMd}
              onClick={() => navigate("/creategroup")}
            >
              Create Group
            </button>
            <button disabled={true} className={lightBtnMd}>Settle up</button>
          </div>
        </div>
        <div className="flex justify-around py-3">
          <div>
            <div className="font-medium">Total Balance</div>
            {data?.overallBalance > 0 ? (
              <div className="text-green-500 text-center">
                Rs {data?.overallBalance}
              </div>
            ) : (
              <div className="text-red-500 text-center">
                Rs {Math.abs(data?.overallBalance)}
              </div>
            )}
            {/* <div className="text-center">Rs {data?.overallBalance}</div> */}
          </div>
          <div>
            <div className="font-medium">You owe</div>
            <div className="text-red-500 text-center">Rs {data?.totalOwe}</div>
          </div>
          <div>
            <div className="font-medium">You are owed</div>
            <div className="text-green-500 text-center">
              Rs {data?.totalOwed}
            </div>
          </div>
        </div>
      </div>
      <div className=" bg-gray-200 mt-2 rounded-b-lg h-full flex gap-2 justify-between px-2 sm:px-10 py-2 sm:py-5 w-full">
        <div className="w-full ">
          {Object.keys(data?.friendWise || {}).length === 0 ? (
            <div className="text-center text-gray-400">
              No friends added yet. Start adding friends to your group.
            </div>
          ) : (
            <>
              <div className="text-lg">
                Friends whom you owe or they owe you.
              </div>
              <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-6">
                {Object.keys(data?.friendWise || {})?.map((friendId) => {
                  return (
                    <OweDetail
                      key={friendId}
                      data={data?.friendWise[friendId]}
                    />
                  );
                })}
              </div>
            </>
          )}
        </div>
        {/* <div className="w-full sm:w-[50%]">
          <div className="text-lg">You Owed</div>
          <div className="mt-2">
            <OweDetail />
            <OweDetail />
            <OweDetail />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
