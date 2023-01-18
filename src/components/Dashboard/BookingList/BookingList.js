import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { context } from "../../../App";
import { getToken } from "../../Login/Login/authManager";
import Spinner from "../../Shared/Spinner/Spinner";
import AllBookings from "../AllBookings/AllBookings";
import Booking from "../Booking/Booking";

const BookingList = ({
  bookings,
  setBookings,
  bookingLoaded,
  setBookingLoaded,
}) => {
  useEffect(() => {
    document.title = "booking-list";
  }, []);

  const { loggedInUser, isAdmin } = useContext(context);

  const [showSpinner, setShowSpinner] = useState(true);

  const [reloaded, setReloaded] = useState(false);

  useEffect(() => {
    let unsubscribe = true;
    if (!bookingLoaded || reloaded) {
      setShowSpinner(true);
      const token = sessionStorage.getItem("Photography/idToken");
      fetch(
        `https://memory-makers-photography-server.vercel.app/allBookings?email=${loggedInUser.email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (unsubscribe) {
            setBookingLoaded(true);
            setReloaded(false);
            setBookings([...data].reverse());
            setShowSpinner(false);
          }
        });
    } else {
      setShowSpinner(false);
    }
    return () => (unsubscribe = false);
  }, [
    loggedInUser,
    setBookings,
    bookings,
    reloaded,
    bookingLoaded,
    setBookingLoaded,
  ]);

  const handleReload = () => {
    setShowSpinner(true);
    getToken().then((idToken) => {
      sessionStorage.setItem("Photography/idToken", `Bearer ${idToken}`);
      setReloaded(true);
    });
  };

  const handleStatusUpdate = (e, _id, index) => {
    const updateStatus = { status: e.target.value };
    toast.promise(
      fetch(
        `https://memory-makers-photography-server.vercel.app/updateBooking/${_id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updateStatus),
        }
      )
        .then((res) => res.json())
        .then((result) => {
          if (result) {
            const newBookings = [...bookings];
            newBookings[index].status = e.target.value;
            setBookings(newBookings);
          }
        }),
      {
        loading: "Updating...",
        success: <b>Updated Successfully!</b>,
        error: <b>Could not update.</b>,
      }
    );
  };

  return (
    <section className="mt-3">
      <Toaster />
      <div className="pt-4 booking-list">
        {showSpinner ? (
          <Spinner />
        ) : bookings?.length > 0 ? (
          bookings[0]?._id ? (
            <div className="row">
              {isAdmin ? (
                <AllBookings
                  bookings={bookings}
                  handleStatusUpdate={handleStatusUpdate}
                />
              ) : (
                bookings.map((booking) => (
                  <Booking key={booking._id} booking={booking} />
                ))
              )}
            </div>
          ) : (
            <button
              onClick={handleReload}
              className="btn primary-btn d-block mx-auto"
            >
              <FontAwesomeIcon icon={faSyncAlt} className="me-2" />
              Refresh
            </button>
          )
        ) : (
          <h4 className="text-center text-muted">You Have No Bookings</h4>
        )}
      </div>
    </section>
  );
};

export default BookingList;
