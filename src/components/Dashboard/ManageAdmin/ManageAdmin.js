import { faTrashAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import swal from 'sweetalert';
import './ManageAdmin.css';

const AddAdmin = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const [isAdded, setIsAdded] = useState(false);

    const [admins, setAdmins] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/admins')
        .then(res => res.json())
        .then(data => setAdmins(data))
    }, [])

    const onSubmit = data => {
        fetch('http://localhost:4000/addAdmin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(result => setIsAdded(result));
    };

    const handleRemove = _id => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                fetch(`https://memory-makers-photography.herokuapp.com/deleteService/${_id}`, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json'}
                })
                .then(res=>res.json())
                .then(result=>{
                    if(result){
                        const newServices = admins.filter(admin=> admin._id!== _id);
                        setAdmins(newServices);
                        swal("Removed Successfully!", {
                            icon: "success",
                        });
                    }
                    else {
                        swal("Not Removed!", {icon: "error"});
                    }
                })
                .catch(err => swal("Not Removed!", {icon: "error"}));
            }
          });
    }

    return (
        <div className='mt-3 addAdmin'>
            <button className='d-block ms-auto btn btn-primary'>
            <FontAwesomeIcon icon={faUserPlus} className='me-2' />
                Add Admin
            </button>
            <div className='admin-table mt-3'>
                <table className="table table-hover">
                    <thead>
                        <tr>
                        <th scope="col"></th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th className='text-center'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            admins.map(({name, email, _id}, index) => (
                                <tr key={_id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{name||'No Name'}</td>
                                    <td>{email}</td>
                                    <td className='text-center'>
                                        <FontAwesomeIcon onClick={()=>handleRemove(_id)} icon={faTrashAlt} className='text-danger fs-3 action-icon' />
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <form className="row g-3 mt-2" onSubmit={handleSubmit(onSubmit)} >
                <div style={{maxWidth: '650px'}} className='mx-auto'>
                    <div className="col-12">
                        <label className='mb-2 ms-2' htmlFor="">name</label>
                        <input type="text" className="form-control" placeholder="name" {...register("name", { required: true })} />
                        {errors.name && <span className="text-danger d-inline-block mt-2">Name is required</span>}
                    </div>
                    <div className="col-12 mt-2">
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