import { faCommentDots, faHome, faSort } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({url}) => {
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
                <li className="nav-item mt-2">
                    <Link to={`${url}/feedback`} className="nav-link text-white" >
                        <FontAwesomeIcon icon={faCommentDots} />
                        <span className='ms-2'>Feedback</span>
                    </Link>
                </li>
                <li className="nav-item mt-3">
                    <Link to='/' className="nav-link text-white" >
                        <FontAwesomeIcon icon={faHome} />
                        <span className='ms-2'>Home</span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Sidebar;