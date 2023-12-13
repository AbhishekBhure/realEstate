import "./Header.css";
import { useEffect, useState } from "react";
import gsap from "gsap";
import { FaSearch } from "../icons";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    gsap.to(".logo", { opacity: 1, duration: 1, delay: 0.5 });
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <header className="bg-slate-200 shadow-md  z-40 w-full">
      <div className="flex justify-between p-3 items-center max-w-6xl mx-auto">
        <Link to="/">
          <h1 className="futura-font font-bold text-sm sm:text-3xl flex flex-wrap  logo">
            <span className="text-slate-500">Snap</span>
            <span className="text-slate-700">Space</span>
          </h1>
        </Link>

        <form
          onSubmit={handleSubmit}
          className="bg-slate-100 p-3 rounded-full flex items-center border border-transparent focus-within:border-slate-500 transition-border duration-300"
        >
          <button>
            <FaSearch className="text-slate-600 mr-2" />
          </button>
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
        <ul className="flex gap-4 justify-center items-center">
          <Link to="/">
            <li className="hidden sm:inline text-slate-700 ">Home</li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-slate-700 ">About</li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <>
                <img
                  src={currentUser.avatar}
                  title={currentUser.username}
                  alt="profile"
                  className="w-[38px] h-[38px] rounded-full object-cover"
                />
              </>
            ) : (
              <>
                <li className=" text-slate-700 ">SignIn</li>
              </>
            )}
          </Link>
        </ul>
      </div>
      <div></div>
      <div></div>
    </header>
  );
};

export default Header;
