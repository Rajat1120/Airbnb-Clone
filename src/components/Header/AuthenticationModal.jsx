import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import cross from "../../asset/Icons_svg/cross.svg";
import google from "../../asset/Icons_svg/Google.svg";
import person from "../../asset/Icons_svg/Person.svg";
import { useDispatch, useSelector } from "react-redux";
import { setShowLogin } from "../../redux/AppSlice";
import { loginWithEmail, signInWithGoogle } from "../../api/apiAuthentication";

// Custom hook to handle modal visibility transitions
const useModalTransition = (isOpen) => {
  const [visible, setVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setTimeout(() => setVisible(true), 50);
    } else {
      setVisible(false);
      setTimeout(() => setShouldRender(false), 0);
    }
  }, [isOpen]);

  return { visible, shouldRender };
};

// Custom hook to handle body scroll lock
const useScrollLock = (isOpen) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);
};

// Custom hook to handle click outside modal
const useClickOutside = (ref, handler) => {
  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        handler();
      }
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [ref, handler]);
};

// Input field component
const InputField = ({
  id,
  label,
  value,
  onChange,
  isActive,
  onFocus,
  onBlur,
}) => (
  <div className="relative">
    <label
      htmlFor={id}
      className={`w-full absolute text-grey font-light left-2 transition-all duration-[0.1s] ${
        isActive || value ? "text-xs top-1" : "top-1/2 -translate-y-3"
      }`}
    >
      {label}
    </label>
    <input
      type="text"
      id={id}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      className={`w-full p-2 focus:border-2 flex items-center border-grey-light-50 h-14 focus:rounded-lg focus:border-black outline-none ${
        id === "email" ? "rounded-t-lg" : "rounded-b-lg"
      }`}
    />
  </div>
);

// Login form component
const LoginForm = ({ onSubmit, onGuestLogin }) => {
  const [showLine, setShowLine] = useState(true);
  const [activeInput, setActiveInput] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <div className="w-full p-6">
      <div className="mt-2 mb-6 text-2xl font-medium">Welcome to Airbnb</div>
      <form onSubmit={handleSubmit}>
        <div className="pt-4">
          <div
            className={`rounded-lg ${showLine ? "border" : ""} ${
              activeInput === "email" ? "border-b border-l border-r" : ""
            } ${
              activeInput === "password" ? "border-t border-l border-r" : ""
            } border-grey-light`}
          >
            <InputField
              id="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isActive={activeInput === "email"}
              onFocus={() => {
                setShowLine(false);
                setActiveInput("email");
              }}
              onBlur={() => {
                setShowLine(true);
                setActiveInput("");
              }}
            />
            <div
              className={`w-full h-[1px] ${
                showLine ? "bg-grey-light" : "bg-white"
              }`}
            />
            <InputField
              id="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isActive={activeInput === "password"}
              onFocus={() => {
                setShowLine(false);
                setActiveInput("password");
              }}
              onBlur={() => {
                setShowLine(true);
                setActiveInput("");
              }}
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full h-12 mt-2 rounded-lg text-white btnColor"
        >
          Continue
        </button>
      </form>
      <div className="py-5 flex items-center">
        <div className="h-[1px] w-full bg-grey-light" />
        <span className="w-20 text-center text-xs">or</span>
        <div className="h-[1px] w-full bg-grey-light" />
      </div>
      <button
        onClick={signInWithGoogle}
        className="w-full cursor-pointer h-14 border px-5 py-5 border-black rounded-lg flex items-center justify-between"
      >
        <img src={google} className="h-5 w-5" alt="" />
        <span className="text-sm font-medium">Continue with Google</span>
        <div className="px-2" />
      </button>
      <button
        onClick={onGuestLogin}
        className="w-full text-center cursor-pointer mt-2 h-14 border px-5 py-5 border-black rounded-lg flex items-center justify-between"
      >
        <img src={person} className="h-5 w-5" alt="" />
        <span>Sign in as a Guest user</span>
        <div className="px-2" />
      </button>
    </div>
  );
};

const AuthenticationModal = () => {
  const ref = useRef();
  const dispatch = useDispatch();
  const isOpen = useSelector((store) => store.app.showLogin);

  const { visible, shouldRender } = useModalTransition(isOpen);
  useScrollLock(isOpen);
  useClickOutside(ref, () => dispatch(setShowLogin(false)));

  const handleLogin = (email, password) => {
    loginWithEmail(email, password);
    dispatch(setShowLogin(false));
  };

  const handleGuestLogin = () => {
    handleLogin("rajat@airbnb.com", "guestuser");
  };

  if (!shouldRender) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        ref={ref}
        className={`bg-white ${
          visible
            ? "1xz:translate-y-0 bottom-0 1xz:bottom-auto opacity-100"
            : "1xz:translate-y-16 translate-y-full opacity-0"
        } transition-all fixed 1xz:w-[35.5rem] w-full rounded-xl 1xz:duration-[0.2s] duration-300 flex flex-col ease-out items-center justify-center shadow-md z-50`}
      >
        <div className="items-center border-b-[1px] border-grey-light-50 justify-between flex 1xz:w-[35.5rem] w-full px-6 h-[3.9rem]">
          <button
            onClick={() => dispatch(setShowLogin(false))}
            className="w-6 h-6 flex items-center justify-center cursor-pointer hover:rounded-full hover:bg-grey-dim"
          >
            <img src={cross} className="h-4 w-4" alt="" />
          </button>
          <span className="font-semibold">Log in or sign up</span>
          <div className="px-4" />
        </div>
        <LoginForm onSubmit={handleLogin} onGuestLogin={handleGuestLogin} />
      </div>
    </div>,
    document.body
  );
};

export default AuthenticationModal;
