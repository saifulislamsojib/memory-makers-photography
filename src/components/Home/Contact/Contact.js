import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { userContext } from '../../../App';

const Contact = () => {

    const [loggedInUser] = useContext(userContext);

    const { register, handleSubmit, formState: { errors } } = useForm();

    const [sended, isSended] = useState(false);

    const onSubmit = data => {
        fetch('https://memory-makers-photography.herokuapp.com/sendMessage', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(result => isSended(result));
    };

    return (
        <section id="contacts" className='container'>
            <h1 className='color-primary text-center mb-3'>Contact Us</h1>
            <form className="row g-3 mt-3" onSubmit={handleSubmit(onSubmit)} >
                <div className="col-md-6">
                    <label className='mb-2 ms-2' htmlFor="">Name</label>
                    <input defaultValue={loggedInUser.name} type="text" className="form-control radius" placeholder="Name" {...register("name", { required: true })} />
                    {errors.name && <span className="text-danger d-inline-block mt-2">Name is required</span>}
                </div>
                <div className="col-md-6">
                    <label className='mb-2 ms-2' htmlFor="">Email</label>
                    <input defaultValue={loggedInUser.email} type="email" className="form-control radius" placeholder="Email" {...register("email", { required: true })} />
                    {errors.email && <span className="text-danger d-inline-block mt-2">Email is required</span>}
                </div>
                <div className="col-md-6">
                    <label className='mb-2 ms-2' htmlFor="">Phone</label>
                    <input type="text" className="form-control radius" placeholder="Phone Number" {...register("phone", { required: true })} />
                    {errors.phone && <span className="text-danger d-inline-block mt-2">Phone Number is required</span>}
                </div>
                <div className="col-md-6">
                    <label className='mb-2 ms-2' htmlFor="">Address <span className="text-muted">(Optional)</span></label>
                    <input type="text" className="form-control radius" placeholder="Address" {...register("address")} />
                </div>
                <div className="col-12">
                    <label className='mb-2 ms-2' htmlFor="">Write Message</label>
                    <textarea style={{height: '200px'}} className="form-control radius"  placeholder="Write Message" {...register("message", { required: true, minLength: 50 })} />
                    {errors.message && <span className="text-danger d-inline-block mt-2">Message is required minimum Length 50</span>}
                </div>
                <div>
                    <input className='d-block btn btn-outline-danger ms-auto' type="submit" value="send"/>
                </div>
                {sended && <h5 className="text-success text-center mt-5">Contact Message successfully sended</h5>}
            </form>
        </section>
    );
};

export default Contact;