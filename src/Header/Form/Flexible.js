import React, { useEffect, useRef, useState } from "react";
import Modal from "../../Modals/Modal";
import CheckInOption from "./DatesOption";
import monthSvg from "../../data/Icons svg/month.svg"
import monthSelected from "../../data/Icons svg/month-checked.svg"
import arrow_left from "../../data/Icons svg/arrow-left.svg";
import arrow_right from "../../data/Icons svg/arrow-right.svg";
import { addMonths, format } from 'date-fns';
import { useDispatch, useSelector } from "react-redux";
import { setMonths, setStayDuration } from "./mainFormSlice";

const Flexible = ({ modalRef, handleInputField, flexibleRef }) => {
   const [scrollPosition, setScrollPosition] = useState(0);
  const curInput = useSelector((store) => store.form.curSelectInput);
  const curSelectedMonths = useSelector((store) => store.form.months);
  const curSelectedInput = useSelector((store) => store.form.curSelectInput);
  const stayDuration = useSelector((store) => store.form.stayDuration);
  const dispatch = useDispatch()
  let monthRef = useRef()
  let rightScrollBtnRef = useRef()
  let leftScrollBtnRef = useRef()
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

  let selectedMonthsName = curSelectedMonths.map(index => result[index])

  console.log(selectedMonthsName);



    useEffect(() => {
    const month = monthRef.current;
    const handleScroll = () => {
      if (month) {
        setScrollPosition(month.scrollLeft);
      }
    };

    if (month) {
      month.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (month) {
        month.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

    useEffect(() => {
    let leftScrollButtonRef = leftScrollBtnRef.current;
    function handleScrollLeftBtn() {
      const newPosition = scrollPosition - 760;
      monthRef.current.scrollTo({
        left: newPosition,
        behavior: "smooth",
      });
      setScrollPosition(newPosition);
    }

    if (leftScrollButtonRef) {
      leftScrollButtonRef.addEventListener("click", handleScrollLeftBtn);
    }

    return () => {
      if (leftScrollButtonRef) {
        leftScrollButtonRef.removeEventListener("click", handleScrollLeftBtn);
      }
    };
  }, [scrollPosition]);

 


   useEffect(() => {
    let rightScrollBtn = rightScrollBtnRef.current;
    function handleScrollRightBtn() {
      const newPosition = scrollPosition + 760;
      monthRef.current.scrollTo({
        left: newPosition,
        behavior: "smooth",
      });
      setScrollPosition(newPosition);
    }

    if (rightScrollBtn) {
      rightScrollBtn.addEventListener("click", handleScrollRightBtn);
    }

    return () => {
      if (rightScrollBtn) {
        rightScrollBtn.removeEventListener("click", handleScrollRightBtn);
      }
    };
  }, [scrollPosition]);

 


    let btnLeftClassName = `absolute ${scrollPosition < 1 ? "hidden" : "flex-center" } top-[72%] left-5 h-8 w-8  bg-white z-30 rounded-[50%] hover:scale-110 hidden hover:drop-shadow-md border-[1px] border-grey-dim-light `;

   let btnRightClassName = `absolute  ${scrollPosition > 758 ? "hidden" : "flex-center" } top-[72%] right-5 h-8 w-8  bg-white z-30 rounded-[50%] hover:scale-110 hover:drop-shadow-md border-[1px] border-grey-dim-light `;

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
            <div className="flex text-sm font-medium items-start justify-center w-[15rem] flex-col ">
              <span className="text-xs font-medium"  >When</span>
              <span className="overflow-hidden text-sm font-medium text-ellipsis whitespace-nowrap w-[15rem]" >
        {curSelectedInput === "flexible" ? ( curSelectedMonths.length > 0 ? `${ stayDuration.charAt(0).toUpperCase() + stayDuration.slice(1)} in ${selectedMonthsName.length === 1 ? selectedMonthsName[0].month : selectedMonthsName.map(item => item.month.substring(0,3)).join(", ")}` : ` Any ${stayDuration}`) : <span className="text-sm font-thin" >Any time</span>}
              </span>
          </div>
            </div>
        </div>
      </Modal.Open>
      <Modal.Window modalRef={modalRef} name="flexible">
        <div className="flex relative flex-col  w-full justify-center items-center">
          <CheckInOption></CheckInOption>
          <div className="w-full mt-4 flex-col flex items-center">
            <span className="text-lg font-medium">How long would you like to stay?</span>
            <div className="flex items-center my-5 gap-x-2">
              <span onClick={() => dispatch(setStayDuration("weekend"))} className={` py-2 text-sm ${stayDuration === "weekend" ? "border-[2px] border-black" : "border-[1px]  border-grey-light"} transform transition-transform duration-100 active:scale-95 font-extralight px-4  hover:border-black rounded-full `}>Weekend</span>
              <span onClick={() => dispatch(setStayDuration("week"))} className={` py-2 text-sm ${stayDuration === "week" ? "border-[2px] border-black" : "border-[1px]  border-grey-light"} transform transition-transform duration-100 active:scale-95 font-extralight px-4 border-[1px] hover:border-black rounded-full `}>Week</span>
              <span onClick={() => dispatch(setStayDuration("month"))} className={` py-2 text-sm ${stayDuration === "month" ? "border-[2px] border-black" : "border-[1px]  border-grey-light"} transform transition-transform duration-100 active:scale-95 font-extralight px-4 border-[1px] hover:border-black rounded-full `}>Month</span>
            </div>
          </div>
          <div className="w-full  max-w-[65rem] mb-12 flex flex-col items-center">
            <span className="text-lg font-medium mt-10 mb-6" >When do you want to go?</span>
            <div ref={monthRef} className="w-full  overflow-x-auto">
              <div  className="inline-flex gap-x-2 pb-4">
                {result.map((item, index) => (
                  <div onClick={() => dispatch(setMonths(index))} key={index} className={`flex-shrink-0 ${curSelectedMonths.includes(index) ? " border-black bg-shadow-gray-light border-[2px]" : "border-grey-dim border-[1px] "} rounded-2xl flex-center flex-col ${index === 0 ? "ml-10" : ""} ${index === 11 ? "mr-10" : ""}  w-[7.5rem]   hover:border-black h-[8.5rem]`}>
                    <div  className="" ><img className="w-10 h-10"  src={curSelectedMonths.includes(index) ? monthSelected : monthSvg} alt="" /></div>
                   <span className="text-sm font-medium"  > 

                     {item.month} 
                   </span>
                   <span className="text-xs font-extralight"  >

                   {item.year}
                   </span>
                  </div>
                ))}
              </div>
              <button ref={leftScrollBtnRef}  className={btnLeftClassName}>
              <img src={arrow_left} className="h-6 " alt="" />
            </button>
             {scrollPosition > 0 && (
              <div className="w-12 h-40 absolute   top-[60%] left-0 bg-white border-r-[0.8rem] border-white "></div>
            )}
             <button ref = {rightScrollBtnRef}  className={btnRightClassName}>
              <img src={arrow_right} className="h-6 " alt="" />
            </button>
             {scrollPosition < 758 && (
              <div className="w-12 h-40 absolute   top-[60%] right-0 bg-white border-r-[0.8rem] border-white "></div>
            )}
            </div>
          </div>
        </div>
      </Modal.Window>
    </Modal>
  );
};

export default Flexible;