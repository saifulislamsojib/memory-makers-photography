import React, { useEffect, useState } from 'react';
import Service from '../Service/Service';

const Services = () => {

    const [services, setServices] = useState([]);
    
    useEffect(() => {
        const unsubscribe = fetch('https://memory-makers-photography.herokuapp.com/services')
        .then(res => res.json())
        .then(data => setServices(data));
        return unsubscribe;
    }, []);

    return (
        <section id="services" className='mt-5 container'>
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