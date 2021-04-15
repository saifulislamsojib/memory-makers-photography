import React from 'react';
import './Service.css';

const Service = ({service}) => {
    const {title, image, price, features} = service;
    return (
        <div className='col-lg-4 col-md-6 mb-3 text-center'>
            <div className='service p-4 radius h-100'>
                <img style={{height: '170px'}} className='img-fluid radius ' src={image} alt=""/>
                <h4 className='mt-3 text-center'>{title}</h4>
                <h5 className='color-primary'>price: ${price}</h5>
               <ul className='list-group list-group-flush mt-3'>
                    {
                        features.map(feature => <li className='list-group-item' key={feature}>{feature}</li>)
                    }
               </ul>
            </div>
        </div>
    );
};

export default Service;