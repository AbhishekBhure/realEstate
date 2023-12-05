import { useSelector } from "react-redux";
import UpdateProfile from "../components/UpdateProfile";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="text-center max-w-lg mx-auto">
      <h1 className="futura-font text-3xl my-7 text-center">Profile</h1>
      <h3 className="mb-4 italic">Welcome {currentUser.username}</h3>
      <form className="flex flex-col gap-4">
        <img
          className="self-center w-24 mx-auto  rounded-full"
          src={currentUser.avatar}
          alt="photo"
        />
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
