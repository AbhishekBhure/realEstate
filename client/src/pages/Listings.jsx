import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ConfirmationModal from "../components/ConfirmationModal";
import { useSnackbar } from "notistack";

const Listings = () => {
  const [showListingErr, setShowListingErr] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const getListings = async () => {
      try {
        setShowListingErr(false);
        const res = await fetch(`/api/v1/users/listings/${currentUser._id}`);
        const data = await res.json();
        if (data.success === false) {
          setShowListingErr(true);
          return;
        }
        setUserListings(data);
      } catch (error) {
        setShowListingErr(true);
      }
    };
    if (userListings.length === 0) {
      getListings();
    }
  }, []);

  console.log(userListings);

  const handleDeleteConfirmation = () => {
    setIsConfirmModalOpen(true);
  };

  const handleDeleteListing = async (listingId) => {
    try {
      setIsConfirmModalOpen(false);
      const res = await fetch(`/api/v1/listing/delete/${listingId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
      enqueueSnackbar("Listing Deleted Successfully", { variant: "success" });
    } catch (error) {
      console.log(error.message);
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  const handleCloseModal = () => {
    setIsConfirmModalOpen(false);
  };
  return (
    <div>
      <p className="text-sm text-red-700">
        {showListingErr ? "Error while showing listings" : ""}
      </p>
      <table className="table-auto my-5 p-5 w-full">
        <thead>
          <tr className="">
            <th>Sr. No.</th>
            <th>Images</th>
            <th>Listing Name</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody>
          {userListings && userListings.length > 0 ? (
            userListings.map((listing, index) => (
              <tr className="" key={listing._id}>
                <td className="text-center">{index + 1}</td>
                <td className="">
                  <Link to={`/listing/${listing._id}`}>
                    {listing.imageUrls.length > 0 ? (
                      <img
                        className="w-20 object-cover"
                        src={listing.imageUrls}
                        alt="images"
                      />
                    ) : (
                      "No images"
                    )}
                  </Link>
                </td>
                <td className="text-center">
                  <Link to={`/listing/${listing._id}`}>{listing.name}</Link>
                </td>
                <td className="text-center flex justify-center gap-3 ">
                  <button
                    onClick={() => handleDeleteConfirmation()}
                    className="bg-red-600 text-white p-2 rounded-lg mr-2 transition-all duration-500"
                  >
                    delete
                  </button>
                  <button className="border p-2  rounded-lg bg-white hover:border-black transition-all duration-500">
                    edit
                  </button>
                </td>
                <td>
                  <ConfirmationModal
                    isOpen={isConfirmModalOpen}
                    onClose={handleCloseModal}
                    onConfirm={() => handleDeleteListing(listing._id)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr className="mt-3">
              <td colSpan="7" className="text-red-700 text-center">
                <p>No Listing Available</p>
                <Link to="/create-listing">
                  <button className="mt-4 uppercase border p-3 rounded-lg bg-white hover:border-black transition-all duration-500">
                    create listing
                  </button>
                </Link>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Listings;
