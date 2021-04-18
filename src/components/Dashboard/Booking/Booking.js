import React from 'react';

const Booking = ({booking}) => {
    const {title, price, image, features} = booking.service;
    const {status} = booking;
    return (
        <div className='col-xl-4 col-md-6 mb-3' style={{maxHeight: '500px'}} >
            <div className='p-4 radius h-100 shadow bg-white'>
                <div className='d-flex align-items-center justify-content-between mb-3'>
                    <img className='img-fluid' style={{height: '100px'}} src={image} alt=""/>
                    <h6 className={`text-${status==="Pending"?'danger':'success'}`}>{status}</h6>
                </div>
                <h5>{title}</h5>
                <h6 className='color-primary my-2'>${price}</h6>
                <h6>Booking Date: <span className='color-primary'>{booking.orderDate}</span></h6>
                <h6 className='mt-3'>Features :</h6>
                <ul className='list-group list-group-flush'>
                    {
                        features.map((feature, index) => <li className='list-group-item' key={index}>{feature}</li> )
                    }
                </ul>
            </div>
        </div>
    );
};

export default Booking;