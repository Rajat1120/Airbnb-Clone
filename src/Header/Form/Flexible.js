import React from "react";
import Modal from "../../Modals/Modal";
import CheckInOption from "./DatesOption";
import CircularSlider from "./CircularSlider";
import { useSelector } from "react-redux";

const Flexible = ({ modalRef, handleInputField, flexibleRef }) => {
  const curInput = useSelector((store) => store.form.curSelectInput);
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
                : "before:hover:bg-gray-300 "
            }  before:hover:opacity-40  flex items-center justify-center`}
            onClick={(e) => handleInputField(e.target, "flexible")}
          >
            flexible
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
