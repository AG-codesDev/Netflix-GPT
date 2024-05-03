import { FaRegUserCircle } from "react-icons/fa";
import { FaPowerOff } from "react-icons/fa";
import { useSelector } from "react-redux";
import { signOut, getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  // console.log(user);
  const handleSignOut = () => {
    // SIGNOUT LOGIC
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // SIGNED OUT
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };
  return (
    <div className="absolute top-0 w-full flex justify-between left-0 bg-gradient-to-b from-black px-4">
      <div className="logo">
        <img
          src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
          alt=""
          className="netflixlogo w-40 h-20"
        />
      </div>
      {user && (
        <div className="text-white items-center  gap-3 flex">
          <div className=" flex flex-col gap-2 items-center">
            <FaRegUserCircle className="text-3xl" />
            <span>{user.displayName}</span>
          </div>
          <div>
            <FaPowerOff
              className="text-2xl cursor-pointer"
              onClick={handleSignOut}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
