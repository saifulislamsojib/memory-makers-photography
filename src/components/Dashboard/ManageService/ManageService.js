import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const ManageService = ({service, handleServiceDelete, setUpdates, setIsOpen}) => {

    const handleUpdate = () => {
        setUpdates(service);
        setIsOpen(true);
    };

    const {title, price, features, _id} = service;
    return (
        <div className='row mb-4 border-bottom pb-2'>
            <h6 className='col-4'>{title}</h6>
            <h6 className='col-2 text-center'>{features.length}</h6>
            <h6 className='col-2 text-end'>{price}</h6>
            <h6 className='col-4 text-end'>
                <FontAwesomeIcon onClick={handleUpdate} icon={faEdit} className='text-warning fs-3 me-3 action-icon' />
                <FontAwesomeIcon onClick={()=>handleServiceDelete(_id)} icon={faTrashAlt} className='text-danger fs-3 me-2 action-icon' />
            </h6>
        </div>
    );
};

export default ManageService;