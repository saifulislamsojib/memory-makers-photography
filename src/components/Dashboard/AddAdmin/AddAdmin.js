import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const AddAdmin = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const [isAdded, setIsAdded] = useState(false);

    const onSubmit = data => {
        setIsAdded(false)
        fetch('https://memory-makers-photography.herokuapp.com/addAdmin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(result => setIsAdded(result));
    };

    return (
        <div className='mt-4'>
            <h1 className='color-primary'>Add A Admin</h1>
            <form className="row g-3 mt-2 addAdmin" onSubmit={handleSubmit(onSubmit)} >
                <div style={{maxWidth: '650px'}} className='mx-auto'>
                    <div className="col-12">
                        <label className='mb-2 ms-2' htmlFor="">Email</label>
                        <input type="email" className="form-control" placeholder="email" {...register("email", { required: true, pattern: /\S+@\S+\.\S+/ })} />
                        {errors.email && <span className="text-danger d-inline-block mt-2">Valid email is required</span>}
                    </div>
                    <div className="col mt-3">
                        <input className='d-block btn btn-info ms-auto' type="submit" value="Add Admin"/>
                    </div>
                    {isAdded && <h5 className="text-success text-center mt-5">Admin successfully Added</h5>}
                </div>
            </form>
        </div>
    );
};

export default AddAdmin;