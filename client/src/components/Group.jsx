import React from "react";
import { darkBtnMd } from "../utils/styles";
import GroupOverview from "./GroupOverview";

const Groups = () => {
  return (
    <div>
      <div className="bg-gray-200 p-2 sm:p-4 rounded-t-lg mb-2">
        <div className="flex justify-between">
          <div className="text-2xl">Groups</div>
          <button className={darkBtnMd}>Create Group</button>
        </div>
        <div className="text-sm  mt-2">Overall, you owe Rs 1000</div>
      </div>
      <div className="border-2 border-gray-400 rounded-b-lg p-2 sm:p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
        <GroupOverview />
        <GroupOverview />
        <GroupOverview />
        <GroupOverview />
        <GroupOverview />
        <GroupOverview />
        <GroupOverview />
        <GroupOverview />
      </div>
    </div>
  );
};

export default Groups;
