import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';

const CheckoutPaymentForm = ({handlePaymentCheckout, price}) => {
    const stripe = useStripe();
    const elements = useElements();

    const [paymentError, setPaymentError] = useState('');

    const [paymentSuccess, setPaymentSuccess] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
        return;
        }

        const cardElement = elements.getElement(CardElement);

        const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        });

        if (error) {
            setPaymentError(error.message);
            setPaymentSuccess('');
        } else {
            const {brand, exp_month, exp_year, last4} = paymentMethod.card;
            const paymentDetails = {paymentId: paymentMethod.id, brand, exp_month, exp_year, last4};
            handlePaymentCheckout(paymentDetails);
            setPaymentSuccess(paymentMethod.id);
            setPaymentError('');
        }
    };

    return (
        <form style={{maxWidth: '700px'}} className="mx-auto mt-5" onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                      base: {
                        letterSpacing: '2px',
                        fontSize: '18px',
                        color: '#424770',
                        '::placeholder': {
                          color: '#aab7c4',
                        },
                      },
                      invalid: {
                        color: '#9e2146',
                      },
                    },
                }}
            />
            <div className='mt-4 d-sm-flex align-items-center'>
                <h6 className='mt-2'>Your Total Service Charge: ${price}</h6>
                <button className="btn btn-outline-danger mt-2 mt-sm-0 ms-auto" type="submit" disabled={!stripe}>
                    Purchase Now
                </button>
            </div>
            {
                paymentError && <p className="text-danger text-center mt-3">{paymentError}</p>
            }
            {
                paymentSuccess && <p className="text-success text-center mt-3">Your payment has been successfully completed</p>
            }
        </form>
    );
};

export default CheckoutPaymentForm;