import React, { useContext, useEffect, useState } from 'react';
import { userContext } from '../../../App';
import Booking from '../Booking/Booking';

const BookingList = () => {

    const [bookings, setBookings] = useState([]);

    const [loggedInUser] = useContext(userContext);

    useEffect(() => {
        const token = sessionStorage.getItem('Photography/idToken');
        fetch(`http://localhost:4000/userBookings?email=${loggedInUser.email}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: token
            }
        })
        .then(res => res.json())
        .then(data => !data[0].message && setBookings(data))
    }, [loggedInUser]);

    return (
        <section className='mt-4'>
            <h1 className='color-primary'>Booking List</h1>
            <div className='row pt-5 booking-list'>
                {
                    bookings.map(booking => <Booking key={booking._id} booking={booking} />)
                }
            </div>
        </section>
    );
};

export default BookingList;