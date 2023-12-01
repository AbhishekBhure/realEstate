import "./Header.css";
import { useEffect } from "react";
import gsap from "gsap";
import { FaSearch } from "../icons";
import { Link } from "react-router-dom";

const Header = () => {
  useEffect(() => {
    gsap.to(".logo", { opacity: 1, duration: 1, delay: 0.5 });
  }, []);

  return (
    <header className="bg-slate-200 shadow-md fixed z-40 w-full">
      <div className="flex justify-between p-3 items-center max-w-6xl mx-auto">
        <Link to="/">
          <h1 className="futura-font font-bold text-sm sm:text-3xl flex flex-wrap  logo">
            <span className="text-slate-500">Snap</span>
            <span className="text-slate-700">Space</span>
          </h1>
        </Link>

        <form className="bg-slate-100 p-3 rounded-full flex items-center border border-transparent focus-within:border-slate-500 transition-border duration-300">
          <FaSearch className="text-slate-600 mr-2" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
        </form>
        <ul className="flex gap-4">
          <li className="hidden sm:inline text-slate-700 ">
            <Link to="/">Home</Link>
          </li>
          <li className="hidden sm:inline text-slate-700 ">
            <Link to="/about">About</Link>
          </li>
          <li className="hidden sm:inline text-slate-700 ">
            <Link to="sign-in">SignIn</Link>
          </li>
        </ul>
      </div>
      <div></div>
      <div></div>
    </header>
  );
};

export default Header;
