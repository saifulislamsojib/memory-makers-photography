import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import { userContext } from '../../../App';
import ReactModal from '../Modal/Modal';
import './Profile.css';

const Profile = () => {
    const [loggedInUser] = useContext(userContext);
    const { name, email, photo } = loggedInUser;

    const [modalIsOpen,setIsOpen] = useState(false);

    return (
        <>
        <ReactModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen}>
            <div className="text-center p-4 radius profile">
                <img style={{height: '100px'}} className='rounded-pill' src={photo || 'https://uxwing.com/wp-content/themes/uxwing/download/12-people-gesture/avatar.png'} alt="" />
                <h4 className="my-3">{name}</h4>
                <h6>{email}</h6>
            </div>
        </ReactModal>
        <div className="d-flex align-items-center justify-content-center profile-container">
           <div className="text-center shadow p-4 radius profile">
                <img style={{height: '100px'}} className='radius' src={photo || 'https://uxwing.com/wp-content/themes/uxwing/download/12-people-gesture/avatar.png'} alt="" />
                <h4 className="my-3">{name}</h4>
                <h6>{email}</h6>
                <button onClick={() => setIsOpen(true)} className="btn btn-primary mt-3">Edit <FontAwesomeIcon icon={faEdit} className="ms-2" /></button>
           </div>
        </div>
        </>
    );
};

export default Profile;