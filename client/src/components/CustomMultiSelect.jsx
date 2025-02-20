import React, { useState } from "react";

const opts = [
  { label: "Item 1", value: "item-1" },
  { label: "Item 2", value: "item-2" },
];

const CustomMultiSelect = ({ id, options = opts }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [showSelected, setShowSelected] = useState(true);
  const [selected, setSelected] = useState(opts.map((v) => v.value));

  const handleRemoveSelected = (value) => {
    setSelected((selected) => selected.filter((item) => item !== value));
  };
  return (
    <div
      id={id}
      className="w-full bg-white border-gray-400 border-2 rounded-md p-2 flex relative"
    >
      {showSelected && (
        <div className="flex">
          {selected?.map((option) => (
            <div
              className="bg-gray-200 py-1 pl-3 rounded-2xl text-sm flex mr-2"
              key={option}
            >
              {option}{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 mx-2 cursor-pointer hover:text-gray-600"
                onClick={() => handleRemoveSelected(option)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </div>
          ))}
        </div>
      )}
      <input
        type="text"
        className="border-2 flex-1"
        onFocus={() => setShowOptions(true)}
        // onBlur={() => setShowOptions(false)}
      />
      {showOptions && (
        <ul className="absolute top-13 left-0 border-gray-400 border-2 rounded-md  bg-white w-full p-2">
          {options?.map((option) => {
            console.log(selected?.includes(option.value));
            if (selected?.includes(option.value)) {
              return (
                <li
                  className="bg-gray-100 py-1 px-4 cursor-pointer flex items-center"
                  key={option.value}
                  onClick={() =>
                    setSelected((selected) =>
                      selected.filter((v) => v !== option.value)
                    )
                  }
                >
                  <input
                    checked={selected?.includes(option.value)}
                    type="checkbox"
                    className="size-4 mr-2"
                    onChange={() =>
                      setSelected((selected) =>
                        selected.filter((v) => v !== option.value)
                      )
                    }
                  />
                  {option.label}
                </li>
              );
            }
            return (
              <li
                className="hover:bg-gray-100 py-1 px-4 cursor-pointer flex items-center"
                key={option.value}
                onClick={() =>
                  setSelected((selected) => [...selected, option.value])
                }
              >
                <input
                  checked={selected?.includes(option.value)}
                  type="checkbox"
                  className="size-4 mr-2"
                  onChange={() =>
                    setSelected((selected) => [...selected, option.value])
                  }
                />
                {option.label}
              </li>
            );
            // selected?.includes(option.value) ? (
            //   <li className="bg-gray-100 py-1 px-4 cursor-pointer">
            //     {option.label}
            //   </li>
            // ) : (
            //   <li className="hover:bg-gray-100 py-1 px-4 cursor-pointer">
            //     {option.label}
            //   </li>
            // );
          })}
        </ul>
      )}
    </div>
  );
};

export default CustomMultiSelect;
