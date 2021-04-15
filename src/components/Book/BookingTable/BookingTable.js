import React from 'react';

const BookingTable = ({service}) => {
    return (
        <table className="table mt-5">
            <thead>
                <tr>
                    <th scope="col">Logo</th>
                    <th scope="col">Title</th>
                    <th scope="col">Price</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <img style={{height: '40px'}} src={service.image} alt=""/>
                    </td>
                    <td className='pt-3'>{service.title}</td>
                    <td className='pt-3'>${service.price}</td>
                </tr>
            </tbody>
        </table>
    );
};

export default BookingTable;