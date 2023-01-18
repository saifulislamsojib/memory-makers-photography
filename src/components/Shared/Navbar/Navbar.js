import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { context } from "../../../App";
import { useActiveValue } from "../../../context/ActiveContext";
import navData from "./navData";

const Navbar = () => {
  const { loggedInUser, isDarkMode, setDarkMode } = useContext(context);

  const [navbarToggler, setNavbarToggler] = useState(false);

  const [navbarBg, setNavbarBg] = useState(false);

  const history = useHistory();

  const { active } = useActiveValue();

  const handleLink = () => {
    window.scrollTo(0, 0);
    setNavbarToggler(false);
  };

  const handleScroll = () => {
    if (window.scrollY > 30) {
      setNavbarBg(true);
    } else {
      setNavbarBg(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { name, photo } = loggedInUser;
  return (
    <nav
      className={`navbar navbar-expand-lg position-fixed w-100 ${
        navbarBg ? "shadow navbar-bg" : "navbar-transparent"
      }`}
    >
      <div className="container">
        <Link to="/" className="navbar-brand">
          Memory Makers Photography
        </Link>
        <div
          onClick={() => setNavbarToggler(!navbarToggler)}
          className="navbar-toggler"
          type="button"
        >
          <div
            className={
              navbarToggler ? "toggler-icon toggler-active" : "toggler-icon"
            }
          />
        </div>
        <div className="navbar-collapse position-relative">
          <ul
            className={`navbar-nav ms-auto text-center d-flex align-items-center ${
              navbarToggler && "mobile"
            }`}
          >
            {navData.map(({ name, path }) => (
              <li
                key={path}
                className="nav-item mt-2 mt-lg-0 text-center me-lg-2 ms-xl-3"
              >
                {path.startsWith("/") ? (
                  <NavLink
                    exact={true}
                    activeClassName={
                      path === "/" && active === "#home" ? "active" : ""
                    }
                    to={path}
                    className="nav-link home-nav-link"
                    onClick={handleLink}
                  >
                    {name}
                  </NavLink>
                ) : (
                  <a
                    href={path}
                    className={
                      path === active
                        ? "nav-link home-nav-link active"
                        : "nav-link home-nav-link"
                    }
                    onClick={() => setNavbarToggler(false)}
                  >
                    {name}
                  </a>
                )}
              </li>
            ))}
            <li className="nav-item ms-lg-1 ms-xl-3 text-center">
              {name ? (
                photo ? (
                  <img
                    onClick={() => history.push("/dashboard")}
                    className="mt-2 mt-lg-0 mb-3 mb-lg-0 user-logo"
                    src={photo}
                    alt=""
                  />
                ) : (
                  <h6
                    onClick={() => history.push("/dashboard")}
                    className={`mt-2 ${
                      navbarBg ? "mt-lg-1 text-primary" : "mt-lg-0 name"
                    } mb-3 mb-lg-1`}
                  >
                    {name}
                  </h6>
                )
              ) : (
                <button
                  onClick={() => history.push("/login")}
                  className={`btn ${
                    navbarBg ? "btn-outline-success" : "btn-success"
                  } mt-2 mt-lg-0 mb-3 mb-lg-0 px-4 px-lg-3 px-xl-4`}
                >
                  Login
                </button>
              )}
            </li>
            <li className="nav-item ms-lg-3 ms-xl-4 text-center mb-3 mb-lg-0">
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
      </div>
    </nav>
  );
};

export default Navbar;
