import React from "react";

const Insights = () => {
  return (
    <div className="w-full flex flex-col h-[16.62rem] py-12 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px]  after:bg-grey-dim">
      <span className="text-2xl block pb-6 font-medium">Things to know</span>
      <div className="w-full flex h-full">
        <div className="w-[30%] mr-8 flex flex-col justify-between  h-full">
          <span className="w-full font-medium block">House rules</span>
          <span className="w-full font-light block">
            Check-in: 2:00 pm – 9:00 pm
          </span>
          <span className="w-full font-light block">10 guests maximum </span>
          <span className="w-full font-light block">
            Checkout before 12:00 pm
          </span>
        </div>
        <div className="w-[30%] mr-8 flex flex-col justify-between  h-full">
          <span className="w-full font-medium block"> Safety & property</span>
          <span className="w-full font-light block">
            No carbon monoxide alarm
          </span>
          <span className="w-full font-light block">No smoke alarm </span>
          <span className="w-full font-light block">
            Exterior security cameras on property
          </span>
        </div>
        <div className="w-[35%]  flex gap-y-2 flex-col justify-between  h-full">
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
