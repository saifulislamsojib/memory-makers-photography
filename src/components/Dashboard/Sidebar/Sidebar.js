import { faCommentDots, faHome, faPlusCircle, faShoppingBasket, faSignOutAlt, faSort, faThLarge, faUserCircle, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../../../App';
import { userSignOut } from '../../Login/Login/authManager';
import './Sidebar.css';

const Sidebar = ({url, isAdmin}) => {

    const [, setLoggedInUser] = useContext(userContext);

    const [navbarToggler, setNavbarToggler] = useState(false);

    const handleSignOut = () => {
        userSignOut()
        .then(() => {
            setLoggedInUser({})
            sessionStorage.removeItem('Photography/idToken');
        })
    };

    const handleNavbar = ()=> setNavbarToggler(!navbarToggler);

    return (
        <nav className="sidebar py-lg-5 py-3 px-2 navbar-expand-lg navbar-light">
            <div className='d-flex align-items-center justify-content-between'>
            <h4 className='text-white ms-2 mt-2 mt-lg-0'>Dashboard</h4>
            <button className="navbar-toggler toggler-btn me-2" type="button" onClick={handleNavbar}>
                <div className='positive-relative nav-icons'>
                    <div className={`nav-icon ${navbarToggler&&"nav-icon1 dashboard-common position-absolute"}`}></div>
                    <div className={`nav-icon ${navbarToggler?"nav-icon2 dashboard-common position-absolute": "nav-icon23"}`}></div>
                    <div className={`nav-icon ${navbarToggler?"nav-icon3 dashboard-common position-absolute": "nav-icon23"}`}></div>
                </div>
            </button>
            </div>
            <div className={`collapse navbar-collapse ${navbarToggler&&'d-block'}`}>
            <ul className="nav flex-column">
                <li className="nav-item mt-2">
                    <Link to={`${url}`} className="nav-link text-white" >
                        <FontAwesomeIcon icon={faUserCircle} />
                        <span className='ms-2'>Profile</span>
                    </Link>
                </li>
                <li className="nav-item mt-2">
                    <Link to={`${url}/book`} className="nav-link text-white" >
                        <FontAwesomeIcon icon={faShoppingBasket} />
                        <span className='ms-2'>Book</span>
                    </Link>
                </li>
                <li className="nav-item mt-2">
                    <Link to={`${url}/bookingList`} className="nav-link text-white" >
                        <FontAwesomeIcon icon={faSort} />
                        <span className='ms-2'>Booking List</span>
                    </Link>
                </li>
                {!isAdmin &&
                    <li className="nav-item mt-2">
                    <Link to={`${url}/feedback`} className="nav-link text-white" >
                        <FontAwesomeIcon icon={faCommentDots} />
                        <span className='ms-2'>Feedback</span>
                    </Link>
                </li>}
                {isAdmin &&
                <li className="nav-item mt-2">
                    <Link to={`${url}/addAdmin`} className="nav-link text-white" >
                        <FontAwesomeIcon icon={faUserPlus} />
                        <span className='ms-2'>Add Admin</span>
                    </Link>
                </li>}
                {isAdmin &&
                <li className="nav-item mt-2">
                    <Link to={`${url}/addService`} className="nav-link text-white" >
                        <FontAwesomeIcon icon={faPlusCircle} />
                        <span className='ms-2'>Add Service</span>
                    </Link>
                </li>}
                {isAdmin &&
                <li className="nav-item mt-2">
                    <Link to={`${url}/manageServices`} className="nav-link text-white" >
                        <FontAwesomeIcon icon={faThLarge} />
                        <span className='ms-2'>Manage Service</span>
                    </Link>
                </li>}
                <li className="nav-item mt-3">
                    <Link to='/' className="nav-link text-white" >
                        <FontAwesomeIcon icon={faHome} />
                        <span className='ms-2'>Home</span>
                    </Link>
                </li>
                <li onClick={handleSignOut} className="nav-item mt-2 text-white px-3 form-control-color d-flex align-items-center">
                    <FontAwesomeIcon icon={faSignOutAlt} />
                    <span className='ms-2'>Logout</span>
                </li>
            </ul>
            </div>
        </nav>
    );
};

export default Sidebar;