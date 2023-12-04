import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { google } from "../icons";
import { enqueueSnackbar } from "notistack";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleAuth = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      const res = await fetch("/api/v1/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = res.json();
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      enqueueSnackbar("Could not Sign in with gogle", error);
    }
  };
  return (
    <button
      onClick={handleGoogleAuth}
      type="button"
      className="bg-white text-black p-1 rounded-lg uppercase flex items-center justify-center gap-2"
    >
      Continue with <img src={google} alt="google" className="w-[40px]" />
    </button>
  );
};

export default OAuth;
