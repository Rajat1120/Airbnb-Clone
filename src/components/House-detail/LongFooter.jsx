import faceBook from "../../asset/Icons_svg/faceBookIcon.svg";
import twitter from "../../asset/Icons_svg/twitter.svg";
import Instagram from "../../asset/Icons_svg/Insta.svg";
import globe from "../../asset/globe.svg";
import arrowRight from "../../asset/Icons_svg/arrow-right.svg";

import React from "react";
import { useLocation } from "react-router";

// Constants
const SOCIAL_ICONS = {
  facebook: faceBook,
  twitter: twitter,
  instagram: Instagram,
};

const SUPPORT_LINKS = [
  "Help Center",
  "AirCover",
  "Anti-discrimination",
  "Disability support",
  "Cancellation options",
  "Report neighbourhood concern",
];

const HOSTING_LINKS = [
  "Airbnb your home",
  "AirCover for Hosts",
  "Hosting resources",
  "Community forum",
  "Hosting responsibly",
  "Join a free Hosting class",
];

const AIRBNB_LINKS = [
  "Newsroom",
  "New features",
  "Careers",
  "Investors",
  "Airbnb.org emergency stays",
];

// Custom Hook
const useFooterVisibility = () => {
  const location = useLocation();
  return {
    isProfilePage: location.pathname.includes("account-settings"),
    isHouseDetailPage: location.pathname.includes("house"),
  };
};

// Subcomponents
const Breadcrumb = () => (
  <div className="py-8 items-center gap-x-1 flex">
    {["Airbnb", "United states", "California", "Los Angeles"].map(
      (item, index) => (
        <React.Fragment key={item}>
          <span className="text-sm font-light">{item}</span>
          {index < 3 && (
            <img className="h-4 w-4" src={arrowRight} alt="arrow" />
          )}
        </React.Fragment>
      )
    )}
  </div>
);

const LinkColumn = ({ title, links }) => (
  <div className="py-12 flex flex-col gap-y-4">
    <span className="block font-medium text-sm">{title}</span>
    {links.map((link) => (
      <span key={link} className="block text-sm font-light">
        {link}
      </span>
    ))}
  </div>
);

const FooterBottom = () => (
  <div className="h-full py-6 flex gap-y-2 1md:gap-y-0 flex-col 1md:flex-row justify-center 1md:justify-between items-center w-full">
    <div className="items-center flex flex-col 1xs:flex-row gap-x-3 h-full">
      <span className="text-sm pb-2 1xs:pb-0 text-nowrap font-light">
        © 2024 Airbnb, Inc.
      </span>
      <span className="hidden 1xs:flex items-center justify-center">
        <span className="w-[2px] h-[2px] bg-current rounded-full" />
      </span>
      <div className="flex items-center gap-x-2">
        {["Privacy", "terms", "Sitemap", "Company details"].map(
          (item, index) => (
            <React.Fragment key={item}>
              <span className="text-sm font-light">{item}</span>
              {index < 3 && (
                <span className="flex items-center justify-center">
                  <span className="w-[2px] h-[2px] bg-current rounded-full" />
                </span>
              )}
            </React.Fragment>
          )
        )}
      </div>
    </div>
    <div className="w-10rem items-center flex gap-x-3 h-full">
      <div className="flex gap-x-2">
        <img src={globe} className="h-5 w-5" alt="globe" />
        <span className="text-sm">English (IN)</span>
      </div>
      <div>
        <span className="text-sm"> $ Dollar</span>
      </div>
      <div className="flex gap-x-4">
        {Object.entries(SOCIAL_ICONS).map(([platform, src]) => (
          <img
            key={platform}
            src={src}
            className="h-[18px] w-[18px]"
            alt={platform}
          />
        ))}
      </div>
    </div>
  </div>
);

// Main Component
const LongFooter = () => {
  const { isProfilePage, isHouseDetailPage } = useFooterVisibility();

  return (
    <footer
      className={`w-full ${
        isHouseDetailPage ? "" : "hidden"
      } 1xz:inline-grid h-full border-t border-t-grey-dim`}
    >
      <div
        className={`1lg:px-20 border-y-[1px] ${
          isProfilePage || isHouseDetailPage ? "hidden" : ""
        } border-y-grey-dim h-[5.25rem]`}
      >
        <div className="mx-20 h-full">
          <Breadcrumb />
        </div>
      </div>

      <div className="h-full 1lg:px-20">
        <div className="1xz:mx-20 mx-5 h-full">
          <div className="w-full h-full 1md:grid 1md:grid-cols-3 flex flex-col relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-grey-dim">
            <LinkColumn title="Support" links={SUPPORT_LINKS} />
            <div className="border-y border-grey-dim 1md:border-y-0">
              <LinkColumn title="Hosting" links={HOSTING_LINKS} />
            </div>
            <LinkColumn title="Airbnb" links={AIRBNB_LINKS} />
          </div>
        </div>
      </div>

      <div className="1lg:px-20 w-full">
        <div className="1xz:mx-20 mx-5 h-full">
          <FooterBottom />
        </div>
      </div>
    </footer>
  );
};

export default LongFooter;
