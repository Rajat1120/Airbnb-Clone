import React from "react";
import star from "../../asset/Icons_svg/star.svg";

let imgs = [
  "https://a0.muscache.com/im/pictures/user/e64ff105-0336-4db5-9ea3-f2e35546739c.jpg?im_w=240",
  "https://a0.muscache.com/im/pictures/user/User-400490834/original/1fc48bc8-fc12-46de-b23f-93604aac6f88.jpeg?im_w=240",
  "https://a0.muscache.com/im/pictures/user/User-578710127/original/b719dbd4-2c6d-4d4c-b952-e8ac371504dc.jpeg?im_w=240",
  "https://a0.muscache.com/im/pictures/user/User-577946470/original/8c3fad94-f644-4bac-85db-20000f9b0c31.jpeg?im_w=240",
];

let reviews = [
  "What a great place for a private retreat! Yes, it is away from the busy Phuket areas but if your purpose is to recharge and unwind, this is the perfect place for you. Not to mention, the gorgeous overlook of the stunning bay of Phang Nga will make your stay unforgettable.",
  "The Villa was beautiful and had such an amazing view. The host was super friendly and accommodating and even went out and about his way to assist and help us in certain enquiries.",
  "I’ve stayed here for three times. If you’re an extrovert this is heaven for you. The people here are so helpful and you can count on making new friends here!",
  "Great place, totally out of their control but on weekends can be a loud neighborhood so keep that in mind, not a problem that can’t be solved by a pair of ear plugs",
];

let totalCards = 4;

const ReviewCard = ({ img, review, index, totalCards }) => {
  const renderStars = () => {
    return Array.from({ length: 5 }).map((_, i) => (
      <img className="h-auto w-auto" key={i} src={star} alt="star" />
    ));
  };

  return (
    <div
      className={` ${
        index < totalCards - 2 ? "mb-10" : ""
      } mb-10 overflow-hidden 1smm:w-auto w-[calc(100vw-5rem)]   1xs:w-[calc(100vw-8rem)]   min-h-[6.62rem] 1smm:shadow-none rounded-xl mt-2 shadow-reviewShadow bg-white  p-5 1smm:p-0  h-[90%] `}
    >
      <div className="h-[4.8rem] flex flex-col justify-between mb-1">
        <div className="h-12 gap-2 flex items-center ">
          <img
            className="h-12 rounded-full object-cover w-12"
            src={img}
            alt="reviewer"
          />
          <div className="h-10 flex flex-col justify-center box-border">
            <span className="font-medium">Jonas</span>
            <span className="text-sm font-light">7 years on Airbnb</span>
          </div>
        </div>
        <div className="flex items-center">
          <div className="flex h-[10px] w-12">{renderStars()}</div>
          <span className="mx-2 flex items-center justify-center">
            <span className="w-[2px] h-[2px] bg-current rounded-full"></span>
          </span>
          <span className="text-sm">
            {Math.ceil(Math.random() * 5)} week ago
          </span>
        </div>
      </div>
      <div className="w-full h-auto overflow-scroll">
        <span className="h-full overflow-hidden">{review}</span>
      </div>
    </div>
  );
};

const CustomerReviews = ({ showReviewSection }) => {
  return (
    <div className="w-full">
      {!showReviewSection && (
        <h1 className="text-2xl font-medium pl-5 pt-2">Customer reviews</h1>
      )}
      <div
        style={{
          scrollSnapType: "x mandatory",
          scrollBehavior: "smooth",
        }}
        className={`${
          showReviewSection ? "" : "pt-3"
        } 1smm:grid flex overflow-x-auto hide-scrollbar overflow-y-hidden  px-5 1smm:px-0 gap-x-5 1smm:w-full   1smm:grid-cols-2 `}
      >
        {Array.from({ length: totalCards }).map((_, index) => (
          <div
            style={{
              scrollSnapAlign: "start",
              flexShrink: 0,
              scrollSnapStop: "always",
            }}
            key={index}
            className={`min-h-[10rem] pl-5  1smm:mr-[5.91rem] `}
          >
            <ReviewCard
              img={imgs[index]}
              review={reviews[index]}
              index={index}
              totalCards={totalCards}
            ></ReviewCard>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerReviews;
