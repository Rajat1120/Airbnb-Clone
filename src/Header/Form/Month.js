import React from "react";
import Modal from "../../Modals/Modal";
import CheckInOption from "./DatesOption";
import CircularSlider from "./CircularSlider";

const Month = ({ modalRef, handleInputField, monthRef }) => {
  return (
    <Modal>
      <Modal.Open opens="month">
        <div
          className=" flex justify-center bg-slate-500  items-center"
          ref={monthRef}
        >
          <div
            className="w-[17.3rem] flex items-center justify-center"
            onClick={(e) => handleInputField(e.target, "month")}
          >
            Month
          </div>
        </div>
      </Modal.Open>
      <Modal.Window modalRef={modalRef} name="month">
        <div className="flex flex-col justify-center items-center ">
          <CheckInOption></CheckInOption>
          <CircularSlider></CircularSlider>
        </div>
      </Modal.Window>
    </Modal>
  );
};

export default Month;
