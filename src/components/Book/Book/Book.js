import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { userContext } from '../../../App';
import Services from '../../Home/Services/Services';
import Spinner from '../../Shared/Spinner/Spinner';
import BookForm from '../BookForm/BookForm';
import BookingTable from '../BookingTable/BookingTable';
import ProcessPayment from '../ProcessPayment/ProcessPayment';

const Book = () => {

    useEffect(() => {
        document.title = 'service-booking';
    }, [])

    const {id} = useParams();

    const history = useHistory();

    const [service, setService] = useState({});

    const [loggedInUser] = useContext(userContext);

    const [showSpinner, setShowSpinner] = useState(true);

    const [bookingInfo, setBookingInfo] = useState(null);

    useEffect(() => {
        fetch(`https://memory-makers-photography.herokuapp.com/service/${id}`)
        .then(res => res.json())
        .then(data => {
            setService(data);
            setShowSpinner(false);
        })
        .catch(err => setShowSpinner(false));
    }, [id]);

    const onSubmit = data => {
        setBookingInfo({...data, service, user: loggedInUser});
    };

    const handlePaymentCheckout = paymentDetails => {
        fetch('https://memory-makers-photography.herokuapp.com/bookOrder', {
            method: 'POST',
            body: JSON.stringify({...bookingInfo, paymentDetails, orderDate: new Date().toDateString(), orderTime: new Date().toTimeString(), status: 'Pending'}),
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
        <div style={{minHeight: '64.5vh'}}>
            {service.title ?
            <>
                <BookingTable service={service} />
                <h2 className='color-primary mt-5 text-center'>Process Your Booking</h2>
                {bookingInfo ?
                    <ProcessPayment handlePaymentCheckout={handlePaymentCheckout} price={service.price} />
                :<BookForm onSubmit={onSubmit} />}
            </>:showSpinner ? <Spinner />:<Services />}
        </div>
    );
};

export default Book;