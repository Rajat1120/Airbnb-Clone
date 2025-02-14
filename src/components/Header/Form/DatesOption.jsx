import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveInput,
  setDateOption,
  setOpenName,
} from "../../../redux/mainFormSlice";

const DATE_OPTIONS = [
  { value: "dates", label: "Dates" },
  { value: "month", label: "Months" },
  { value: "flexible", label: "Flexible" },
];

const CheckInOption = () => {
  const dateOption = useSelector((state) => state.form.dateOption);
  const dispatch = useDispatch();

  const handleOptionClick = (option) => {
    dispatch(setDateOption(option));
    dispatch(setOpenName(option === "dates" ? "checkIn" : option));
    dispatch(setActiveInput(option === "dates" ? "checkIn" : option));
  };

  return (
    <div className="flex gap-3 bg-shadow-gray rounded-full 1sm:my-7 h-11 justify-between items-center w-[calc(100%-2rem)] px-1 max-w-80">
      {DATE_OPTIONS.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => handleOptionClick(value)}
          className={`
            rounded-full text-sm font-medium flex justify-center items-center
            h-9 w-[6rem] text-zinc-700
            ${
              dateOption === value
                ? "bg-white"
                : "cursor-pointer hover:bg-grey-dim"
            }
          `}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default CheckInOption;
