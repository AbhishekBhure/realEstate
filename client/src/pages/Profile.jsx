import { useDispatch, useSelector } from "react-redux";
import UpdateProfile from "../components/UpdateProfile";
import { useEffect, useRef, useState } from "react";
import { useSnackbar } from "notistack";
import Loader from "../components/Loader";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from "../redux/user/userSlice";

const Profile = () => {
  const fileRef = useRef();
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [load, setLoad] = useState(false);

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePercentage(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoad(true);
      dispatch(updateUserStart);
      const res = await fetch(`/api/v1/users/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoad(false);
        dispatch(updateUserFailure(data.message));
        return;
      }
      setLoad(false);
      dispatch(updateUserSuccess(data));
      enqueueSnackbar("Profile Updated Successfully", { variant: "success" });
    } catch (error) {
      setLoad(false);
      dispatch(updateUserFailure(error.message));
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };
  return (
    <div className="text-center max-w-lg mx-auto">
      <h1 className="futura-font text-3xl my-7 text-center">Profile</h1>
      <h3 className="mb-4 italic">Welcome {currentUser.username}</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <img
          className="self-center w-24 mx-auto  rounded-full"
          src={formData.avatar || currentUser.avatar}
          alt="photo"
          onClick={() => fileRef.current.click()}
        />
        <p>
          {fileUploadError ? (
            <span className="text-red-700">Error Image upload (2mb)</span>
          ) : filePercentage > 0 && filePercentage < 100 ? (
            <span className="text-slate-700">
              {" "}
              {`Uploading ${filePercentage}%`}{" "}
            </span>
          ) : filePercentage === 100 ? (
            <span className="text-green-700">Image Successfully uploaded</span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          id="username"
          defaultValue={currentUser.username}
          placeholder="username"
          onChange={handleChange}
          className=" border p-3 focus:outline-none focus:rounded-2xl transition-all focus:border-slate-500 duration-700 rounded-lg"
        />
        <input
          type="email"
          defaultValue={currentUser.email}
          id="email"
          placeholder="email"
          onChange={handleChange}
          className=" border p-3 focus:outline-none focus:rounded-2xl transition-all focus:border-slate-500 duration-700 rounded-lg "
        />
        <input
          id="password"
          type="password"
          placeholder="password"
          onChange={handleChange}
          className=" border p-3 focus:outline-none focus:rounded-2xl transition-all focus:border-slate-500 duration-700 rounded-lg "
        />
        <button
          disabled={loading}
          className="bg-slate-700 rounded-lg text-white uppercase hover:opacity-95 p-3 disabled:opacity-80 transition-all duration-500 "
        >
          {load ? <Loader /> : "update"}
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <button className="uppercase border p-3 rounded-lg bg-white hover:border-black transition-all duration-500">
          delete account
        </button>
        <button className="uppercase border p-3 rounded-lg bg-white hover:border-black transition-all duration-500 ">
          sign out
        </button>
      </div>
      <p className="text-red-700">{error ? error : ""}</p>
      <>
        <UpdateProfile />
      </>
    </div>
  );
};

export default Profile;
