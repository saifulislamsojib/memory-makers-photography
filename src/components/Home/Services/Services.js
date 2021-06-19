import React, { useContext, useEffect } from 'react';
import { context } from '../../../App';
import Service from '../Service/Service';

const Services = ({book}) => {

    const { services, setServices } = useContext(context);

    useEffect(() => {
        let unsubscribe = true;
        if (!services.length){
            fetch('https://memory-makers-photography.herokuapp.com/services')
            .then(res => res.json())
            .then(data => unsubscribe&&setServices(data));
        }
        return () => unsubscribe = false;
    }, [setServices, services]);

    return (
        <section id="services" className={book?'mt-3 maxWidth mx-auto':'mt-5 pt-5 container'}>
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