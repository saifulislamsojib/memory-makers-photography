import React, { useEffect, useState } from 'react';
import Spinner from '../../Shared/Spinner/Spinner';
import AddService from '../AddService/AddService';
import ManageService from '../ManageService/ManageService';

const ManageServices = () => {

    const [services, setServices] = useState([]);

    const [isDeleted, setIsDeleted] = useState(false);

    const [updates, setUpdates] = useState({});
    
    useEffect(() => {
        const unsubscribe = fetch('https://memory-makers-photography.herokuapp.com/services')
        .then(res => res.json())
        .then(data => setServices(data));
        return unsubscribe;
    }, []);

    const handleServiceDelete = _id =>{
        setIsDeleted(false)
        fetch(`https://memory-makers-photography.herokuapp.com/deleteService/${_id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json'}
        })
        .then(res=>res.json())
        .then(result=>{
            const newServices = services.filter(service=> service._id!== _id)
            setServices(newServices);
            setIsDeleted(result);
        });
    }

    return (
        <div className='mt-4'>
            <h1 className='color-primary'>Manage Services</h1>
            {!updates._id && services.length ?
            <div className='all-services'>
                <div className='services-container'>
                    <div className='row mb-3 pb-2 pt-3 table-headers border-bottom'>
                        <h6 className='col-4 text-muted'>Title</h6>
                        <h6 className='col-2 text-muted text-center'>Features</h6>
                        <h6 className='col-2 text-muted text-end'>Price</h6>
                        <h6 className='col-4 text-muted text-end'>Actions</h6>
                    </div>
                    {
                        services.map((service, index) => <ManageService index={index} setUpdates={setUpdates} key={service._id} handleServiceDelete={handleServiceDelete} service={service} />)
                    }
                    {
                        isDeleted && <h5 className="text-success text-center mt-5">Service Deleted Successfully</h5>
                    }
                </div>
            </div>: !updates._id && <Spinner />}
            {
                updates._id&&<AddService updates={updates} />
            }
        </div>
    );
};

export default ManageServices;