import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { formIsValid, inputIsValid } from '../../utils/validationUtils';
import { register } from '../../utils/userUtils';
import back from '../../assets/icons/left_line.svg';
import './Register.scss';

function Register() {
    let [ inputs, setInputs ] = useState({email: '', username: '', password: '', confirmPassword: ''});
    let { email, username, password, confirmPassword } = inputs;

    let [ errors, setErrors] = useState({email: [], username: [], password: [], confirmPassword: []});
    let { email: emailErrors, username: usernameErrors, password: passwordErrors, confirmPassword: confirmPasswordErrors } = errors;

    let [ message, setMessage ] = useState(null);

    let navigate = useNavigate();

    function handleInputChange(event) {
        let { name, value } = event.target;
        setInputs({...inputs, [name]: value});
    }

    function handleInputBlur(event) {
        const { name, value } = event.target;
        setErrors({...errors, [name]: inputIsValid(name, value, password, true)});
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if (formIsValid(inputs)) {
            try {
                await register({ username: username, email: email, password: password });
                
                setInputs({email: '', username: '', password: '', confirmPassword: ''});

                setMessage("Account created successfully");
                setTimeout(() => {navigate('/login')}, 3000);
            } catch (error) {
                console.log('error creating account', error);
                setMessage("Error creating account");
            }
        } else {
            setMessage("Error creating account");
        }
    }

    return (
        <div className='page page--register'>
            <Link to='/' className="back-button back-button--register">
                <img 
                    src={back} 
                    alt="back" 
                    className="back-button__image back-button__image--register" 
                />
                <span className="back-button__text back-button__text--register">Back</span>
            </Link>
            <form className='register-form' onSubmit={handleSubmit}>
                <h1 className='register-form__title'>Create an Account</h1>
                <input 
                    type="text" 
                    name='email' 
                    className={`register-form__input ${emailErrors.length !== 0 && 'register-form__input--invalid'}`}
                    placeholder='Email'
                    value={email}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                />
                { emailErrors.length !== 0 && <p className="register-form__error">
                    {emailErrors[0]}
                </p>}
                <input 
                    type="text" 
                    name='username' 
                    className={`register-form__input ${usernameErrors.length !== 0 && 'register-form__input--invalid'}`}
                    placeholder='Username'
                    value={username}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                />
                { usernameErrors.length !== 0 && <p className="register-form__error">
                    {usernameErrors[0]}
                </p> }
                <input 
                    type="password" 
                    name='password' 
                    className={`register-form__input ${passwordErrors.length !== 0 && 'register-form__input--invalid'}`}
                    placeholder='Password'
                    value={password}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur} 
                />
                { passwordErrors.length !== 0 && <p className="register-form__error">
                    {passwordErrors[0]}
                </p> }
                <input 
                    type="password" 
                    name='confirmPassword' 
                    className={`register-form__input ${confirmPasswordErrors.length !== 0 && 'register-form__input--invalid'}`} 
                    placeholder='Confirm password'
                    value={confirmPassword}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                />
                { confirmPasswordErrors.length !== 0 && <p className="register-form__error">
                    {confirmPasswordErrors[0]}
                </p> }
                <button className="register-form__button" disabled={!formIsValid(inputs)}>
                    Create Account
                </button>
                <p className='register-form__text'>Already have an account? 
                    <Link to='/login' className='register-form__text register-form__text--highlight'> Log in</Link>
                </p>
                {message && <p className='register-form__text'>{message}</p>}
            </form>
        </div>
    );
}

export default Register;