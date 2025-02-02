import personalInfo from "./Asset/ProfilePageSvg/Profile.svg";
import loginSecurity from "./Asset/ProfilePageSvg/login.svg";
import paymentPayout from "./Asset/ProfilePageSvg/payments.svg";
import taxes from "./Asset/ProfilePageSvg/taxes.svg";
import notifications from "./Asset/ProfilePageSvg/notification.svg";
import pricingSharing from "./Asset/ProfilePageSvg/privacy.svg";
import globalPreferences from "./Asset/ProfilePageSvg/globalprefrences.svg";
import travelForWork from "./Asset/ProfilePageSvg/travel.svg";
import professionalHostingTools from "./Asset/ProfilePageSvg/tools.svg";
import referralCreditCoupons from "./Asset/ProfilePageSvg/coupns.svg";

let profilePageData = [
  {
    svg: personalInfo,
    title1: "Personal info",
    title2: "Provide personal details and how we can reach you",
  },
  {
    svg: loginSecurity,
    title1: "Login & Security",
    title2: "Update your password and secure your account",
  },
  {
    svg: paymentPayout,
    title1: "Payments & payouts",
    title2: "Review payments,payouts,coupons and gift cards",
  },
  {
    svg: taxes,
    title1: "Taxes",
    title2: "Manage taxpayer information and tax documents",
  },
  {
    svg: notifications,
    title1: "Notifications",
    title2: "choose notification preferences and how you want to be contacted",
  },
  {
    svg: pricingSharing,
    title1: "Privacy & sharing",
    title2:
      "Manage your personal data, connected services and data sharing settings",
  },
  {
    svg: globalPreferences,
    title1: "Global preferences",
    title2: "Set you default language,currency, and timezone",
  },
  {
    svg: travelForWork,
    title1: "Travel for work",
    title2: "Add a work email for business trips benefits",
  },
  {
    svg: professionalHostingTools,
    title1: "Professional hosting tools",
    title2: "Get professional tools if you manage several properties on Airbnb",
  },
  {
    svg: referralCreditCoupons,
    title1: "Referral credit & coupons",
    title2: "Your referral credit and coupon balance is $0. Learn more",
  },
];

export default profilePageData;
