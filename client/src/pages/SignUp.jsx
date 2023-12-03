import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { useSnackbar } from "notistack";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
      setLoading(true);
      const res = await fetch("/api/v1/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        enqueueSnackbar(data.message, { variant: "error" });
        return;
      }
      setLoading(false);
      enqueueSnackbar("User Created Successfully", { variant: "success" });
      setError(null);
      setFormData("");
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(error.message);
      enqueueSnackbar("Enter the fields", { variant: "error" });
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-5xl text-center  futura-font">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6">
        <input
          id="username"
          type="text"
          placeholder="enter your name..."
          className="bg-transparent border p-3 focus:outline-none focus:rounded-2xl transition-all focus:border-slate-500 duration-700 rounded-lg"
          onChange={handleChange}
        />
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
          {loading ? <Loader /> : "  sign up"}
        </button>
        <div className="flex gap-2 mt-5">
          <p>Have an Acount?</p>
          <Link to={"/sign-in"}>
            <span className="text-blue-600 hover:text-blue-700 uppercase futura-font">
              sign in
            </span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
