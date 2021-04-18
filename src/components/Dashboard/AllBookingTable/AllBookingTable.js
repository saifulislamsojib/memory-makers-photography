import React from 'react';

const AllBookingTable = ({booking, handleStatusUpdate, index}) => {
    const { name, email, paymentDetails, service, _id, status } = booking;

    return (
        <div  className='row mb-4 border-bottom pb-2'>
            <h6 className='col-2'>{name}</h6>
            <h6 className='col-3'>{email}</h6>
            <h6 className='col-2 text-center'>{paymentDetails.brand}</h6>
            <h6 className='col-3'>{service.title}</h6>
            <h6 className='col-2 text-end'>
            <select onChange={(e)=>handleStatusUpdate(e, _id, index)} defaultValue={status} className={`form-select ${status==='Pending'?'text-danger': status==='Done' ? 'text-success' : 'text-warning'}`} aria-label="Default select example">
                <option>{status}</option>
                {status!=='Pending'&&<option className='text-danger'>Pending</option>}
                {status!=='Ongoing'&&<option className="text-warning">Ongoing</option>}
                {status!=='Done'&&<option className='text-success'>Done</option>}
            </select>
            </h6>
        </div>
    );
};

export default AllBookingTable;