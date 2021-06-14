import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';
import { userContext } from '../../../App';
import './Profile.css';

const Profile = () => {
    const [loggedInUser] = useContext(userContext);
    const { name, email, photo } = loggedInUser;
    return (
        <div className="d-flex align-items-center justify-content-center profile-container">
           <div className="text-center shadow p-4 radius profile">
                <img style={{height: '100px'}} className='radius' src={photo || 'https://uxwing.com/wp-content/themes/uxwing/download/12-people-gesture/avatar.png'} alt="" />
                <h4 className="my-3">{name}</h4>
                <h6>{email}</h6>
                <button className="btn btn-primary mt-3">Edit <FontAwesomeIcon icon={faEdit} className="ms-2" /></button>
           </div>
        </div>
    );
};

export default Profile;