import React, { useContext, useEffect, useState } from 'react';
import { userContext } from '../../../App';
import Spinner from '../../Shared/Spinner/Spinner';
import AllBookings from '../AllBookings/AllBookings';
import Booking from '../Booking/Booking';

const BookingList = ({isAdmin}) => {

    const [bookings, setBookings] = useState([]);

    const [loggedInUser] = useContext(userContext);

    const [showSpinner, setShowSpinner] = useState(true);

    useEffect(() => {
        setShowSpinner(true);
        const token = sessionStorage.getItem('Photography/idToken');
        const unsubscribe = fetch(`https://memory-makers-photography.herokuapp.com/allBookings?email=${loggedInUser.email}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: token
            }
        })
        .then(res => res.json())
        .then(data => {
            setBookings(data);
            setShowSpinner(false);
        })
        return unsubscribe;
    }, [loggedInUser]);

    const [statusUpdated, setStatusUpdated] = useState(false);

    const handleStatusUpdate = (e, _id, index) => {
        setStatusUpdated(false);
        const updateStatus = { status: e.target.value }
        fetch(`https://memory-makers-photography.herokuapp.com/updateBooking/${_id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(updateStatus)
        })
        .then(res => res.json())
        .then(result => {
            if (result) {
                const newBookings = [...bookings];
                newBookings[index].status = e.target.value;
                setBookings(newBookings);
                setStatusUpdated(true);
            };
        });
    };

    return (
        <section className='mt-4'>
            <h1 className='color-primary'>Booking List</h1>
            <div className='pt-5 booking-list'>
                {bookings.length > 0 ?
                <div className='row'>
                    {isAdmin ?
                    <AllBookings bookings={bookings} handleStatusUpdate={handleStatusUpdate} statusUpdated={statusUpdated} />
                        :bookings.map(booking => <Booking key={booking._id} booking={booking} />)
                    }
                </div>:showSpinner ? <Spinner />:
                    <h4 className='text-center text-muted'>You Have No Bookings</h4>}
            </div>
        </section>
    );
};

export default BookingList;