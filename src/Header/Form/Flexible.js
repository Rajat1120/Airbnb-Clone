import React, { useEffect, useState } from "react";
import Modal from "../../Modals/Modal";
import CheckInOption from "./DatesOption";
import monthSvg from "../../data/Icons svg/month.svg"
import arrow_left from "../../data/Icons svg/arrow-left.svg";
import arrow_right from "../../data/Icons svg/arrow-right.svg";
import { addMonths, format } from 'date-fns';
import { useSelector } from "react-redux";

const Flexible = ({ modalRef, handleInputField, flexibleRef }) => {
   const [scrollPosition, setScrollPosition] = useState(0);
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

  let result = getNext12Months()


    let btnLeftClassName = ` absolute z-30   top-[25%] left-0 h-9 hidden  w-9  z-100 bg-white hover:scale-110 hover:drop-shadow-md  rounded-[50%] border-[1px] border-grey-dim`;

  let btnRightClassName = `absolute  top-[25%] z-30 right-2 h-9  w-9 border-grey-dim bg-white hover:scale-110 hover:drop-shadow-md   rounded-[50%] border-[1px]`;

  return (
    <Modal>
      <Modal.Open opens="flexible">
        <div
          ref={flexibleRef}
          className={`flex justify-center items-center ${
            curInput === "flexible" ? "shadow-checkInShadow rounded-full" : ""
          }`}
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
        <div className="flex flex-col w-full justify-center items-center">
          <CheckInOption></CheckInOption>
          <div className="w-full mt-4 flex-col flex items-center">
            <span className="text-xl">How long would you like to stay?</span>
            <div className="flex items-center my-5 gap-x-2">
              <span className="py-2 font-extralight px-4 border-[1px] border-grey-light rounded-full">Weekend</span>
              <span className="py-2 font-extralight px-4 border-[1px] border-grey-light rounded-full">Week</span>
              <span className="py-2 font-extralight px-4 border-[1px] border-grey-light rounded-full">Month</span>
            </div>
          </div>
          <div className="w-full max-w-[65rem] mb-10 flex flex-col items-center">
            <span className="text-xl mt-10 mb-6" >When do you want to go?</span>
            <div className="w-full overflow-x-auto">
              <div className="inline-flex gap-x-2 pb-4">
                {result.map((item, index) => (
                  <div key={index} className={`flex-shrink-0 rounded-2xl flex-center flex-col ${index === 0 ? "ml-9" : ""}  w-[7.5rem] border-[1px] border-grey-dim h-[8.5rem]`}>
                    <div  className="" ><img className="w-10 h-10"  src={monthSvg} alt="" /></div>
                   <span>

                     {item.month} 
                   </span>
                   <span>

                   {item.year}
                   </span>
                  </div>
                ))}
              </div>
              <button  className={btnLeftClassName}>
              <img src={arrow_left} className="h-6 " alt="" />
            </button>
             <button  className={btnRightClassName}>
              <img src={arrow_right} className="h-6 " alt="" />
            </button>
            </div>
          </div>
        </div>
      </Modal.Window>
    </Modal>
  );
};

export default Flexible;