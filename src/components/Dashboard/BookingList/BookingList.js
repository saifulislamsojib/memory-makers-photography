import React, { useContext, useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { userContext } from '../../../App';
import Spinner from '../../Shared/Spinner/Spinner';
import AllBookings from '../AllBookings/AllBookings';
import Booking from '../Booking/Booking';

const BookingList = ({isAdmin}) => {

    useEffect(() => {
        document.title = 'booking-list';
    }, [])

    const [bookings, setBookings] = useState([]);

    const [loggedInUser] = useContext(userContext);

    const [showSpinner, setShowSpinner] = useState(true);

    useEffect(() => {
        const token = sessionStorage.getItem('Photography/idToken');
        fetch(`https://memory-makers-photography.herokuapp.com/allBookings?email=${loggedInUser.email}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: token
            }
        })
        .then(res => res.json())
        .then(data => {
            setBookings([...data].reverse());
            setShowSpinner(false);
        })
    }, [loggedInUser]);

    const handleStatusUpdate = (e, _id, index) => {
        const updateStatus = { status: e.target.value }
        toast.promise(
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
                };
            }),
            {
            loading: 'Updating...',
            success: <b>Updated Successfully!</b>,
            error: <b>Could not update.</b>,
            }
        );
    };

    return (
        <section className='mt-4'>
             <Toaster />
            <div className='pt-5 booking-list'>
                {bookings.length > 0 ?
                <div className='row'>
                    {isAdmin ?
                    <AllBookings bookings={bookings} handleStatusUpdate={handleStatusUpdate} />
                        :bookings.map(booking => <Booking key={booking._id} booking={booking} />)
                    }
                </div>:showSpinner ? <Spinner />:
                    <h4 className='text-center text-muted'>You Have No Bookings</h4>}
            </div>
        </section>
    );
};

export default BookingList;