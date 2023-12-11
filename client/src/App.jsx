import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, About, SignIn, SignUp, Profile } from "./pages";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateListing from "./pages/CreateListing";
import Listings from "./pages/Listings";
import { useSelector } from "react-redux";
import UpdateListing from "./pages/UpdateLIsting";

const App = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-listing" element={<CreateListing />} />
          {currentUser ? (
            <Route
              path={`/listings/${currentUser._id}`}
              element={<Listings />}
            />
          ) : (
            "Dont have any listings"
          )}
          <Route
            path="/update-listing/:listingId"
            element={<UpdateListing />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
