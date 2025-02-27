import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { apiEndPoint } from "../utils/api";
import { AppContext } from "../context/AppContext";
import CustomMultiSelect from "./CustomMultiSelect";
import { useNavigate } from "react-router";

const CreateGroup = () => {
  const { store } = useContext(AppContext);
  const navigate = useNavigate();
  const [groupName, setGroupName] = useState("");
  const [members, setMembers] = useState([]);
  const [allMembers, setAllMembers] = useState([]);
  const handleCreateGroup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${apiEndPoint}/group/createGroup`, {
        groupName,
        members: [...members, store.user.id],
        groupOwner: store.user.id,
      });
      console.log("RES", res);
      navigate("/group" + res.data.group._id);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchAllMembers = async () => {
    try {
      const res = await axios.get(`${apiEndPoint}/auth/getAllUser`);
      console.log("Res", res);
      setAllMembers(
        res.data.users
          .map((user) => ({ label: user.name, value: user._id }))
          .filter((user) => user.value !== store.user.id)
      );
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllMembers();
  }, []);

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
      <div className="flex mt-4">
        <label htmlFor="members" className="text-lg w-32 p-2 ">
          Members:
        </label>
        <CustomMultiSelect
          id="members"
          options={allMembers}
          selected={members}
          onChange={setMembers}
          className="flex-1"
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
