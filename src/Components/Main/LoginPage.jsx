import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import LongFooter from "../House-detail/LongFooter";
import Header from "../Header/Header";
import person from "../../asset/Icons_svg/Person.svg";
import google from "../../asset/Icons_svg/Google.svg";
import MobileFooter from "../Footer/MobileFooter";
import { loginWithEmail, signInWithGoogle } from "../../api/apiAuthentication";

// Custom hook for authentication logic
const useAuthentication = () => {
  const [signIn, setSignIn] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const userData = useSelector((store) => store.app.userData);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (email && password && signIn) {
      loginWithEmail(email, password);
    }
  }, [email, signIn, password]);

  React.useEffect(() => {
    if (userData) navigate("/");
  }, [userData, navigate]);

  return {
    signIn,
    setSignIn,
    password,
    setPassword,
    email,
    setEmail,
  };
};

// Input Field Component
const InputField = ({
  id,
  label,
  value,
  onChange,
  isActive,
  onFocus,
  onBlur,
  isFirst,
}) => (
  <div className="relative">
    <label
      htmlFor={id}
      className={`w-full absolute text-grey font-light ${
        isActive || value ? "text-xs top-1" : "top-1/2 -translate-y-3"
      } transition-all duration-[0.1s] left-2`}
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
      className={`w-full p-2 focus:border-2 focus:rounded-lg focus:border-black flex items-center border-grey-light-50 h-14 ${
        isFirst ? "rounded-t-lg" : "rounded-b-lg"
      } outline-none`}
    />
  </div>
);

// AuthForm component
const AuthForm = ({ auth, activeInput, setActiveInput }) => {
  const [showLine, setShowLine] = useState(true);

  return (
    <form>
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
            value={auth.email}
            onChange={(e) => auth.setEmail(e.target.value)}
            isActive={activeInput === "email"}
            onFocus={() => {
              setShowLine(false);
              setActiveInput("email");
            }}
            onBlur={() => {
              setShowLine(true);
              setActiveInput("");
            }}
            isFirst={true}
          />
          <div
            className={`w-full h-[1px] ${
              showLine ? "bg-grey-light" : "bg-white"
            }`}
          />
          <InputField
            id="password"
            label="Password"
            value={auth.password}
            onChange={(e) => auth.setPassword(e.target.value)}
            isActive={activeInput === "password"}
            onFocus={() => {
              setShowLine(false);
              setActiveInput("password");
            }}
            onBlur={() => {
              setShowLine(true);
              setActiveInput("");
            }}
            isFirst={false}
          />
        </div>
      </div>
    </form>
  );
};

// Auth Buttons Component
const AuthButtons = ({ auth }) => (
  <div>
    <button
      onClick={() => auth.setSignIn(true)}
      className="w-full h-12 mt-2 rounded-lg text-white btnColor"
    >
      Continue
    </button>
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
      onClick={() => {
        auth.setEmail("rajat@airbnb.com");
        auth.setPassword("guestuser");
        auth.setSignIn(true);
      }}
      className="w-full text-center cursor-pointer mt-2 h-14 border px-5 py-5 border-black rounded-lg flex items-center justify-between"
    >
      <img src={person} className="h-5 w-5" alt="" />
      <span>Sign in as a Guest user</span>
      <div className="px-2" />
    </button>
  </div>
);

// SignIn component
const LoginPage = () => {
  const [activeInput, setActiveInput] = useState("");
  const auth = useAuthentication();

  return (
    <div className="w-full">
      <div
        id="header"
        className="z-50 bg-white w-full hidden 1xz:flex items-start justify-center"
      >
        <Header />
      </div>

      <div className="my-0 1xz:my-20 w-full flex-center">
        <div
          id="calendar"
          className="bg-white w-full 1xz:w-auto transition-all border-0 1xz:border border-grey-light-50 rounded-xl duration-[0.2s] flex flex-col ease-in-out items-center justify-center z-50"
        >
          <div className="items-center border-b-[1px] border-grey-light-50 justify-center flex 1xz:w-[35.5rem] w-full h-[3.9rem] px-6">
            <span className="font-semibold">Log in or sign up</span>
          </div>
          <div className="1xz:w-[35.5rem] w-[calc(100%-5rem)] 1xz:p-6">
            <div>
              <div className="mt-2 mb-6 text-2xl font-medium">
                Welcome to Airbnb
              </div>
              <AuthForm
                auth={auth}
                activeInput={activeInput}
                setActiveInput={setActiveInput}
              />
              <AuthButtons auth={auth} />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full 1xz:hidden">
        <MobileFooter />
      </div>
      <div className="w-full 1xz:block hidden">
        <LongFooter />
      </div>
    </div>
  );
};

export default LoginPage;
