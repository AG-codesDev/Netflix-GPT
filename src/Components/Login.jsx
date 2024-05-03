import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../Utils/Validate";
import { auth } from "../Utils/Firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../Utils/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const [isItSignIn, setIsItSignIn] = useState(true);
  const [validationMessage, setValidationMessage] = useState("");
  const dispatch = useDispatch();

  const toggleSignInForm = () => {
    setIsItSignIn(!isItSignIn);
  };

  const emailElement = useRef(null);
  const passWordElement = useRef();
  const nameElement = useRef();

  const handleSignInSignUpBtn = () => {
    const validateMessage = checkValidData(
      emailElement.current.value,
      passWordElement.current.value
    );
    setValidationMessage(validateMessage);
    if (validateMessage) return;

    if (!isItSignIn) {
      //SIGNUP LOGIC
      createUserWithEmailAndPassword(
        auth,
        emailElement.current.value,
        passWordElement.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          // console.log(user);
          updateProfile(user, {
            // UPDATING THE PROFILE WITH NAME ONCE THE USER SIGNS-UP
            displayName: nameElement.current.value,
          })
            .then(() => {
              // PROFILE UPDATED
              const { uid, email, displayName } = auth.currentUser; // NOW UPDATING THE REDUX STORE WITH NAME OF USER
              dispatch(
                addUser({ id: uid.id, email: email, displayName: displayName })
              );
            })
            .catch((error) => {
              // An error occurred
              // ...
            });
          navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setValidationMessage(errorMessage);
        });
    }
    if (isItSignIn) {
      //SIGN-IN LOGIC

      signInWithEmailAndPassword(
        auth,
        emailElement.current.value,
        passWordElement.current.value
      )
        .then((userCredential) => {
          // Signed IN
          const user = userCredential.user;
          // console.log(user);
          navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // console.log(errorCode);
          if (errorCode === "auth/invalid-credential") {
            setValidationMessage("Incorrect Email or PassWord!");
          }
        });
    }
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
      <form
        className="signUp-singIn-form px-8 py-12 flex gap-6 flex-col w-[90%] md:w-[23rem] bg-black absolute top-36 text-white opacity-95  "
        onSubmit={(e) => e.preventDefault()}
      >
        <h2 className="font-bold text-2xl mb-2">
          {isItSignIn ? "Sign In" : "Sign Up"}
        </h2>
        {!isItSignIn && (
          <input
            type="text"
            name=""
            id="name"
            placeholder="Enter Full Name"
            className="bg-gray-700 px-3 text-white py-4 font-semibold rounded-md"
            ref={nameElement}
          />
        )}
        <input
          type="email"
          name=""
          id="email"
          placeholder="Enter Email"
          className="bg-gray-700 px-3 py-4  text-white font-semibold rounded-md"
          ref={emailElement}
        />
        <input
          type="password"
          name=""
          id="pass"
          placeholder="Enter Password"
          className="bg-gray-700 px-3 py-4  font-semibold rounded-md"
          ref={passWordElement}
        />

        <p className="text-red-600 font-medium">{validationMessage}</p>
        {/* <p className="successMessage"></p> */}

        <button
          className="bg-red-600 p-2 w-full rounded-md"
          onClick={handleSignInSignUpBtn}
        >
          {isItSignIn ? "Sign In" : "Sign Up"}
        </button>
        <p className="my-2 cursor-pointer" onClick={toggleSignInForm}>
          {isItSignIn
            ? "New to Netflix? Sign up now."
            : "Already a user? Sign In Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
