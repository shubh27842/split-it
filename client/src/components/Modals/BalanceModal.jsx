import React, { useEffect, useState } from "react";
import CustomModal from "./CustomModal";
import { apiEndPoint } from "../../utils/api";
import axios from "axios";

const BalanceModal = ({ isOpen, setIsOpen, groupId }) => {
  const [balances, setBalances] = useState([]);

  const fetchBalances = async () => {
    try {
      const res = await axios.get(
        `${apiEndPoint}/group/getBalanceSummary?groupId=${groupId}`
      );
      setBalances(Object.values(res.data.balances));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchBalances();
  }, []);
  return (
    <CustomModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <div className="p-2">
        <h2 className="text-xl font-semibold">Balances</h2>
        {balances.map((balance) => {
          return (
            <div
              key={balance?.email}
              className="border-2 my-2 p-1 rounded-sm border-gray-400 text-gray-800"
            >
              {balance?.netBalance > 0 ? (
                <div>
                  {balance?.name} gets back{" "}
                  <span className="text-green-400">
                    Rs {Number(balance?.netBalance).toFixed(2)}
                  </span>{" "}
                  in total
                </div>
              ) : (
                <div>
                  {balance?.name} owes{" "}
                  <span className="text-orange-400">
                    Rs {Math.abs(Number(balance?.netBalance).toFixed(2))}
                  </span>{" "}
                  in total
                </div>
              )}
              <ul className="list-disc ml-8 text-sm">
                {balance?.oweDetails?.map((owe) => {
                  if (owe.amount > 0) {
                    return (
                      <li key={owe?._id}>
                        {owe?.name} owes{" "}
                        <span className="text-green-400">
                          Rs {Number(owe?.amount).toFixed(2)}
                        </span>{" "}
                        to {balance?.name}
                      </li>
                    );
                  }

                  return (
                    <li key={owe?._id}>
                      {balance?.name} owes{" "}
                      <span className="text-orange-400">
                        Rs {Math.abs(Number(owe?.amount).toFixed(2))}
                      </span>{" "}
                      to {owe?.name}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </CustomModal>
  );
};

export default BalanceModal;
