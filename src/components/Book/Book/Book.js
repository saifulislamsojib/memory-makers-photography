import React, { useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useHistory, useParams } from "react-router-dom";
import swal from "sweetalert";
import { context } from "../../../App";
import ReactModal from "../../Dashboard/Modal/Modal";
import Services from "../../Home/Services/Services";
import Spinner from "../../Shared/Spinner/Spinner";
import BookForm from "../BookForm/BookForm";
import BookingTable from "../BookingTable/BookingTable";
import ProcessPayment from "../ProcessPayment/ProcessPayment";

const Book = ({ setBookings }) => {
  useEffect(() => {
    document.title = "service-booking";
  }, []);

  const { id } = useParams();

  const history = useHistory();

  const [service, setService] = useState({});

  const { loggedInUser } = useContext(context);

  const [showSpinner, setShowSpinner] = useState(true);

  const [bookingInfo, setBookingInfo] = useState(null);

  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setShowSpinner(true);
    let unsubscribe = true;
    id !== undefined
      ? fetch(
          `https://memory-makers-photography-server.vercel.app/service/${id}`
        )
          .then((res) => res.json())
          .then((data) => {
            if (unsubscribe) {
              setService(data);
              setShowSpinner(false);
            }
          })
          .catch((err) => setShowSpinner(false))
      : setShowSpinner(false);
    return () => (unsubscribe = false);
  }, [id]);

  const onSubmit = (data) => {
    setBookingInfo({ ...data, service, user: loggedInUser });
    setIsOpen(true);
  };

  const handlePaymentCheckout = (paymentDetails) => {
    const bookingData = {
      ...bookingInfo,
      paymentDetails,
      orderDate: new Date().toDateString(),
      orderTime: new Date().toTimeString(),
      status: "Pending",
    };
    toast.promise(
      fetch("https://memory-makers-photography-server.vercel.app/bookOrder", {
        method: "POST",
        body: JSON.stringify(bookingData),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then(({ inserted, _id }) => {
          if (inserted) {
            setBookings((preBookings) =>
              preBookings.length
                ? [{ ...bookingData, _id }, ...preBookings]
                : preBookings
            );
            swal(
              "Booking Successfully!",
              "Your booking successfully done!",
              "success"
            );
            setIsOpen(false);
            history.replace("/dashboard/bookingList");
          }
        }),
      {
        loading: "Booking...",
        success: <b>Booking Successfully!</b>,
        error: <b>Could not Book.</b>,
      }
    );
  };

  return (
    <div>
      <Toaster />
      {service.title ? (
        <>
          <BookingTable service={service} />
          <h2 className="color-primary mt-5 text-center">
            Process Your Booking
          </h2>
          <BookForm onSubmit={onSubmit} />
        </>
      ) : showSpinner ? (
        <Spinner />
      ) : (
        <Services book />
      )}
      <ReactModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen}>
        <ProcessPayment handlePaymentCheckout={handlePaymentCheckout} />
      </ReactModal>
    </div>
  );
};

export default Book;
