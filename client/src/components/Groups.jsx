import React, { useContext, useEffect, useState } from "react";
import { darkBtnMd } from "../utils/styles";
import GroupOverview from "./GroupOverview";
import axios from "axios";
import { apiEndPoint } from "../utils/api";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router";

const Groups = () => {
  const { store } = useContext(AppContext);
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const [overallBalance, setOverallBalance] = useState(0);
  const fetchAllGroups = async () => {
    try {
      const res = await axios(
        `${apiEndPoint}/group/getGroupsByUser?userId=${store.user.id}`
      );
      setGroups(res.data.groups);
      const overallBal = res.data.groups.reduce((acc, group) => {
        acc = Number(group?.netBalance) + acc;
        return acc;
      }, 0);
      setOverallBalance(Number(overallBal).toFixed(2));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllGroups();
  }, []);
  return (
    <div>
      <div className="bg-gray-200 p-2 sm:p-4 rounded-t-lg mb-2">
        <div className="flex justify-between">
          <div className="text-2xl">Groups</div>
          <button
            className={darkBtnMd}
            onClick={() => navigate("/creategroup")}
          >
            Create Group
          </button>
        </div>
        <div className="text-sm  mt-2">
          Overall, you owe{" "}
          <span
            className={
              overallBalance > 0 ? "text-green-400" : "text-orange-600"
            }
          >
            Rs {overallBalance}
          </span>
        </div>
      </div>
      <div className="border-gray-400 rounded-b-lg p-2 sm:p-4  mb-12 bg-gray-200">
        {groups.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {groups.map((group) => {
              return (
                <GroupOverview
                  key={group._id}
                  group={group}
                  // onClick={() => navigate(`/group/${group._id}`)}
                  navigate={navigate}
                />
              );
            })}
          </div>
        ) : (
          <div className="text-center text-gray-400">
            No groups found. Create a new group to get started!
          </div>
        )}
      </div>
    </div>
  );
};

export default Groups;
