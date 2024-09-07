import React from "react";

const Insights = () => {
  return (
    <div className="w-full px-5 1smm:px-0 flex flex-col  py-12 ">
      <span className="text-2xl block pb-6 font-medium">Things to know</span>
      <div className="w-full 1smm:flex-row flex-col flex gap-y-5 h-full">
        <div className="1smm:w-[30%] pb-5 1smm:pb-0 mr-8 w-full flex flex-col border-b 1smm:border-none border-grey-dim justify-between  h-full">
          <span className="w-full font-medium block">House rules</span>
          <span className="w-full font-light block">
            Check-in: 2:00 pm – 9:00 pm
          </span>
          <span className="w-full font-light block">10 guests maximum </span>
          <span className="w-full font-light block">
            Checkout before 12:00 pm
          </span>
        </div>
        <div className="1smm:w-[30%] mr-8 pb-5 1smm:pb-0 w-full flex flex-col border-b 1smm:border-none border-grey-dim justify-between  h-full">
          <span className="w-full font-medium block"> Safety & property</span>
          <span className="w-full font-light block">
            No carbon monoxide alarm
          </span>
          <span className="w-full font-light block">No smoke alarm </span>
          <span className="w-full font-light block">
            Exterior security cameras on property
          </span>
        </div>
        <div className="1smm:w-[35%] w-full pb-5 1smm:pb-0 flex gap-y-2 flex-col  justify-between  h-full">
          <span className="w-full font-medium block"> Cancellation policy</span>
          <span className="w-full font-light block">
            Free cancellation for 48 hours. Cancel before 25 Dec for a partial
            refund.
          </span>
          <span className="w-full font-light block">
            Review this Host’s full policy for details.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Insights;
