import React from 'react';
import { useHistory } from 'react-router-dom';
import './Service.css';

const Service = ({service}) => {

    const history = useHistory();

    const {title, image, price, features, _id} = service;
    return (
        <div data-aos="fade-up" className='col-xl-4 col-lg-6 mb-3 text-center'>
            <div onClick={() => history.push(`/dashboard/book/${_id}`)} className='service p-4 radius h-100'>
                <img style={{height: '170px'}} className='img-fluid radius service-img' src={image} alt=""/>
                <h4 className='mt-3 text-center'>{title}</h4>
                <h5 className='color-primary mt-3'>price: ${price}</h5>
                <h5 className='mt-3'>Features :</h5>
               <ul className='list-group list-group-flush'>
                    {
                        features.map((feature, index) => <li className='list-group-item' key={index}>{feature}</li>)
                    }
               </ul>
            </div>
        </div>
    );
};

export default Service;