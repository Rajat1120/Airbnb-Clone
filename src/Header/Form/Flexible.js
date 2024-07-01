import React from "react";
import Modal from "../../Modals/Modal";
import CheckInOption from "./DatesOption";
import CircularSlider from "./CircularSlider";

const Flexible = ({ modalRef, handleInputField, flexibleRef }) => {
  return (
    <Modal>
      <Modal.Open opens="flexible">
        <div
          ref={flexibleRef}
          className=" flex justify-center bg-slate-500  items-center"
        >
          <div
            className="w-[17.3rem] flex items-center justify-center"
            onClick={(e) => handleInputField(e.target, "flexible")}
          >
            Hello
          </div>
        </div>
      </Modal.Open>
      <Modal.Window modalRef={modalRef} name="flexible">
        <div className="flex flex-col justify-center items-center ">
          <CheckInOption></CheckInOption>
        </div>
      </Modal.Window>
    </Modal>
  );
};

export default Flexible;
