import React from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-5xl text-center  futura-font">Sign Up</h1>
      <form className="flex flex-col gap-4 p-6">
        <input
        id="username"
          type="text"
          placeholder="enter your name..."
          className="bg-transparent border p-3 focus:outline-none focus:rounded-2xl transition-all focus:border-slate-500 duration-700 rounded-lg"
        />
        <input
        id="email"
          type="email"
          placeholder="enter your email..."
          className="bg-transparent border p-3 focus:outline-none focus:rounded-2xl transition-all focus:border-slate-500 duration-700 rounded-lg"
        />
        <input
        id="password"
          type="password"
          placeholder="enter password..."
          className="bg-transparent border p-3 focus:outline-none focus:rounded-2xl transition-all focus:border-slate-500 duration-700 rounded-lg"
        />
        <button  type="submit" className="bg-slate-700 rounded-lg text-white uppercase hover:opacity-95 p-3 disabled:opacity-80 transition-all duration-500 ">sign up</button>
        <div className="flex gap-2 mt-5">
          <p>Have an Acount?</p>
          <Link to={"/sign-in"}>
          <span className="text-blue-600 hover:text-blue-700 uppercase futura-font">sign in</span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
