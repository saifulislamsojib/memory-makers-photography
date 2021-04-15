import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { userContext } from '../../../App';
import Navbar from '../../Shared/Navbar/Navbar';

const Book = () => {

    const {id} = useParams();

    const [service, setService] = useState({});

    const [loggedInUser] = useContext(userContext);

    const { register, handleSubmit, formState: { errors } } = useForm();

    useEffect(() => {
        fetch(`http://localhost:4000/service/${id}`)
        .then(res => res.json())
        .then(data => setService(data));
    }, [id]);

    const onSubmit = data => {
        console.log(data);
    };

    return (
        <div className='container'>
            <Navbar />
            <h2 className='color-primary mt-5 text-center'>Process Your Booking</h2>
            <form style={{maxWidth: '600px'}} className="row mx-auto g-3 mt-3" onSubmit={handleSubmit(onSubmit)} >
                <div className="col-12">
                    <input defaultValue={loggedInUser.name} type="text" className="form-control" placeholder="Name" {...register("name", { required: true })} />
                    {errors.name && <span className="text-danger">Name is required</span>}
                </div>
                <div className="col-12">
                    <input defaultValue={loggedInUser.email} type="email" className="form-control"  placeholder="Email" {...register("email", { required: true })} />
                    {errors.email && <span className="text-danger">Email is required</span>}
                </div>
                <div className="col-12">
                    <input  type="text" className="form-control"  placeholder="Address" {...register("address", { required: true })} />
                    {errors.address && <span className="text-danger">Email is required</span>}
                </div>
                <div className="col">
                <input className='d-block btn btn-outline-danger ms-auto' type="submit" value="Purchase Now"/>
                </div>
            </form>
        </div>
    );
};

export default Book;