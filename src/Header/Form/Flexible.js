import React, { useEffect } from "react";
import Modal from "../../Modals/Modal";
import CheckInOption from "./DatesOption";
import monthSvg from "../../data/Icons svg/month.svg"

import { addMonths, format } from 'date-fns';
import { useSelector } from "react-redux";

const Flexible = ({ modalRef, handleInputField, flexibleRef }) => {
  const curInput = useSelector((store) => store.form.curSelectInput);

  function getNext12Months() {
    const months = [];
    const currentDate = new Date();
    
    for (let i = 0; i < 12; i++) {
        const nextMonthDate = addMonths(currentDate, i);
        const formattedMonth = format(nextMonthDate, 'MMMM');
        const formattedYear = format(nextMonthDate, 'yyyy');
        months.push({month: formattedMonth, year: formattedYear});
    }
    
    return months;
}

let result  = getNext12Months()





  return (
    <Modal>
      <Modal.Open opens="flexible">
        <div
          ref={flexibleRef}
          className={` flex justify-center   items-center ${
            curInput === "flexible" ? "shadow-checkInShadow rounded-full" : ""
          } `}
        >
          <div
            className={`w-[17.3rem] h-[3.85rem] hover:before:content-[''] before:w-[17.3rem] before:absolute before:top-0 before:h-[3.85rem] before:left-[17.67rem] before:rounded-full  ${
              curInput === "flexible"
                ? "rounded-full bg-white"
                : "before:hover:bg-[#c0c0c0] "
            }  before:hover:opacity-40  flex items-center justify-center`}
            onClick={(e) => handleInputField(e.target, "flexible")}
          >
            flexible
          </div>
        </div>
      </Modal.Open>
      <Modal.Window modalRef={modalRef} name="flexible">
        <div className="flex flex-col w-full  justify-center items-center ">
          <CheckInOption></CheckInOption>
          <div className="w-full flex-col flex-center">
            <span className="text-xl" >How long would you like to stay?</span>
            <div className="flex-center my-5 gap-x-2" >
              <span className="py-2 font-extralight px-4 border-[1px] border-grey-light rounded-full" >Weekend</span>
              <span className="py-2 font-extralight px-4 border-[1px] border-grey-light rounded-full" > Week</span>
              <span className="py-2 font-extralight px-4 border-[1px] border-grey-light rounded-full" > Month</span>
            </div>
          </div>
          <div className="w-[65rem] overflow-scroll overflow-x-auto  flex-center flex-col" >
            <span>When do you want to go?</span>
            <div className="w-[60rem] gap-x-2 overflow-x-auto flex overflow-scroll" >
            {result.map((item) => {
              return <div className="w-[20rem] border-[1px] border-grey-dim h-28" >
                <div><img src={monthSvg} alt="" /></div>
              </div>
            })}
            </div>
          </div>
        </div>
      </Modal.Window>
    </Modal>
  );
};

export default Flexible;
