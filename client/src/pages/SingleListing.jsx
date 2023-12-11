import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import Loader from "../components/Loader";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";

const SingleListing = () => {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const params = useParams();

  useEffect(() => {
    try {
      setLoading(true);
      const listingId = params.listingId;
      const fetchListing = async () => {
        const res = await fetch(`/api/v1/listing/singleLIsting/${listingId}`);
        const data = await res.json();
        if (data.success === false) {
          console.log(data.message);
          setError(true);
          setLoading(false);
          enqueueSnackbar(data.message, { variant: "error" });
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      };
      fetchListing();
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  }, []);

  return (
    <main>
      {loading && <Loader />}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong!</p>
      )}
      {listing && !loading && !error && (
        <>
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[450px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
    </main>
  );
};

export default SingleListing;
