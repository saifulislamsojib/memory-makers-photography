import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { useHistory, useLocation } from 'react-router-dom';
import { context } from '../../../App';
import LoginImg from '../../../images/login.jpg';
import Spinner from '../../Shared/Spinner/Spinner';
import { createUser, fbSignIn, getToken, googleSignIn, sendEmailVerification, signingUser, userSignOut } from './authManager';
import './Login.css';

const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const [showPassword, setShowPassword] = useState({
        passwordType: 'password',
        passwordIcon: faEyeSlash
    });

    const [newUser, setNewUser] = useState(false);

    const { loggedInUser, setLoggedInUser, loading } = useContext(context);

    const [loginError, setLoginError] =useState('');

    const [emailVerification, setEmailVerification] = useState('');

    const history = useHistory();
    const location = useLocation();

    const { from } = location.state || { from: { pathname: "/" } };

    const sendMail= () => {
        setEmailVerification('')
        sendEmailVerification(from.pathname)
        .then(res => {
            if (res){
                setEmailVerification('Verify Your Email Address');
            }
        })
    }
    
    const updateState = res => {
        if (res.email) {
            setLoginError('')
            if (!res.emailVerified) {
                sendMail();
            }
            getToken()
            .then(idToken => {
                if (idToken) {
                    sessionStorage.setItem('Photography/idToken', `Bearer ${idToken}`);
                    setLoggedInUser(res);
                    history.replace(from);
                };
            });
        }
        else{
            setLoginError(res);
        }
    }

    const onSubmit = data => {
        const {email, password, name, confirmPassword} = data;
        if (newUser) {
            if (password === confirmPassword) {
                createUser(email, password, name)
                .then(res => {
                    updateState(res);
                })
            }
            else{
                setLoginError('Password Not Matched');
            }
        }
        else{
            signingUser(email, password)
            .then(res => {
                updateState(res);
            })
        }
    };

    const SignInWithProvider = (provider) => {
        provider()
        .then(res => {
            updateState(res);
        })
    }

    const handlePasswordType = () => {
        const passwordType = showPassword.passwordType === 'password' ? 'text' : 'password';
        const passwordIcon = showPassword.passwordIcon === faEye ? faEyeSlash : faEye;
        setShowPassword({passwordType, passwordIcon});
    };

    const handleSignOut = () => {
        userSignOut()
        .then(() => {
            setLoggedInUser({})
            sessionStorage.removeItem('Photography/idToken');
        })
    };

    const {passwordType, passwordIcon} = showPassword;
    return (
        <div className="container">
            {loading ? <Spinner /> :
                <div className="login row">
                <div className='col-lg-6 mb-4 mb-lg-0'>
                    {emailVerification || loggedInUser.emailVerified ===false ?
                    <div className='alert-warning text-center p-4 radius'>
                        <h3>{emailVerification || 'Verify Your Email Address'}</h3>
                        <small className='d-block'>you received a email at: {loggedInUser.email}</small>
                        <button onClick={sendMail} className='mt-2 btn btn-outline-success'>Resend Email</button>
                        <button onClick={handleSignOut} className='mt-2 btn btn-outline-danger d-block mx-auto'>Log Out</button>
                    </div>:
                    <div className="my-4 mx-auto mx-lg-0 login-inner">
                        <form className="email-password-login" onSubmit={handleSubmit(onSubmit)}>
                            <h2 className='mb-5'>{newUser ? "Create an account" : 'Login'}</h2>
                            {newUser && <div className='form-floating my-3'>
                                <input autoComplete="username" className='form-control input' type='text' {...register("name", { required: true })} id="name" placeholder="Enter your Name" />
                                <label className='text-muted' htmlFor="name">Enter your Name</label>
                                {errors.name && <span className="text-danger d-inline-block mt-2">Name is required</span>}
                            </div>}

                            <div className='form-floating my-3'>
                                <input autoComplete="username" className='form-control input' type='email' {...register("email", { required: true, pattern: /\S+@\S+\.\S+/ })} id="email" placeholder="Enter your Email" />
                                <label className='text-muted' htmlFor="email">Enter your Email</label>
                                {errors.email && <span className="text-danger d-inline-block mt-2">Enter is required</span>}
                            </div>
                            
                            <div className='password-section form-floating my-3'>
                                <input autoComplete="current-password" className='input form-control' type={passwordType} {...register("password", { required: true, minLength: 6 })} id="password" placeholder="Enter Password" />
                                <FontAwesomeIcon onClick={handlePasswordType} className='eye' icon={passwordIcon} />
                                <label className='text-muted' htmlFor="password">Enter Password</label>
                                {errors.password && <span className="text-danger d-inline-block mt-2">Password required Minimum 6 Character</span>}
                            </div>

                            { newUser && <div className='password-section form-floating my-3'>
                                <input autoComplete="current-password" className='input form-control' type={passwordType} {...register("confirmPassword", { required: true })} id="ConfirmPassword" placeholder="Confirm Password" />
                                <FontAwesomeIcon onClick={handlePasswordType} className='eye' icon={passwordIcon} />
                                <label className='text-muted' htmlFor="confirmPassword">Confirm Password</label>
                                {errors.confirmPassword && <span className="text-danger d-inline-block mt-2">Confirm Password is required</span>}
                            </div>}

                            <div className='d-flex justify-content-between mt-2'>
                                <div>
                                    <input type="checkbox" className="me-2" name="" id="remember"/>
                                    <label htmlFor="remember">Remember Me</label>
                                </div>
                                { !newUser && <a href="#forgot">Forgot Password</a>}
                            </div>
                            <input className='input w-100 btn btn-outline-success my-3 p-2' type="submit" value={newUser ? 'Create Account' : 'Login'} />
                            <p className='text-danger text-center py-2 error'>{loginError}</p>
                            <h6 className='text-center'>{newUser ? 'Already' :"Don't"} have an account ? <span onClick={()=> setNewUser(!newUser)} className="text-primary ms-2 create-account">{newUser ? 'Login' : 'Create an account'}</span></h6>
                        </form>
                        <h5 className='text-center my-4'>Or</h5>
                        <div className="text-center">
                            <FontAwesomeIcon onClick={() =>SignInWithProvider(fbSignIn)} className='icon fb mx-2' icon={faFacebook} />
                            <FontAwesomeIcon onClick={() =>SignInWithProvider(googleSignIn)} className='icon google mx-2' icon={faGoogle} />
                        </div>
                    </div>}
                </div>
                <div className='col-lg-6 mb-3 mb-lg-0'>
                    <img className='img-fluid' src={LoginImg} alt=""/>
                </div>
            </div>}
        </div>
    );
};

export default Login;