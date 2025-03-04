import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

const CustomMultiSelect = ({
  id,
  options,
  selected,
  onChange,
  disabled = false,
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const [modifiedOptions, setModifiedOptions] = useState(options);
  const searchBox = useRef();

  const eventListener = (e) => {
    if (!searchBox.current || searchBox.current.contains(e.target)) return;
    setShowOptions(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", eventListener);
    document.addEventListener("touchStart", eventListener);
    return () => {
      document.removeEventListener("mousedown", eventListener);
      document.removeEventListener("touchStart", eventListener);
    };
  }, []);

  const handleRemoveSelected = (value) => {
    if (disabled) return;
    setShowOptions(true);
    onChange((selected) => selected.filter((item) => item !== value));
  };

  const handleSelection = (value, e) => {
    e.stopPropagation();
    setShowOptions(true);
    if (!selected.includes(value)) {
      onChange((selected) => [...selected, value]);
    }
  };

  const handleInputSearch = (query) => {
    if (!query) {
      setModifiedOptions(options);
    } else {
      const filteredOptions = options.filter((v) =>
        Object.values(v).some((v) =>
          v.toString().toLowerCase().includes(query.toString().toLowerCase())
        )
      );
      setModifiedOptions(filteredOptions);
    }
  };

  useEffect(() => {
    setModifiedOptions(options);
  }, [options]);

  return (
    <div
      ref={searchBox}
      id={id}
      className="w-full bg-white border-gray-400 border-2 rounded-md p-2 flex relative"
    >
      {selected.length > 0 && (
        <div className="flex">
          {selected?.map((value) => (
            <div
              className="bg-gray-200 py-1 pl-3 rounded-2xl text-xs flex mr-2 items-center"
              key={value}
            >
              {options.filter((v) => v.value === value)?.[0]?.label}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`size-4 mx-2 hover:text-gray-600 ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
                onClick={() => handleRemoveSelected(value)}
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
        className="flex-1 focus-visible:outline-0"
        onFocus={() => setShowOptions(true)}
        // onBlur={() => setShowOptions(false)}
        onChange={(e) => handleInputSearch(e.target.value)}
        disabled={disabled}
      />
      {showOptions && (
        <ul className="absolute top-11 left-0 border-gray-400 border-2 rounded-md bg-white w-full p-2">
          {modifiedOptions.length > 0 ? (
            modifiedOptions?.map((option) => {
              if (selected?.includes(option.value)) {
                return (
                  <li
                    className="bg-gray-100 py-1 px-4 cursor-pointer flex items-center"
                    key={option.value}
                    onClick={(e) => handleRemoveSelected(option.value, e)}
                  >
                    <input
                      checked={selected?.includes(option.value)}
                      type="checkbox"
                      className="size-4 mr-2"
                      readOnly
                    />
                    {option.label}
                  </li>
                );
              }
              return (
                <li
                  className="hover:bg-gray-100 py-1 px-4 cursor-pointer flex items-center"
                  key={option.value}
                  onClick={(e) => handleSelection(option.value, e)}
                >
                  <input
                    checked={selected?.includes(option.value)}
                    type="checkbox"
                    className="size-4 mr-2"
                    readOnly
                    // onChange={(e) => handleSelection(option.value, e)}
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
            })
          ) : (
            <li>No Results Found...</li>
          )}
        </ul>
      )}
    </div>
  );
};

CustomMultiSelect.propTypes = {
  id: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  selected: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CustomMultiSelect;
