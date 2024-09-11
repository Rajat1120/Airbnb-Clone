import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import cross from "../data/Icons svg/cross.svg";
import google from "../data/Icons svg/Google.svg";
import { useDispatch, useSelector } from "react-redux";
import { setShowLogin } from "../Main/AppSlice";
import {
  loginWithEmail,
  signInWithGoogle,
} from "../Services/apiAuthentication";

const AuthenticationModal = () => {
  const [visible, setVisible] = useState(false);
  const [showLine, setShowLine] = useState(true);
  const [activeInput, setActiveInput] = useState("");
  const [shouldRender, setShouldRender] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const ref = useRef();
  const dispatch = useDispatch();
  const isOpen = useSelector((store) => store.app.showLogin);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setTimeout(() => {
        setVisible(true);
      }, 50); // Small delay to ensure transition is noticeable
    } else {
      setVisible(false);
      setTimeout(() => {
        setShouldRender(false);
      }, 0);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset"; // Cleanup on component unmount
    };
  }, [isOpen]);

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        dispatch(setShowLogin(false));
      }
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [dispatch]);

  if (!shouldRender) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        id="calendar"
        ref={ref}
        className={`bg-white ${
          visible
            ? " 1xz:translate-y-0 bottom-0 1xz:bottom-auto opacity-100"
            : "1xz:translate-y-16 translate-y-full opacity-0"
        } transition-all fixed 1xz:w-[35.5rem]   w-full rounded-xl 1xz:duration-[0.2s]  duration-300 flex flex-col ease-out items-center justify-center shadow-md z-50`}
      >
        <div className=" items-center  border-b-[1px] border-grey-light-50  justify-between flex 1xz:w-[35.5rem] w-full px-6   h-[3.9rem]  ">
          <button
            onClick={() => dispatch(setShowLogin(false))}
            className="w-6 h-6 flex items-center justify-center cursor-pointer hover:rounded-full hover:bg-grey-dim"
          >
            <img src={cross} className="h-4 w-4" alt="" />
          </button>
          <span className="font-semibold ">Log in or sign up</span>
          <div className="px-4"></div>
        </div>
        <div className="w-full">
          <div className="w-full p-6">
            <div className="mt-2 mb-6 text-2xl font-medium ">
              Welcome to Airbnb
            </div>
            <form action="">
              <div className="pt-4">
                <div
                  className={` rounded-lg ${showLine ? "border" : ""} ${
                    activeInput === "email" ? "border-b border-l border-r" : ""
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
            <button
              onClick={() => loginWithEmail(email, password)}
              className="w-full h-12 mt-2 rounded-lg text-white btnColor "
            >
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
              <span className="text-sm font-medium">Continue with Google</span>
              <div className="px-2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default AuthenticationModal;
