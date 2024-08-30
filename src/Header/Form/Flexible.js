import React, { useEffect } from "react";
import Modal from "../../Modals/Modal";
import CheckInOption from "./DatesOption";
import FlexibleStayOptions from "./FlexibleStayOptions"; // Make sure this import is correct
import { useDispatch, useSelector } from "react-redux";
import { setHoverInput, setTextForFlexibleInput } from "./mainFormSlice";
import { addMonths, format } from "date-fns"; // Import date-fns functions

const Flexible = ({ modalRef, handleInputField, flexibleRef }) => {
  const curInput = useSelector((store) => store.form.curSelectInput);
  const curSelectedMonths = useSelector((store) => store.form.months);
  const stayDuration = useSelector((store) => store.form.stayDuration);
  const dispatch = useDispatch();

  // Function to get next 12 months
  const getNext12Months = () => {
    const months = [];
    const currentDate = new Date();

    for (let i = 0; i < 12; i++) {
      const nextMonthDate = addMonths(currentDate, i);
      const formattedMonth = format(nextMonthDate, "MMMM");
      const formattedYear = format(nextMonthDate, "yyyy");
      months.push({ month: formattedMonth, year: formattedYear });
    }

    return months;
  };

  const next12Months = getNext12Months();

  const selectedMonthsName = curSelectedMonths.map(
    (index) => next12Months[index]
  );

  useEffect(() => {
    let inputText = `${
      curSelectedMonths.length > 0
        ? `${stayDuration.charAt(0).toUpperCase() + stayDuration.slice(1)} in ${
            selectedMonthsName.length === 1
              ? selectedMonthsName[0].month
              : selectedMonthsName
                  .map((item) => item.month.substring(0, 3))
                  .join(", ")
          }`
        : ` Any ${stayDuration}`
    }`;

    dispatch(setTextForFlexibleInput(inputText));
  }, [curSelectedMonths, selectedMonthsName, stayDuration, dispatch]);

  return (
    <Modal>
      <Modal.Open opens="flexible">
        <div
          onMouseEnter={() => dispatch(setHoverInput("month"))}
          onMouseLeave={() => dispatch(setHoverInput(null))}
          ref={flexibleRef}
          className={`flex 1xz:relative 1smd:static  1smd:justify-center 1xz:justify-start 1xz:w-full 1xz:px-6 1smd:px-0  items-center ${
            curInput === "flexible"
              ? "shadow-checkInShadow bg-white rounded-full "
              : ""
          }`}
        >
          <div
            className={`1smd:w-[17.3rem] h-[3.85rem] 1xz:before:w-full 1xz:before:left-0 hover:before:content-[''] 1smd:before:w-[17.3rem] before:absolute before:top-0 before:h-[3.85rem] 1smd:before:left-[17.67rem]  before:rounded-full  ${
              curInput === "flexible"
                ? "rounded-full bg-white"
                : "before:hover:bg-[#c0c0c0] "
            }  before:hover:opacity-40  flex items-center justify-center`}
            onClick={(e) => handleInputField(e.target, "flexible")}
          >
            <div className="flex text-sm font-medium items-start justify-center 1smd:w-[15rem] flex-col ">
              <span className="text-xs font-medium">When</span>
              <span className="overflow-hidden text-sm font-medium text-ellipsis whitespace-nowrap 1smd:w-[15rem]">
                {curInput === "flexible" ? (
                  curSelectedMonths.length > 0 ? (
                    `${
                      stayDuration.charAt(0).toUpperCase() +
                      stayDuration.slice(1)
                    } in ${
                      selectedMonthsName.length === 1
                        ? selectedMonthsName[0].month
                        : selectedMonthsName
                            .map((item) => item.month.substring(0, 3))
                            .join(", ")
                    }`
                  ) : (
                    ` Any ${stayDuration}`
                  )
                ) : (
                  <span className="text-sm font-thin">Any time</span>
                )}
              </span>
            </div>
          </div>
        </div>
      </Modal.Open>
      <Modal.Window modalRef={modalRef} name="flexible">
        <div className="flex relative flex-col  w-full justify-center items-center">
          <CheckInOption />
          <FlexibleStayOptions />
        </div>
      </Modal.Window>
    </Modal>
  );
};

export default Flexible;
