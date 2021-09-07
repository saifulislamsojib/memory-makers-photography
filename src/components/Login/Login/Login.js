import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import toast, { Toaster } from 'react-hot-toast';
import { useHistory, useLocation } from 'react-router-dom';
import swal from 'sweetalert';
import { context } from '../../../App';
import LoginImg from '../../../images/login-bg.png';
import Spinner from '../../Shared/Spinner/Spinner';
import { createUser, deleteUser, fbSignIn, getToken, googleSignIn, sendEmailVerification, signingUser } from './authManager';
import './Login.css';

const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const [showPassword, setShowPassword] = useState(false);

    const [newUser, setNewUser] = useState(false);

    const { loggedInUser, setLoggedInUser, loading, setAdminLoaded, isDarkMode } = useContext(context);

    const [emailVerification, setEmailVerification] = useState('');

    const history = useHistory();
    const location = useLocation();

    const { from } = location.state || { from: { pathname: "/" } };

    useEffect(() => {
        document.title = 'memory-makers-login';
    }, [])

    const sendMail= () => {
        toast.promise(
            sendEmailVerification(from.pathname)
            .then(res => {
                if (res){
                    setEmailVerification('Verify Your Email Address');
                }
                else{
                    
                }
            }),
            {
                loading: 'Loading, Please Wait...',
                success: 'Email Send Successfully',
                error: 'Email Not Sended'
            }
        )
    }
    
    const updateState = (res, toastId) => {
        toast.dismiss(toastId);
        if (res.email) {
            toast.success(`${newUser?'Account Created':'Login'} Successfully`);
            if (!res.emailVerified) {
                sendMail();
            }
            else{
                getToken()
                .then(idToken => {
                    if (idToken) {
                        sessionStorage.setItem('Photography/idToken', `Bearer ${idToken}`);
                        setLoggedInUser(res);
                        setAdminLoaded(false);
                        history.replace(from);
                    };
                });
            }
        }
        else{
            toast.error(newUser?'Account Not Created':'Not Login');
            swal('Login Error', res, 'error');
        }
    }

    const onSubmit = data => {
        const {email, password, name, confirmPassword} = data;
        if (newUser) {
            if (password === confirmPassword) {
                const toastId = toast.loading('Loading, Please Wait...');
                createUser(email, password, name)
                .then(res => updateState(res, toastId))
            }
            else{
                swal('Password Not Matched', {icon: 'error'})
            }
        }
        else{
            const toastId = toast.loading('Loading, Please Wait...');
            signingUser(email, password)
            .then(res => updateState(res, toastId));
        }
    };

    const SignInWithProvider = (provider) => {
        const toastId = toast.loading('Loading, Please Wait...');
        provider()
        .then(res => updateState(res, toastId));
    }

    const handleSignOut = () => {
        deleteUser()
        .then(is => {
            if(is) {
                setLoggedInUser({});
                sessionStorage.removeItem('Photography/idToken');
            }
        })
    };

    useEffect(() => {
        if(!loading && loggedInUser.emailVerified){
            history.replace('/');
        }
        if(!loading && !loggedInUser.email){
            toast.custom(<div className={`${isDarkMode?'bg-dark text-light': 'bg-light text-dark'} p-2 rounded`}><div> <div className="text-center">For Admin</div> Admin Email: saifulsojibdev@gmail.com</div><div>Admin Password: 144395</div></div>)
        }
    }, [loading, loggedInUser, history, isDarkMode])

    return (
        <>
        {!loading &&
        <div className="my-2 position-absolute exit-container">
            <button onClick={() => history.push('/')} className='btn primary-btn'>Go TO Home</button>
        </div>}
        <div className="container mt-5 mt-md-0">
            <Toaster />
            {loading ? <Spinner /> :
            <div className="login row">
                <div className='col-lg-6 mb-4 mb-lg-0 loggedInContainer'>
                    {emailVerification || loggedInUser.emailVerified ===false ?
                    <div className='alert-warning text-center p-4 radius'>
                        <h3>{emailVerification || 'Verify Your Email Address'}</h3>
                        <small className='d-block'>you received an email at: {loggedInUser.email}</small>
                        <button onClick={sendMail} className='mt-2 btn btn-outline-success'>Resend Email</button>
                        <button onClick={handleSignOut} className='mt-2 btn btn-outline-danger d-block mx-auto'>Log Out</button>
                    </div>:
                    <div className="my-4 mx-auto mx-lg-0 login-inner">
                        <form className="email-password-login" onSubmit={handleSubmit(onSubmit)}>
                            <h2 className='mb-5'>{newUser ? "Create an account" : 'Login'}</h2>
                            <div className={newUser?'form-floating my-3':'d-none'}>
                                <input autoComplete="username" className='form-control input' type='text' {...register("name", { required: newUser })} id="name" placeholder="Enter your Name" />
                                <label className='text-muted' htmlFor="name">Enter your Name</label>
                                {errors.name && <span className="text-danger d-inline-block mt-2 ms-2">Name is required</span>}
                            </div>

                            <div className='form-floating my-3'>
                                <input autoComplete="username" className='form-control input' type='email' {...register("email", { required: true, pattern: /\S+@\S+\.\S+/ })} id="email" placeholder="Enter your Email" />
                                <label className='text-muted' htmlFor="email">Enter your Email</label>
                                {errors.email && <span className="text-danger d-inline-block mt-2 ms-2">Valid Email is required</span>}
                            </div>
                            
                            <div className='password-section form-floating my-3'>
                                <input autoComplete="current-password" className='input form-control' type={showPassword?'text':'password'} {...register("password", { required: true, minLength: 6 })} id="password" placeholder="Enter Password" />
                                <FontAwesomeIcon onClick={()=>setShowPassword(!showPassword)} className='eye' icon={showPassword?faEyeSlash:faEye} />
                                <label className='text-muted' htmlFor="password">Enter Password</label>
                                {errors.password && <span className="text-danger d-inline-block mt-2 ms-2">Password required Minimum 6 Character</span>}
                            </div>

                            <div className={newUser?'form-floating my-3 password-section':'d-none'}>
                                <input autoComplete="current-password" className='input form-control' type={showPassword?'text':'password'} {...register("confirmPassword", { required: newUser })} id="ConfirmPassword" placeholder="Confirm Password" />
                                <FontAwesomeIcon onClick={()=>setShowPassword(!showPassword)} className='eye' icon={showPassword?faEyeSlash:faEye} />
                                <label className='text-muted' htmlFor="confirmPassword">Confirm Password</label>
                                {errors.confirmPassword && <span className="text-danger d-inline-block mt-2 ms-2">Confirm Password is required</span>}
                            </div>

                            <div className='d-flex justify-content-between mt-2'>
                                <div>
                                    <input type="checkbox" className="me-2" name="" id="remember"/>
                                    <label htmlFor="remember">Remember Me</label>
                                </div>
                                { !newUser && <a href="#forgot">Forgot Password</a>}
                            </div>
                            <input className='input w-100 btn btn-outline-success my-3 p-2' type="submit" value={newUser ? 'Create Account' : 'Login'} />
                            <h6 className='text-center'>{newUser ? 'Already' :"Don't"} have an account ? <span onClick={()=> setNewUser(!newUser)} className="text-primary ms-2 create-account">{newUser ? 'Login' : 'Create an account'}</span></h6>
                        </form>
                        <h5 className='text-center my-4'>Or</h5>
                        <div className="d-flex justify-content-center header-icon">
                            <div className="header-links link-1 mx-1">
                                <FontAwesomeIcon onClick={() => SignInWithProvider(fbSignIn)} icon={faFacebook} />
                            </div>
                            <div className="header-links link-3 mx-1">
                                <FontAwesomeIcon onClick={() => SignInWithProvider(googleSignIn)} icon={faGoogle} />
                            </div>
                        </div>
                    </div>}
                </div>
                <div className='col-lg-6 mb-3 mb-lg-0 image-container'>
                    <img className='img-fluid' src={LoginImg} alt=""/>
                </div>
            </div>}
        </div>
        </>
    );
};

export default Login;