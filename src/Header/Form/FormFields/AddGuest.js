import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setAdultCount,
  setChildCount,
  setInfantCount,
  setPetsCount,
} from "../mainFormSlice";

const AddGuest = () => {
  const [Disable, setDisable] = useState(false);

  const dispatch = useDispatch();
  const adultCount = useSelector((store) => store.form.adultCount);
  const childCount = useSelector((store) => store.form.childCount);
  const infantCount = useSelector((store) => store.form.infantCount);
  const petCount = useSelector((store) => store.form.petsCount);

  useEffect(() => {
    if (adultCount > 0 && infantCount + childCount + petCount === 0) {
      setDisable(false);
    } else if (adultCount > 1 && infantCount + childCount + petCount > 0) {
      setDisable(false);
    } else if (adultCount === 0 || infantCount + childCount + petCount > 0) {
      setDisable(true);
    }
  }, [adultCount, childCount, infantCount, petCount]);

  return (
    <div className="w-[26rem]  flex-center h-[25rem]">
      <div className="py-6 flex-center flex-col ">
        <div className="flex w-[22rem] flex-center flex-col">
          <div className="w-full justify-between flex items-center">
            <div className="">
              <p>Adults</p>
              <p className="text-sm text-grey"> Age 13 or above</p>
            </div>
            <div className="flex items-center justify-center">
              <button
                disabled={Disable}
                onClick={() => {
                  let count = adultCount - 1;
                  dispatch(setAdultCount(count));
                }}
                className={`w-8 h-8  m-4 items-center justify-center ${
                  Disable ? "cursor-disable" : ""
                } rounded-full bg-white border-[1px] border-grey`}
              >
                -
              </button>
              <p className="w-3 flex-center font-light">
                {adultCount}
                <span className="text-sm ">
                  {adultCount === 16 ? "+" : ""}
                </span>{" "}
              </p>
              <button
                disabled={adultCount + childCount === 16}
                onClick={() => {
                  let count = adultCount + 1;
                  dispatch(setAdultCount(count));
                }}
                className={`w-8 h-8 flex ${
                  adultCount + childCount === 16 ? "cursor-disable" : ""
                }   m-4 items-center  justify-center rounded-full bg-white border-[1px] border-grey`}
              >
                +
              </button>
            </div>
          </div>
          <div className="w-full mt-4 h-[1px] bg-shadow-gray"></div>
        </div>
        <div className="flex w-[22rem] flex-center flex-col">
          <div className="w-full justify-between flex items-center">
            <div className="">
              <p>Children</p>
              <p className="text-sm text-grey"> Ages 2-12</p>
            </div>
            <div className="flex items-center justify-center">
              <button
                disabled={childCount === 0}
                onClick={() => {
                  let count = childCount - 1;
                  dispatch(setChildCount(count));
                }}
                className={` w-8 h-8  m-4 
              ${childCount === 0 ? "cursor-disable" : ""} 
              items-center justify-center rounded-full bg-white border-[1px] border-grey `}
              >
                -
              </button>
              <p className="w-3 flex-center font-light">{childCount}</p>
              <button
                disabled={childCount + adultCount === 16}
                onClick={() => {
                  if (adultCount + childCount + infantCount + petCount === 0) {
                    let curAdultCount = adultCount + 1;
                    dispatch(setAdultCount(curAdultCount));

                    let curPetCount = childCount + 1;
                    dispatch(setChildCount(curPetCount));
                  } else {
                    let curPetCount = childCount + 1;
                    dispatch(setChildCount(curPetCount));
                  }
                }}
                className={`w-8 h-8 flex  m-4 items-center ${
                  childCount + adultCount === 16 ? "cursor-disable" : ""
                } justify-center rounded-full bg-white border-[1px] border-grey`}
              >
                +
              </button>
            </div>
          </div>
          <div className="w-full mt-4 h-[1px] bg-shadow-gray"></div>
        </div>
        <div className="flex w-[22rem] flex-center flex-col">
          <div className="w-full justify-between flex items-center">
            <div className="">
              <p>Infants</p>
              <p className="text-sm text-grey"> Under 2</p>
            </div>
            <div className="flex items-center justify-center">
              <button
                disabled={infantCount === 0}
                onClick={() => {
                  let count = infantCount - 1;
                  dispatch(setInfantCount(count));
                }}
                className={` w-8 h-8 ${
                  infantCount === 0 ? "cursor-disable" : ""
                }  m-4 items-center justify-center rounded-full bg-white border-[1px] border-grey`}
              >
                -
              </button>
              <p className="w-3 flex-center font-light">{infantCount}</p>
              <button
                disabled={infantCount === 5}
                onClick={() => {
                  if (adultCount + childCount + infantCount + petCount === 0) {
                    let curAdultCount = adultCount + 1;
                    dispatch(setAdultCount(curAdultCount));

                    let curPetCount = infantCount + 1;
                    dispatch(setInfantCount(curPetCount));
                  } else {
                    let curPetCount = infantCount + 1;
                    dispatch(setInfantCount(curPetCount));
                  }
                }}
                className={`w-8 ${
                  infantCount === 5 ? "cursor-disable" : ""
                }  h-8 flex  m-4 items-center justify-center rounded-full bg-white border-[1px] border-grey `}
              >
                +
              </button>
            </div>
          </div>
          <div className="w-full mt-4 h-[1px] bg-shadow-gray"></div>
        </div>
        <div className="flex w-[22rem] flex-center flex-col">
          <div className="w-full justify-between flex items-center">
            <div className="">
              <p>Pets</p>
              <p className="text-sm hover:cursor-pointer  font-medium text-grey">
                <u>Bringing a service animal ?</u>
              </p>
            </div>
            <div className="flex items-center justify-center">
              <button
                disabled={petCount === 0}
                onClick={() => {
                  let count = petCount - 1;
                  dispatch(setPetsCount(count));
                }}
                className={` w-8 h-8  m-4 items-center justify-center 
          ${petCount === 0 ? "cursor-disable" : ""}
          rounded-full bg-white border-[1px] border-grey `}
              >
                -
              </button>
              <p className="w-3 flex-center font-light">{petCount}</p>
              <button
                disabled={petCount === 5}
                onClick={() => {
                  if (adultCount + childCount + infantCount + petCount === 0) {
                    let curAdultCount = adultCount + 1;
                    dispatch(setAdultCount(curAdultCount));

                    let curPetCount = petCount + 1;
                    dispatch(setPetsCount(curPetCount));
                  } else {
                    let curPetCount = petCount + 1;
                    dispatch(setPetsCount(curPetCount));
                  }
                }}
                className={` w-8 h-8 flex
              ${
                petCount === 5 ? "cursor-disable" : ""
              }  m-4 items-center justify-center rounded-full bg-white border-[1px] border-grey `}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddGuest;
