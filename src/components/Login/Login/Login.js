import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { useHistory, useLocation } from 'react-router-dom';
import { userContext } from '../../../App';
import LoginImg from '../../../images/login.jpg';
import { createUser, fbSignIn, getToken, googleSignIn, signingUser } from './authManager';
import './Login.css';

const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const [showPassword, setShowPassword] = useState({
        passwordType: 'password',
        passwordIcon: faEyeSlash
    });

    const [newUser, setNewUser] = useState(false);

    const [, setLoggedInUser] = useContext(userContext);

    const [loginError, setLoginError] =useState('');

    const history = useHistory();
    const location = useLocation();

    const { from } = location.state || { from: { pathname: "/" } };

    const updateState = res => {
        if (res.email) {
            setLoginError('')
            getToken()
            .then(result => {
                if (result) {
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

    const {passwordType, passwordIcon} = showPassword;
    return (
        <div className="container">
            <div className="login row">
                <div className='col-lg-6 mb-4 mb-lg-0'>
                    <div className="my-4 mx-auto mx-lg-0 login-inner">
                        <form className="email-password-login" onSubmit={handleSubmit(onSubmit)}>
                            <h2 className='mb-5'>{newUser ? "Create an account" : 'Login'}</h2>
                            {newUser && <div className='form-floating my-3'>
                                <input className='form-control input' type='text' {...register("name", { required: true })} id="name" placeholder="Enter your Name" />
                                <label className='text-muted' htmlFor="name">Enter your Name</label>
                                {errors.name && <span className="text-danger d-inline-block mt-2">Name is required</span>}
                            </div>}

                            <div className='form-floating my-3'>
                                <input className='form-control input' type='email' {...register("email", { required: true, pattern: /\S+@\S+\.\S+/ })} id="email" placeholder="Enter your Email" />
                                <label className='text-muted' htmlFor="email">Enter your Email</label>
                                {errors.email && <span className="text-danger d-inline-block mt-2">Enter is required</span>}
                            </div>
                            
                            <div className='password-section form-floating my-3'>
                                <input className='input form-control' type={passwordType} {...register("password", { required: true, minLength: 6 })} id="password" placeholder="Enter Password" />
                                <FontAwesomeIcon onClick={handlePasswordType} className='eye' icon={passwordIcon} />
                                <label className='text-muted' htmlFor="password">Enter Password</label>
                                {errors.password && <span className="text-danger d-inline-block mt-2">Password required Minimum 6 Character</span>}
                            </div>

                            { newUser && <div className='password-section form-floating my-3'>
                                <input className='input form-control' type={passwordType} {...register("confirmPassword", { required: true })} id="ConfirmPassword" placeholder="Confirm Password" />
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
                    </div>
                </div>
                <div className='col-lg-6 mb-3 mb-lg-0'>
                    <img className='img-fluid' src={LoginImg} alt=""/>
                </div>
            </div>
        </div>
    );
};

export default Login;