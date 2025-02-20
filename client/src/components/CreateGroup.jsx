import axios from "axios";
import React, { useContext, useState } from "react";
import { apiEndPoint } from "../utils/api";
import { AppContext } from "../context/AppContext";
import CustomMultiSelect from "./CustomMultiSelect";

const CreateGroup = () => {
  const { store } = useContext(AppContext);
  const [groupName, setGroupName] = useState("");
  const handleCreateGroup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${apiEndPoint}/group/createGroup`, {
        groupName,
        members: [],
        groupOwner: store.user.id,
      });
      console.log("RES", res);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <form
      onSubmit={(e) => handleCreateGroup(e)}
      className="bg-gray-100 rounded-lg p-2 sm:p-8 border-gray-700 border-2"
    >
      <div className="flex mb-4">
        <label htmlFor="group-name" className="text-lg w-32 p-2">
          Group Name:
        </label>
        <input
          id="group-name"
          type="text"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          className="ml-4 focus-visible:outline-gray-400 outline-gray-400 outline-2 rounded-sm p-2 flex-1 bg-gray-50 "
        />
      </div>
      <div className="flex">
        <label htmlFor="group-name" className="text-lg w-32 p-2">
          Group Type:
        </label>
        <input
          id="group-name"
          type="text"
          className="ml-4 focus-visible:outline-gray-400 outline-gray-400 outline-2 rounded-sm p-2 flex-1 bg-gray-50 "
        />
      </div>
      <div>
        <label htmlFor="members" className="text-lg w-32 p-2">Members:</label>
        <CustomMultiSelect
            id="members"
        />
      </div>
      <div className="flex justify-center mt-8">
        <button
          type="submit"
          className="bg-gray-800 text-gray-100 px-4 py-2 rounded-md cursor-pointer hover:bg-gray-900"
        >
          Create Group
        </button>
      </div>
    </form>
  );
};

export default CreateGroup;
