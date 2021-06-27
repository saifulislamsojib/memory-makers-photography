import { CardCvcElement, CardExpiryElement, CardNumberElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useMemo, useState } from 'react';

const useOptions = () => {
    const options = useMemo(() => ({
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
    }), []);

    return options;
};

const CheckoutPaymentForm = ({handlePaymentCheckout}) => {
    const stripe = useStripe();
    const elements = useElements();
    const options = useOptions();

    const [error, seError] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();

        if (!stripe || !elements) return;

        

        const { paymentMethod, error } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardNumberElement)
          });

        if (error) {
            seError(error.message);
        } else {
            const {brand, exp_month, exp_year, last4} = paymentMethod.card;
            const paymentDetails = {paymentId: paymentMethod.id, brand, exp_month, exp_year, last4};
            handlePaymentCheckout(paymentDetails);
            seError('');
        }
    };

    return (
        <form className="mx-auto payment-form" onSubmit={handleSubmit}>
            <div className="">
                <label className="my-2">
                    Card Number
                </label>
                <CardNumberElement
                    options={options}
                />
            </div>
            <label className="my-2">
                Expiration date
            </label>
            <CardExpiryElement
                options={options}
            />
            <label className="my-2">
                CVC
            </label>
            <CardCvcElement
                options={options}
            />
            <div className="mt-3">
                <button className="d-block btn btn-outline-danger mt-sm-0 ms-auto" type="submit" disabled={!stripe}>
                    Purchase Now
                </button>
            </div>
            <p className="text-danger text-center mt-3">{error}</p>
        </form>
    );
};

export default CheckoutPaymentForm;