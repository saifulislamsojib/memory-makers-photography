import React, { useContext, useEffect, useState } from 'react';
import { userContext } from '../../../App';
import Booking from '../Booking/Booking';

const BookingList = () => {

    const [bookings, setBookings] = useState([]);

    const [loggedInUser] = useContext(userContext);

    useEffect(() => {
        fetch(`http://localhost:4000/userBookings?email=${loggedInUser.email}`)
        .then(res => res.json())
        .then(data => setBookings(data))
    }, [loggedInUser.email]);

    return (
        <section className='mt-4'>
            <h1 className='color-primary'>Booking List</h1>
            <div className='row mt-5'>
                {
                    bookings.map(booking => <Booking key={booking._id} booking={booking} />)
                }
            </div>
        </section>
    );
};

export default BookingList;