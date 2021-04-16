import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { userContext } from '../../../App';
import Navbar from '../../Shared/Navbar/Navbar';
import BookForm from '../BookForm/BookForm';
import BookingTable from '../BookingTable/BookingTable';
import ProcessPayment from '../ProcessPayment/ProcessPayment';

const Book = () => {

    const {id} = useParams();

    const history = useHistory();

    const [service, setService] = useState({});

    const [loggedInUser] = useContext(userContext);

    const [bookingInfo, setBookingInfo] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:4000/service/${id}`)
        .then(res => res.json())
        .then(data => setService(data));
    }, [id]);

    const onSubmit = data => {
        const newService = {...service};
        newService.status = 'Pending';
        setBookingInfo({...data, service: newService, user: loggedInUser});
    };

    const handlePaymentCheckout = paymentDetails => {
        fetch('http://localhost:4000/bookOrder', {
            method: 'POST',
            body: JSON.stringify({...bookingInfo, paymentDetails, orderDate: new Date().toDateString(), orderTime: new Date().toTimeString()}),
            headers: {"Content-Type": "application/json"}
        })
        .then(res => res.json())
        .then(result => {
            if (result) {
                history.push('/dashboard/bookingList');
            }
        });
    };

    return (
        <div className='container'>
            <Navbar />
            <BookingTable service={service} />
            <h2 className='color-primary mt-5 text-center'>Process Your Booking</h2>
            {bookingInfo ?
                <ProcessPayment handlePaymentCheckout={handlePaymentCheckout} price={service.price} />
                :<BookForm onSubmit={onSubmit} />}
        </div>
    );
};

export default Book;