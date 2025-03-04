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
  const fetchAllGroups = async () => {
    try {
      const res = await axios(
        `${apiEndPoint}/group/getGroupsByUser?userId=${store.user.id}`
      );
      console.log("hhhhhhh");
      console.log("GROUPS", res.data);
      setGroups(res.data);
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
        <div className="text-sm  mt-2">Overall, you owe Rs 1000</div>
      </div>
      <div className="border-2 border-gray-400 rounded-b-lg p-2 sm:p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
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
        {/* <GroupOverview />
        <GroupOverview />
        <GroupOverview />
        <GroupOverview />
        <GroupOverview />
        <GroupOverview />
        <GroupOverview />
        <GroupOverview /> */}
      </div>
    </div>
  );
};

export default Groups;
