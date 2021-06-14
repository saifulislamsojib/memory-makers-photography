import { faCommentDots, faHome, faPlusCircle, faShoppingBasket, faSignOutAlt, faSort, faThLarge, faUserCircle, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { userContext } from '../../../App';
import { userSignOut } from '../../Login/Login/authManager';
import './Sidebar.css';

const Sidebar = ({url, isAdmin, navbarToggler, setNavbarToggler}) => {

    const [, setLoggedInUser] = useContext(userContext);

    const handleSignOut = () => {
        userSignOut()
        .then(() => {
            setLoggedInUser({})
            sessionStorage.removeItem('Photography/idToken');
        })
    };

    const handleHome = () => {
        setNavbarToggler(false);
        window.scrollTo(0, 0);
    }

    return (
        <nav className={`sidebar ${navbarToggler?'active':''} py-4 px-2 navbar-expand-lg navbar-light`}>
            <div className='d-flex align-items-center justify-content-between'>
                <h4 className='text-white ms-2 mt-2 mt-lg-0'>Dashboard</h4>
                <div onClick={() => setNavbarToggler(!navbarToggler)} className="navbar-toggler d-lg-none" type="button">
                    <div className={navbarToggler ? 'toggler-icon toggler-active' : 'toggler-icon'} />
                </div>
            </div>
            <div className="navbar-collapse">
            <ul className="nav flex-column">
                <li className="nav-item mt-2">
                    <NavLink exact={true} activeClassName='sidebar-active' to={`${url}`} className="nav-link text-white" onClick={() => setNavbarToggler(false)}>
                        <FontAwesomeIcon icon={faUserCircle} />
                        <span className='ms-2'>Profile</span>
                    </NavLink>
                </li>
                <li className="nav-item mt-2">
                    <NavLink activeClassName='sidebar-active' to={`${url}/book`} className="nav-link text-white" onClick={() => setNavbarToggler(false)}>
                        <FontAwesomeIcon icon={faShoppingBasket} />
                        <span className='ms-2'>Book</span>
                    </NavLink>
                </li>
                <li className="nav-item mt-2">
                    <NavLink exact={true} activeClassName='sidebar-active' to={`${url}/bookingList`} className="nav-link text-white" onClick={() => setNavbarToggler(false)}>
                        <FontAwesomeIcon icon={faSort} />
                        <span className='ms-2'>Booking List</span>
                    </NavLink>
                </li>
                {!isAdmin &&
                    <li className="nav-item mt-2">
                    <NavLink exact={true} activeClassName='sidebar-active' to={`${url}/feedback`} className="nav-link text-white" onClick={() => setNavbarToggler(false)}>
                        <FontAwesomeIcon icon={faCommentDots} />
                        <span className='ms-2'>Feedback</span>
                    </NavLink>
                </li>}
                {isAdmin &&
                <li className="nav-item mt-2">
                    <NavLink exact={true} activeClassName='sidebar-active' to={`${url}/manageAdmin`} className="nav-link text-white" onClick={() => setNavbarToggler(false)}>
                        <FontAwesomeIcon icon={faUserPlus} />
                        <span className='ms-2'>Manage Admin</span>
                    </NavLink>
                </li>}
                {isAdmin &&
                <li className="nav-item mt-2">
                    <NavLink exact={true} activeClassName='sidebar-active' to={`${url}/addService`} className="nav-link text-white" onClick={() => setNavbarToggler(false)}>
                        <FontAwesomeIcon icon={faPlusCircle} />
                        <span className='ms-2'>Add Service</span>
                    </NavLink>
                </li>}
                {isAdmin &&
                <li className="nav-item mt-2">
                    <NavLink exact={true} activeClassName='sidebar-active' to={`${url}/manageServices`} className="nav-link text-white" onClick={() => setNavbarToggler(false)}>
                        <FontAwesomeIcon icon={faThLarge} />
                        <span className='ms-2'>Manage Service</span>
                    </NavLink>
                </li>}
                <li className="nav-item">
                    <Link to='/' className="nav-link text-white" onClick={handleHome}>
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