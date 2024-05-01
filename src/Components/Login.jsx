import { useState } from "react";
import Header from "./Header";

const Login = () => {
  // const [formHeading, setFormHeading] = useState("");
  const [isItSignIn, setIsItSignIn] = useState(true);

  const toggleSignInForm = () => {
    // setFormHeading("Sign Up");
    setIsItSignIn(!isItSignIn);
  };

  return (
    <div className="flex justify-center">
      <Header />
      <div className="bg-image">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/9f46b569-aff7-4975-9b8e-3212e4637f16/453ba2a1-6138-4e3c-9a06-b66f9a2832e4/IN-en-20240415-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt=""
          className="h-screen w-screen"
        />
      </div>
      <form className="signUp-singIn-form px-8 py-12 flex gap-6 flex-col w-[90%] md:w-[23rem] bg-black opacity-95 absolute top-36 text-white">
        <h2 className="font-bold text-3xl">
          {isItSignIn ? "Sign In" : "Sign Up"}
        </h2>
        {!isItSignIn && (
          <input
            type="text"
            name=""
            id=""
            placeholder="Enter Full Name"
            className="bg-black opacity-70 px-3 py-4 border-2 border-white text-white font-semibold rounded-md"
          />
        )}
        <input
          type="email"
          name=""
          id=""
          placeholder="Email or phone number"
          className="bg-black opacity-70 px-3 py-4 border-2 border-white text-white font-semibold rounded-md"
        />
        <input
          type="password"
          name=""
          id=""
          placeholder="Password"
          className="bg-black opacity-70 px-3 py-4 border-2 border-white font-semibold rounded-md"
        />
        <button className="bg-red-600 p-2 w-full rounded-md">
          {isItSignIn ? "Sign In" : "Sign Up"}
        </button>
        <p className="my-2" onClick={toggleSignInForm}>
          {isItSignIn
            ? "New to Netflix? Sign up now."
            : "Already a user? Sign In Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
