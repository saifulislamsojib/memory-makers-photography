import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import swal from 'sweetalert';
import { context } from '../../../App';
import { updateProfile } from '../../Login/Login/authManager';
import ReactModal from '../Modal/Modal';
import './Profile.css';

const Profile = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const { loggedInUser, setLoggedInUser } = useContext(context);
    const { name, email, photo } = loggedInUser;

    const [modalIsOpen,setIsOpen] = useState(false);

    const [imageUrl, setImageUrl] = useState(photo);

    const handelChange = e => {
        setImageUrl('');
        const imageData = new FormData();
        imageData.set('key', process.env.REACT_APP_IMAGE_KEY)
        imageData.append('image', e.target.files[0]);
        toast.promise(
            fetch('https://api.imgbb.com/1/upload',{
                method: 'POST',
                body: imageData,
            })
            .then(res => res.json())
            .then(result => {
                setImageUrl(result.data.display_url);
            }),
            {
            loading: 'Uploading...',
            success: <b>Uploaded Successfully!</b>,
            error: <b>Could not uploaded.</b>,
            }
        )
    }

    const updateUser = data => {
        if (imageUrl){
            toast.promise(
                updateProfile(data.name, imageUrl)
                .then( isUpdated => {
                    if (isUpdated){
                        setLoggedInUser(preUser => ({...preUser, name: data.name, photo: imageUrl}));
                        swal("Updated Successfully!", "Your Information Updated Successfully!", "success");
                        setIsOpen(false);
                    }
                }),
                {
                loading: 'Updating...',
                success: <b>Updated Successfully!</b>,
                error: <b>Could not updated.</b>,
                }
            )
            
        }
        else{
            swal("Upload An Image", "Please upload an image!", "error");
        }
    };

    return (
        <>
        <Toaster />
        <ReactModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen}>
            <div className="text-center p-4 radius profile">
                <div className="upload-image">
                    <input onChange={handelChange} type="file" name="" id="user-img" className='d-none' />
                    <label className="upload-btn btn" htmlFor="user-img">Upload</label>
                    <img style={{ height: '100px' }} className='rounded-pill' src={photo || 'https://uxwing.com/wp-content/themes/uxwing/download/12-people-gesture/avatar.png'} alt="" />
                </div>
                <form onSubmit={handleSubmit(updateUser)}>
                    <input className="my-3 form-control" defaultValue={name} {...register("name", { required: true })} />
                    {errors.name && <span className="text-danger">Name is required</span>}
                    <input className="my-3 form-control" defaultValue={email} readOnly />
                    <button disabled={imageUrl===''} className="btn btn-outline-primary d-block ms-auto">Update</button>
                </form>
            </div> 
        </ReactModal>
        <div className="d-flex align-items-center justify-content-center profile-container">
           <div className="text-center shadow p-4 radius profile">
                <img style={{height: '100px'}} className='radius' src={photo || 'https://uxwing.com/wp-content/themes/uxwing/download/12-people-gesture/avatar.png'} alt="" />
                <h4 className="my-3">{name}</h4>
                <h6>{email}</h6>
                <button onClick={() => setIsOpen(true)} className="btn btn-primary mt-3">Edit <FontAwesomeIcon icon={faEdit} className="ms-2" /></button>
           </div>
        </div>
        </>
    );
};

export default Profile;