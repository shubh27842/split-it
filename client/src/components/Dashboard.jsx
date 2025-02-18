import React from "react";
import { darkBtnMd, lightBtnMd } from "../utils/styles";

export const OweDetail = () => {
  return (
    <div className="w-fit">
      <div className="flex p-2 pb-0 items-center">
        <div className="w-10 h-10 border-2 rounded-full bg-gray-300"></div>
        <div className=" ml-2">
          <div className="mb-0">Prateek Ghule</div>
          <div className="text-sm">Rs 1000</div>
        </div>
      </div>
      <ul className="list-disc list-inside pl-2">
        <li className="text-xs text-gray-500 ">
          You owe Prateek <span className="text-orange-500">Rs 600</span> for
          <span className="font-medium"> Jaipur trip</span>
        </li>
        <li className="text-xs text-gray-500 ">
          Prateek owes you<span className="text-green-500">Rs 400</span> for
          <span className="font-medium"> Udaipur trip</span>
        </li>
      </ul>
    </div>
  );
};

const Dashboard = () => {
  return (
    <div className="h-full">
      <div className="bg-gray-200 rounded-t-lg">
        <div className="flex justify-between p-2 sm:p-4 border-b-2 border-b-gray-400">
          <div className="text-xl">Dashboard</div>
          <div className="flex">
            <button className={darkBtnMd}>Create Group</button>
            <button className={lightBtnMd}>Settle up</button>
          </div>
        </div>
        <div className="flex justify-around py-3">
          <div>
            <div className="font-medium">Total Balance</div>
            <div className="text-center">+ Rs 2000</div>
          </div>
          <div>
            <div className="font-medium">You owe</div>
            <div className="text-red-500 text-center">Rs 100</div>
          </div>
          <div>
            <div className="font-medium">You are owed</div>
            <div className="text-green-500 text-center">Rs 1900</div>
          </div>
        </div>
      </div>
      <div className="border-2 border-gray-400 mt-2 rounded-b-lg h-full flex flex-col sm:flex-row gap-2 justify-between px-2 sm:px-10 py-2 sm:py-5 w-full mb-12">
        <div className="w-full sm:w-[50%]">
          <div className="text-lg">You Owe</div>
          <div className="mt-2">
            <OweDetail />
          </div>
        </div>
        <div className="w-full sm:w-[50%]">
          <div className="text-lg">You Owed</div>
          <div className="mt-2">
            <OweDetail />
            <OweDetail />
            <OweDetail />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
