import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth";

import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/v1/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        enqueueSnackbar(data.message, { variant: "error" });
        return;
      }
      dispatch(signInSuccess(data));
      enqueueSnackbar("Logged In Successfully", { variant: "success" });
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
      enqueueSnackbar("Enter the fields", { variant: "error" });
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-5xl text-center  futura-font">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6">
        <input
          id="email"
          type="email"
          placeholder="enter your email..."
          className="bg-transparent border p-3 focus:outline-none focus:rounded-2xl transition-all focus:border-slate-500 duration-700 rounded-lg"
          onChange={handleChange}
        />
        <input
          id="password"
          type="password"
          placeholder="enter password..."
          className="bg-transparent border p-3 focus:outline-none focus:rounded-2xl transition-all focus:border-slate-500 duration-700 rounded-lg"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 rounded-lg text-white uppercase hover:opacity-95 p-3 disabled:opacity-80 transition-all duration-500 "
        >
          {loading ? <Loader /> : "  sign in"}
        </button>
        <OAuth />
        <div className="flex gap-2 mt-5">
          <p>Dont have an Acount?</p>
          <Link to={"/sign-up"}>
            <span className="text-blue-600 hover:text-blue-700 uppercase futura-font">
              sign up
            </span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
