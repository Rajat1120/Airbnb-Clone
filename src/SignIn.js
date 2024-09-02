import React, { useState } from "react";
import LongFooter from "./House-detail/LongFooter";
import Header from "./Header/Header";

import { signInWithGoogle } from "./Services/apiAuthentication";
import google from "./data/Icons svg/Google.svg";
import MobileFooter from "./MobileFooter";
const SignIn = () => {
  const [activeInput, setActiveInput] = useState("");

  const [showLine, setShowLine] = useState(true);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  return (
    <div className="w-full ">
      <div
        id="header"
        className={`  z-50 bg-white  w-full hidden 1xz:flex items-start justify-center  `}
      >
        <Header></Header>
      </div>

      <div className="my-0 1xz:my-20 w-full  flex-center">
        <div
          id="calendar"
          className={`bg-white w-full 1xz:w-auto  transition-all border-0  1xz:border border-grey-light-50 rounded-xl duration-[0.2s] flex flex-col ease-in-out items-center justify-center z-50`}
        >
          <div className=" items-center border-b-[1px]  border-grey-light-50  justify-center flex 1xz:w-[35.5rem] w-full h-[3.9rem] px-6 ">
            <span className="font-semibold ">Log in or sign up</span>
          </div>
          <div className="1xz:w-[35.5rem] w-[calc(100%-5rem)] 1xz:p-6">
            <div>
              <div className="mt-2 mb-6 text-2xl font-medium ">
                Welcome to Airbnb
              </div>
              <form action="">
                <div className="pt-4">
                  <div
                    className={` rounded-lg ${showLine ? "border" : ""} ${
                      activeInput === "email"
                        ? "border-b border-l border-r"
                        : ""
                    } ${
                      activeInput === "password"
                        ? "border-t border-l border-r"
                        : ""
                    }  border-grey-light `}
                  >
                    <div className="relative">
                      <label
                        htmlFor="email"
                        className={` w-full absolute text-grey font-light top-1/2 -translate-y-3 left-2 ${
                          activeInput === "email" || email
                            ? "text-xs top-4"
                            : "top-1/2 -translate-y-3"
                        }  transition-all duration-[0.1s]   `}
                      >
                        Email
                      </label>
                      <input
                        type="text"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => {
                          setShowLine(false);
                          setActiveInput("email");
                        }}
                        onBlur={() => {
                          setShowLine(true);
                          setActiveInput("");
                        }}
                        className=" w-full p-2  focus:border-2 focus:rounded-lg focus:border-black  flex items-center border-grey-light-50 h-14 rounded-t-lg outline-none "
                      />
                    </div>
                    <div
                      className={`w-full h-[1px] ${
                        showLine ? " bg-grey-light" : "bg-white"
                      }`}
                    ></div>
                    <div className="relative">
                      <label
                        htmlFor="password"
                        className={` w-full border-grey-light-50 absolute text-grey font-light ${
                          activeInput === "password" || password
                            ? "text-xs top-1"
                            : "top-1/2 -translate-y-3"
                        }  transition-all duration-[0.1s] left-2  h-full `}
                      >
                        Password
                      </label>
                      <input
                        type="text"
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => {
                          setShowLine(false);
                          setActiveInput("password");
                        }}
                        onBlur={() => {
                          setShowLine(true);
                          setActiveInput("");
                        }}
                        id="password"
                        className={`  w-full p-2 focus:border-2  flex items-center border-grey-light-50 h-14 focus:rounded-lg focus:border-black rounded-b-lg outline-none  `}
                      />
                    </div>
                  </div>
                </div>
              </form>
              <button className="w-full h-12 mt-2 rounded-lg text-white btnColor ">
                Continue
              </button>
              <div className="py-5 flex items-center">
                <div className="h-[1px] w-full bg-grey-light"></div>
                <span className="w-20 text-center text-xs">or</span>
                <div className="h-[1px] w-full bg-grey-light"></div>
              </div>

              <div
                onClick={() => signInWithGoogle()}
                className="w-full cursor-pointer h-14 border px-5 py-5 border-black rounded-lg flex items-center justify-between"
              >
                <img src={google} className="h-5 w-5" alt="" />
                <span className="text-sm font-medium">
                  Continue with Google
                </span>
                <div className="px-2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full  1xz:hidden">
        <MobileFooter></MobileFooter>
      </div>
      <div className="w-full 1xz:block hidden">
        <LongFooter></LongFooter>
      </div>
    </div>
  );
};
export default SignIn;
