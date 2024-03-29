import React, { lazy, Suspense, useContext, useEffect, useState } from "react";
import {
  Route,
  Switch,
  useHistory,
  useLocation,
  useRouteMatch,
} from "react-router-dom";
import { context } from "../../../App";
import avatar from "../../../images/user-profile-icon-png.png";
import Spinner from "../../Shared/Spinner/Spinner";
import Sidebar from "../Sidebar/Sidebar";
import "./Dashboard.css";

const Book = lazy(() => import("../../Book/Book/Book"));
const NotFound = lazy(() => import("../../NotFound/NotFound"));
const AddService = lazy(() => import("../AddService/AddService"));
const BookingList = lazy(() => import("../BookingList/BookingList"));
const Feedback = lazy(() => import("../Feedback/Feedback"));
const ManageAdmin = lazy(() => import("../ManageAdmin/ManageAdmin"));
const ManageServices = lazy(() => import("../ManageServices/ManageServices"));
const Profile = lazy(() => import("../Profile/Profile"));

const Dashboard = () => {
  const { path, url } = useRouteMatch();

  const { pathname } = useLocation();

  const { loggedInUser, isAdmin, setIsAdmin, adminLoaded, setAdminLoaded } =
    useContext(context);

  const history = useHistory();

  const [navbarToggler, setNavbarToggler] = useState(false);

  const [bookings, setBookings] = useState([]);

  const [bookingLoaded, setBookingLoaded] = useState(false);

  const [feedbackData, setFeedbackData] = useState({});

  const { photo } = loggedInUser;

  const [adminLoading, setAdminLoading] = useState(true);

  useEffect(() => {
    document.title = "Dashboard - Memory Makers";
  }, []);

  useEffect(() => {
    if (!adminLoaded) {
      setIsAdmin(false);
      const token = sessionStorage.getItem("Photography/idToken");
      fetch(
        `https://memory-makers-photography-server.vercel.app/isAdmin?email=${loggedInUser.email}`,
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
          setIsAdmin(data);
          setAdminLoading(false);
          setAdminLoaded(true);
        });
    } else {
      setAdminLoading(false);
    }
  }, [loggedInUser, setAdminLoaded, setAdminLoading, setIsAdmin, adminLoaded]);

  return (
    <>
      {adminLoading ? (
        <Spinner />
      ) : (
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 col-xl-2 position-relative">
              <Sidebar
                navbarToggler={navbarToggler}
                url={url}
                setNavbarToggler={setNavbarToggler}
              />
            </div>
            <div className="col-lg-9 col-xl-10">
              <div className="top-bar d-flex align-items-center justify-content-between py-2 px-3 mt-3 radius sticky-top">
                <div
                  onClick={() => setNavbarToggler(true)}
                  className="navbar-toggler d-lg-none"
                  type="button"
                >
                  <div className="toggler-icon" />
                </div>
                <h4 className="mt-2 ps-lg-3">
                  {pathname
                    ?.split("/")[2]
                    ?.split(/(?=[A-Z])/)
                    ?.join(" ")
                    .toUpperCase() || "PROFILE"}
                </h4>
                <img
                  onClick={() => history.push("/dashboard")}
                  src={photo || avatar}
                  className="user-logo"
                  alt=""
                />
              </div>
              <Suspense fallback={<Spinner />}>
                <Switch>
                  <Route exact path={path}>
                    <Profile />
                  </Route>
                  <Route path={`${path}/book/:id`}>
                    <Book setBookings={setBookings} />
                  </Route>
                  <Route path={`${path}/book`}>
                    <Book setBookings={setBookings} />
                  </Route>
                  <Route path={`${path}/bookingList`}>
                    <BookingList
                      isAdmin={isAdmin}
                      bookings={bookings}
                      setBookings={setBookings}
                      bookingLoaded={bookingLoaded}
                      setBookingLoaded={setBookingLoaded}
                    />
                  </Route>
                  <Route path={`${path}/feedback`}>
                    <Feedback
                      feedbackData={feedbackData}
                      setFeedbackData={setFeedbackData}
                    />
                  </Route>
                  {isAdmin && (
                    <Route path={`${path}/manageAdmin`}>
                      <ManageAdmin />
                    </Route>
                  )}
                  {isAdmin && (
                    <Route path={`${path}/addService`}>
                      <AddService />
                    </Route>
                  )}
                  {isAdmin && (
                    <Route path={`${path}/manageServices`}>
                      <ManageServices />
                    </Route>
                  )}
                  <Route exact path="*">
                    <NotFound dashboard />
                  </Route>
                </Switch>
              </Suspense>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
