import { faCommentDots, faHome, faPlusCircle, faSignOutAlt, faSort, faThLarge, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../../../App';
import { userSignOut } from '../../Login/Login/authManager';
import './Sidebar.css';

const Sidebar = ({url, isAdmin}) => {

    const [, setLoggedInUser] = useContext(userContext);

    const handleSignOut = () => {
        userSignOut()
        .then(() => {
            setLoggedInUser({})
            sessionStorage.removeItem('Photography/idToken');
        })
    };

    return (
        <nav className="sidebar py-5 px-4">
            <h4 className='text-white ms-2'>Dashboard</h4>
            <ul className="nav flex-column">
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
        </nav>
    );
};

export default Sidebar;