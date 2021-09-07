import React from 'react';
import closeShort from '../../../images/closeShort.jpg';
import TwoBird from '../../../images/closeup-shot-two-birds-playing-with-each-other-while-sitting.jpg';
import jornaShort from '../../../images/Jorna-Short.jpg';
import Photograph from '../Photograph/Photograph';

const photographs = [
    {
        title: 'Close Short',
        image: closeShort,
        id: '1',
        aos:"fade-right",
    },
    {
        title: 'Jorna Short',
        image: jornaShort,
        id: '2',
        aos:"fade-up",
    },
    {
        title: 'Two Bird Short',
        image: TwoBird,
        id: '3',
        aos:"fade-left",
    },
];

const Photographs = () => {
    return (
        <section className='mt-5 container'>
            <h1 className='mb-4 text-center color-primary'>Our Spacial Photographs</h1>
            <div className='row'>
                {
                    photographs.map(photograph => <Photograph photograph={photograph} key={photograph.id} />)
                }
            </div>
        </section>
    );
};

export default Photographs;