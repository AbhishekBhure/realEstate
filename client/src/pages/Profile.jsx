import { useSelector } from "react-redux";
import UpdateProfile from "../components/UpdateProfile";
import { useEffect, useRef, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

const Profile = () => {
  const fileRef = useRef();
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});

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
  return (
    <div className="text-center max-w-lg mx-auto">
      <h1 className="futura-font text-3xl my-7 text-center">Profile</h1>
      <h3 className="mb-4 italic">Welcome {currentUser.username}</h3>
      <form className="flex flex-col gap-4">
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
          placeholder="username"
          className=" border p-3 focus:outline-none focus:rounded-2xl transition-all focus:border-slate-500 duration-700 rounded-lg"
        />
        <input
          type="email"
          id="email"
          placeholder="email"
          className=" border p-3 focus:outline-none focus:rounded-2xl transition-all focus:border-slate-500 duration-700 rounded-lg "
        />
        <input
          id="password"
          type="password"
          placeholder="password"
          className=" border p-3 focus:outline-none focus:rounded-2xl transition-all focus:border-slate-500 duration-700 rounded-lg "
        />
        <button className="bg-slate-700 rounded-lg text-white uppercase hover:opacity-95 p-3 disabled:opacity-80 transition-all duration-500 ">
          update
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
      <>
        <UpdateProfile />
      </>
    </div>
  );
};

export default Profile;
