import { useDispatch, useSelector } from "react-redux";
import { setActiveInput, setDateOption, setOpenName } from "./mainFormSlice";

const CheckInOption = () => {
  const dateOption = useSelector((state) => state.form.dateOption);

  const dispatch = useDispatch();

  return (
    <div className="flex gap-3 bg-shadow-gray rounded-full 1sm:my-7 h-11 justify-between items-center w-[calc(100%-2rem)] px-1 max-w-80 ">
      <span
        onClick={() => {
          dispatch(setDateOption("dates"));
          dispatch(setOpenName("checkIn"));
          dispatch(setActiveInput("checkIn"));
        }}
        className={`rounded-full text-sm font-medium  flex  text-zinc-700  justify-center items-center h-9 w-[6rem] ${
          dateOption === "dates"
            ? "bg-white"
            : "cursor-pointer hover:bg-grey-dim"
        }`}
      >
        Dates
      </span>
      <span
        onClick={() => {
          dispatch(setDateOption("month"));
          dispatch(setOpenName("month"));
          dispatch(setActiveInput("month"));
        }}
        className={`rounded-full text-zinc-700 flex text-sm font-medium justify-center items-center h-9 w-[6rem] ${
          dateOption === "month"
            ? "bg-white   "
            : "cursor-pointer hover:bg-grey-dim"
        }`}
      >
        Months
      </span>
      <span
        onClick={() => {
          dispatch(setDateOption("flexible"));

          dispatch(setOpenName("flexible"));
          dispatch(setActiveInput("flexible"));
        }}
        className={`rounded-full  text-zinc-700  text-sm font-medium flex justify-center items-center h-9 w-[6rem] ${
          dateOption === "flexible"
            ? "bg-white"
            : "cursor-pointer hover:bg-grey-dim"
        }`}
      >
        Flexible
      </span>
    </div>
  );
};

export default CheckInOption;
