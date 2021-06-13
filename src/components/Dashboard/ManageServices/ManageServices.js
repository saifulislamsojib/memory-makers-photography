import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';
import Spinner from '../../Shared/Spinner/Spinner';
import AddService from '../AddService/AddService';
import ManageService from '../ManageService/ManageService';

const ManageServices = () => {

    const [services, setServices] = useState([]);

    const [updates, setUpdates] = useState({});
    
    useEffect(() => {
        fetch('https://memory-makers-photography.herokuapp.com/services')
        .then(res => res.json())
        .then(data => setServices(data));
    }, []);

    const handleServiceDelete = _id =>{
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this service",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                fetch(`https://memory-makers-photography.herokuapp.com/deleteService/${_id}`, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json'}
                })
                .then(res=>res.json())
                .then(result=>{
                    if(result){
                        const newServices = services.filter(service=> service._id!== _id)
                        setServices(newServices);
                        swal("Service Deleted Successfully!", {
                            icon: "success",
                        });
                    }
                    else {
                        swal("Service Not Deleted!", {icon: "error"});
                    }
                })
                .catch(err => swal("Service Not Deleted!", {icon: "error"}));
            }
          });
    }
    return (
        <div className='mt-3'>
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
                </div>
            </div>: !updates._id && <Spinner />}
            {
                updates._id&&<AddService updates={updates} />
            }
        </div>
    );
};

export default ManageServices;