import React from "react";
import Modal from "../../Modals/Modal";
import CheckInOption from "./DatesOption";
import CircularSlider from "./CircularSlider";
import { useSelector } from "react-redux";

const Month = ({ modalRef, handleInputField, monthRef }) => {
  const handleClick = (e) => {
    handleInputField(e.target, "month");
  };

  const curInput = useSelector((store) => store.form.curSelectInput);

  return (
    <Modal>
      <Modal.Open opens="month">
        <div
          className={`flex justify-center  items-center ${
            curInput === "month" ? "shadow-month rounded-full" : ""
          } `}
          ref={monthRef}
        >
          <div
            className={`w-[17.3rem] ${
              curInput === "month" ? "bg-white" : "bg-slate-500"
            } flex items-center justify-center`}
            onClick={handleClick}
          >
            Month
          </div>
        </div>
      </Modal.Open>
      <Modal.Window modalRef={modalRef} name="month">
        <div className="flex flex-col justify-center items-center">
          <CheckInOption></CheckInOption>
          <CircularSlider></CircularSlider>
        </div>
      </Modal.Window>
    </Modal>
  );
};

export default Month;
