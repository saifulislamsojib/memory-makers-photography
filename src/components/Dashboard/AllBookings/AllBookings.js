import React from 'react';
import AllBookingTable from '../AllBookingTable/AllBookingTable';
import './AllBookings.css';

const AllBookings = ({bookings, handleStatusUpdate, statusUpdated}) => {


    return (
        <div className='bookings-container'>
            <div className="p-2 all-bookings">
                <div className='row mb-3 pb-2 pt-3 table-headers border-bottom'>
                    <h6 className='col-2 text-muted'>name</h6>
                    <h6 className='col-3 text-muted'>Email</h6>
                    <h6 className='col-2 text-muted text-center ps-3'>Payment</h6>
                    <h6 className='col-3 text-muted'>Service</h6>
                    <h6 className='col-2 text-muted text-end'>Status</h6>
                </div>
                {
                    bookings.map((booking, index) => <AllBookingTable index={index} key={booking._id} handleStatusUpdate={handleStatusUpdate} booking={booking} />)
                }
            </div>
            {
                statusUpdated && <h5 className="text-success text-center mt-3">Status Updated Successfully</h5>
            }
        </div>
    );
};

export default AllBookings;