import React, { useEffect, useState } from 'react';
import Service from '../Service/Service';

const Services = () => {

    const [services, setServices] = useState([]);

    // const handle = () => {
    //     fetch('http://localhost:4000/addService', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json'},
    //         body: JSON.stringify(services)
    //     })
    //     .then(res => res.json())
    //     .then(result => console.log(result));
    // };

    useEffect(() => {
        fetch('http://localhost:4000/services')
        .then(res => res.json())
        .then(data => setServices(data));
    }, []);

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