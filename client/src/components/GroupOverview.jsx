import PropTypes from "prop-types";
import React from "react";
import { useNavigate } from "react-router";

const GroupOverview = ({ groupDetail, group = { balance: {} } }) => {
  const navigate = useNavigate();
  const { balance } = group;
  return (
    <div
      className={`flex shadow-md bg-white rounded-lg p-1 sm:p-2 ${groupDetail && "border-2 border-gray-400 shadow-none rounded-b-none"}`}
      onClick={() => !groupDetail && navigate(`/group/${group._id}`)}
    >
      <div
        className={`w-20 h-20 rounded-md flex justify-center items-center ${groupDetail ? "bg-violet-200" : "bg-gray-200"}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="gray"
          className="size-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z"
          />
        </svg>
      </div>
      <div className="ml-2">
        <div className="text-lg">{group?.groupName}</div>
        {Number(group?.netBalance) === 0 ? (
          <div className="text-sm text-gray-800">All settled up</div>
        ) : Number(group?.netBalance) < 0 ? (
          <div className="text-sm">
            You owe{" "}
            <span className="text-orange-600">
              Rs {Math.abs(Number(group?.netBalance))}
            </span>{" "}
            overall
          </div>
        ) : (
          <div className="text-sm ">
            You are owed{" "}
            <span className="text-green-400">Rs {group?.netBalance}</span>{" "}
            overall
          </div>
        )}
        <ul className="list-disc list-inside text-xs text-gray-500">
          {balance?.oweDetails?.map((owe) => {
            if (owe.amount === 0) return;
            if (owe.amount > 0) {
              return (
                <li key={owe?._id}>
                  {owe?.name} owes{" "}
                  <span className="text-green-400">
                    Rs {Number(owe?.amount).toFixed(2)}
                  </span>{" "}
                  to You
                </li>
              );
            }

            return (
              <li key={owe?._id}>
                You owes{" "}
                <span className="text-orange-400">
                  Rs {Math.abs(Number(owe?.amount).toFixed(2))}
                </span>{" "}
                to {owe?.name}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

GroupOverview.propTypes = {
  groupDetail: PropTypes.bool.isRequired,
};

export default GroupOverview;
