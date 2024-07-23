import { FaSkull } from "react-icons/fa6";
import { Context } from "../context/context.jsx";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { MdOutlineLogin } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

const Header = () => {
  const { login, setlogin, isLoggedIn, update, updateLogin } =
    useContext(Context);

  const handleClick = () => {
    updateLogin(false);
  };

  const scrollToDevelopers = () => {
    const element = document.getElementById("developers");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 w-full text-white bg-black p-2 z-10 shadow-md">
      <div className="flex justify-between">
        <Link to="/" onClick={handleClick}>
          <div className="flex text-4xl">
            <h1 className="m-4">VerifEye</h1>
            <div className="mt-5">
              <FaSkull />
            </div>
          </div>
        </Link>
        <nav className="flex space-x-4 text-2xl">
          {isLoggedIn ? (
            <>
              <CgProfile className="flex mt-5 text-4xl" />
            </>
          ) : login ? (
            <>
              <MdOutlineLogin className="flex mt-5" />
              <Link
                to="/"
                className="m-3 hover:text-blue-500"
                onClick={handleClick}
              >
                Home
              </Link>
            </>
          ) : (
            <button
              onClick={scrollToDevelopers}
              className="m-3 hover:text-blue-500"
            >
              Developers
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
