import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import swal from 'sweetalert';
import { context } from '../../../App';
import Services from '../../Home/Services/Services';
import Spinner from '../../Shared/Spinner/Spinner';
import BookForm from '../BookForm/BookForm';
import BookingTable from '../BookingTable/BookingTable';
import ProcessPayment from '../ProcessPayment/ProcessPayment';

const Book = ({setBookings}) => {

    useEffect(() => {
        document.title = 'service-booking';
    }, [])

    const {id} = useParams();

    const [service, setService] = useState({});

    const { loggedInUser } = useContext(context);

    const [showSpinner, setShowSpinner] = useState(true);

    const [bookingInfo, setBookingInfo] = useState(null);

    useEffect(() => {
        let unsubscribe = true;
        id!==undefined?fetch(`https://memory-makers-photography.herokuapp.com/service/${id}`)
        .then(res => res.json())
        .then(data => {
            if (unsubscribe){
                setService(data);
                setShowSpinner(false);
            }
        })
        .catch(err => setShowSpinner(false))
        : setShowSpinner(false);
        return ()=> unsubscribe = false;
    }, [id]);

    const onSubmit = data => {
        setBookingInfo({...data, service, user: loggedInUser});
    };

    const handlePaymentCheckout = paymentDetails => {
        const bookingData = {...bookingInfo, paymentDetails, orderDate: new Date().toDateString(), orderTime: new Date().toTimeString(), status: 'Pending'};
        fetch('https://memory-makers-photography.herokuapp.com/bookOrder', {
            method: 'POST',
            body: JSON.stringify(bookingData),
            headers: {"Content-Type": "application/json"}
        })
        .then(res => res.json())
        .then(({inserted, _id}) => {
            if (inserted) {
                setBookings(preBookings=> preBookings.length?[{...bookingData, _id}, ...preBookings]:preBookings);
                swal('Booking Successfully!','Your booking successfully done!', "success");
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
            </>:showSpinner ? <Spinner />:<Services book />}
        </div>
    );
};

export default Book;