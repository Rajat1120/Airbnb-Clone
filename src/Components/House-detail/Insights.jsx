import React from "react";

// Sub-component for rendering each section in "Things to know"
const Section = ({ title, items }) => {
  return (
    <div className="1smm:w-[30%] mr-8 pb-5 1smm:pb-0 w-full flex flex-col border-b 1smm:border-none border-grey-dim justify-between h-full">
      <span className="w-full font-medium block">{title}</span>
      {items.map((item, index) => (
        <span key={index} className="w-full font-light block">
          {item}
        </span>
      ))}
    </div>
  );
};

// Data for each section
const houseRules = [
  "Check-in: 2:00 pm – 9:00 pm",
  "10 guests maximum",
  "Checkout before 12:00 pm",
];

const safetyProperty = [
  "No carbon monoxide alarm",
  "No smoke alarm",
  "Exterior security cameras on property",
];

const cancellationPolicy = [
  "Free cancellation for 48 hours. Cancel before 25 Dec for a partial refund.",
  "Review this Host’s full policy for details.",
];

const Insights = () => {
  return (
    <div className="w-full px-5 1smm:px-0 flex flex-col py-12">
      <span className="text-2xl block pb-6 font-medium">Things to know</span>
      <div className="w-full 1smm:flex-row flex-col flex gap-y-5 h-full">
        {/* Using the Section component for each part */}
        <Section title="House rules" items={houseRules} />
        <Section title="Safety & property" items={safetyProperty} />
        <Section title="Cancellation policy" items={cancellationPolicy} />
      </div>
    </div>
  );
};

export default Insights;
