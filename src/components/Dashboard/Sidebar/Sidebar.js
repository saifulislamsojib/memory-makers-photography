import {
  faCommentDots,
  faHome,
  faPlusCircle,
  faShoppingBasket,
  faSignOutAlt,
  faSort,
  faThLarge,
  faUserCircle,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import swal from "sweetalert";
import { context } from "../../../App";
import { userSignOut } from "../../Login/Login/authManager";
import "./Sidebar.css";

const Sidebar = ({ url, navbarToggler, setNavbarToggler }) => {
  const { isAdmin, setLoggedInUser, setDarkMode, isDarkMode } =
    useContext(context);

  const handleSignOut = () => {
    swal({
      title: "Are you sure?",
      text: "Are you sure that you logging out",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        userSignOut().then(() => {
          setLoggedInUser({});
          sessionStorage.removeItem("Photography/idToken");
          swal("Logged Out Successfully!", {
            icon: "success",
          });
        });
      }
    });
  };

  const handleHome = () => {
    window.scrollTo(0, 0);
    setNavbarToggler(false);
  };

  return (
    <nav
      className={`sidebar ${
        navbarToggler ? "active" : ""
      } py-4 px-2 navbar-expand-lg navbar-light`}
    >
      <div className="d-flex align-items-center justify-content-between">
        <h4 className="text-white ms-2 mt-1 mt-lg-0">Dashboard</h4>
        <div
          onClick={() => setNavbarToggler(false)}
          className="navbar-toggler d-lg-none pe-2"
          type="button"
        >
          <div className="toggler-icon toggler-active" />
        </div>
      </div>
      <div className="navbar-collapse">
        <ul className="nav flex-column">
          <li className={isAdmin ? "nav-item mt-1" : "nav-item mt-2 side-item"}>
            <NavLink
              exact={true}
              activeClassName="sidebar-active"
              to={url}
              className="nav-link text-white"
              onClick={() => setNavbarToggler(false)}
            >
              <FontAwesomeIcon icon={faUserCircle} />
              <span className="ms-2">Profile</span>
            </NavLink>
          </li>
          <li className="nav-item mt-1">
            <NavLink
              activeClassName="sidebar-active"
              to={`${url}/book`}
              className="nav-link text-white"
              onClick={() => setNavbarToggler(false)}
            >
              <FontAwesomeIcon icon={faShoppingBasket} />
              <span className="ms-1">Book</span>
            </NavLink>
          </li>
          <li className="nav-item mt-1">
            <NavLink
              exact={true}
              activeClassName="sidebar-active"
              to={`${url}/bookingList`}
              className="nav-link text-white"
              onClick={() => setNavbarToggler(false)}
            >
              <FontAwesomeIcon icon={faSort} />
              <span className="ms-1">Booking List</span>
            </NavLink>
          </li>
          {isAdmin && (
            <li className="nav-item mt-2">
              <NavLink
                exact={true}
                activeClassName="sidebar-active"
                to={`${url}/manageAdmin`}
                className="nav-link text-white"
                onClick={() => setNavbarToggler(false)}
              >
                <FontAwesomeIcon icon={faUserPlus} />
                <span className="ms-1">Manage Admin</span>
              </NavLink>
            </li>
          )}
          {isAdmin && (
            <li className="nav-item mt-1">
              <NavLink
                exact={true}
                activeClassName="sidebar-active"
                to={`${url}/addService`}
                className="nav-link text-white"
                onClick={() => setNavbarToggler(false)}
              >
                <FontAwesomeIcon icon={faPlusCircle} />
                <span className="ms-1">Add Service</span>
              </NavLink>
            </li>
          )}
          {isAdmin && (
            <li className="nav-item mt-1">
              <NavLink
                exact={true}
                activeClassName="sidebar-active"
                to={`${url}/manageServices`}
                className="nav-link text-white"
                onClick={() => setNavbarToggler(false)}
              >
                <FontAwesomeIcon icon={faThLarge} />
                <span className="ms-1">Manage Service</span>
              </NavLink>
            </li>
          )}
          <li className="nav-item mt-1">
            <NavLink
              exact={true}
              activeClassName="sidebar-active"
              to={`${url}/feedback`}
              className="nav-link text-white"
              onClick={() => setNavbarToggler(false)}
            >
              <FontAwesomeIcon icon={faCommentDots} />
              <span className="ms-1">Feedback</span>
            </NavLink>
          </li>
          <li
            onClick={handleSignOut}
            className="nav-item mt-1 text-white px-3 form-control-color d-flex align-items-center"
          >
            <FontAwesomeIcon icon={faSignOutAlt} />
            <span className="ms-1">Logout</span>
          </li>
          <li className="nav-item position-absolute bottom btn">
            <Link to="/" className="nav-link text-white" onClick={handleHome}>
              <FontAwesomeIcon icon={faHome} />
              <span className="ms-1">Go To Home</span>
            </Link>
          </li>
          <li className="nav-item mt-1 ms-3">
            <div
              onClick={setDarkMode}
              className={
                isDarkMode
                  ? "dark-mode-toggler dark-active"
                  : "dark-mode-toggler"
              }
            >
              <div className="toggler-btn" />
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
