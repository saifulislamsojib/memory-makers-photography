import React from 'react';
import images from '../../../images/image.png';
import tout from '../../../images/tour-photo.png';
import Wedding from '../../../images/wedding-photography.png';
import Service from '../Service/Service';

const services = [
    {
        title: 'Wedding Photography Bundle',
        image: Wedding,
        price: '150',
        features: [
            '100 edited Images',
            'unlimited Images Short',
            'unlimited Photography In 3 days'
        ],
        _id: '1'
    },
    {
        title: 'Tour Photography Bundle',
        image: tout,
        price: '200',
        features: [
            '100 edited Images',
            'unlimited Images Short',
            'unlimited Photography In 3 days'
        ],
        _id: '2'
    },
    {
        title: '100 Images With Edited Bundle',
        image: images,
        price: '100',
        features: [
            '100 edited Images',
            'unlimited Images Short',
            'unlimited Photography In 3 days'
        ],
        _id: '3'
    },
];

const Services = () => {
    return (
        <section className='mt-5 container'>
            <h1 className='mb-4 text-center color-primary'>Our Spacial Services</h1>
           <div className='row'>
                {
                    services.map(service => <Service service={service} key={service._id} /> )
                }
           </div>
        </section>
    );
};

export default Services;