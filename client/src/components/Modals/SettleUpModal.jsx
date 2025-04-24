import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import CustomModal from "./CustomModal";
import { useParams } from "react-router";
import { AppContext } from "../../context/AppContext";
import { apiEndPoint } from "../../utils/api";
import { testEnvironment } from "../../../jest.config";

const SettleUpModal = ({ isOpen, setIsOpen }) => {
  const { groupId } = useParams();
  const { store } = useContext(AppContext);
  const [data, setData] = useState([]);
  const [isSettleOpen, setIsSettleOpen] = useState(false);
  const [settleData, setSettleData] = useState({});

  const fetchOweDetailsByUser = async () => {
    try {
      const res = await axios(`${apiEndPoint}/group/getOweDetailsForUser`, {
        params: {
          memberId: store.user.id,
          groupId: groupId,
        },
      });
      console.log(res);
      setData(res.data.balance);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchOweDetailsByUser();
  }, []);

  const handleSettleUp = async () => {
    console.log("Settle Up", settleData);
    const { _id: fromUserId, amount } = settleData;
    const toUserId = store.user.id;
    if(amount > 0) {
        const res = await axios.post(
          `${apiEndPoint}/group/settleUp`,
          {
            fromUserId,
            toUserId,
            amount,
            groupId,
          }
        );
        console.log("Settle Up Response", res);
    }
  };
  return (
    <CustomModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <div className="p-2">
        <h2 className="text-xl font-semibold">Settle Payments</h2>
      </div>
      {!isSettleOpen ? (
        <div className="p-2">
          <div className="text-sm text-gray-600">
            You owe the following amounts to your friends:
          </div>
          <ul className="list-none mt-2">
            {data &&
              data?.oweDetails?.map((owe, index) => (
                <li
                  key={index}
                  className="text-sm text-gray-800 my-2 p-2 bg-gray-100 flex justify-between items-center rounded-sm"
                >
                  {owe.name}: Rs {Number(owe.amount).toFixed(2)}
                  <button
                    onClick={() => {
                      setIsSettleOpen(true);
                      setSettleData(owe);
                    }}
                    className="bg-gray-800 text-gray-50 p-1 px-2 rounded-sm cursor-pointer"
                  >
                    Settle Up
                  </button>
                </li>
              ))}
          </ul>
        </div>
      ) : (
        <>
          <div className="p-2">
            Rs
            <input
              onWheel={(e) => e.target.blur()}
              type="number"
              onChange={(e) => {
                console.log(e.target.value);
                setSettleData({
                  ...settleData,
                  amount: e.target.value,
                });
              }}
              value={settleData?.amount}
              className="border-2 rounded-sm w-24 indent-1 p-1 mx-2 text-sm"
            />
            paid by {settleData?.name} to {data?.name}
          </div>
          <div className="flex justify-center my-2">
            <button
              onClick={() => {
                setIsSettleOpen(false);
                setSettleData({});
              }}
              className="border-gray-800 rounded-sm border-2 px-4 py-1 mr-4 cursor-pointer"
            >
              Back
            </button>
            <button
              onClick={() => {
                handleSettleUp();
              }}
              className="bg-gray-800 px-4 py-1 text-white rounded-sm cursor-pointer"
            >
              Pay
            </button>
          </div>
        </>
      )}
    </CustomModal>
  );
};

export default SettleUpModal;
