import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { formIsValid, getInputError } from '../../utils/validationUtils';
import { register } from '../../utils/userUtils';
import back from '../../assets/icons/left_line.svg';
import registerImage from '../../assets/static-images/register-image.svg';
import './Register.scss';

function Register({ setSignedIn }) {
    let [ inputs, setInputs ] = useState({
        email: '', 
        username: '', 
        password: '', 
        confirmPassword: ''
    });
    let { email, username, password, confirmPassword } = inputs;

    let [ errors, setErrors ] = useState({
        email: null, 
        username: null, 
        password: null, 
        confirmPassword: null
    });
    let { email: emailErrors, 
        username: usernameErrors, 
        password: passwordErrors, 
        confirmPassword: confirmPasswordErrors 
    } = errors;

    let [ message, setMessage ] = useState(null);

    let navigate = useNavigate();

    async function handleInputChange(event) {
        let { name, value } = event.target;
        setInputs({...inputs, [name]: value});

        if(name === 'password') {
            setErrors({...errors, 
                ["password"]: await getInputError("password", value), 
                ["confirmPassword"]: await getInputError("confirmPassword", confirmPassword, value)
            });
        } else {
            setErrors({...errors, [name]: await getInputError(name, value, password)});
        }

    }

    async function handleInputBlur(event) {
        const { name, value } = event.target;
        setErrors({...errors, [name]: await getInputError(name, value, password)});
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setMessage("");

        if (formIsValid(inputs)) {
            register(
                { username: username, email: email, password: password },
                setSignedIn,
                () => {
                    setMessage("Account created successfully");
                    setTimeout(() => {navigate('/login')}, 1500);
                },
                (error) => {
                    console.log('error creating account', error);
                    setMessage("Error creating account");
                }
            );

        } else {
            setMessage("Error creating account");
            let newErrors = {};
            for(let key in inputs) {
                newErrors[key] = await getInputError(key, inputs[key], password);
            }
            setErrors(newErrors);
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
            <div className="register-left">
                <form className='register-form' onSubmit={handleSubmit}>
                    <h1 className='register-form__title'>Create an Account</h1>
                    <input 
                        type="text" 
                        name='email' 
                        className={`register-form__input ${emailErrors && 'register-form__input--invalid'}`}
                        placeholder='Email'
                        value={email}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                    />
                    { emailErrors && <p className="register-form__error">
                        {emailErrors}
                    </p> }
                    <input 
                        type="text" 
                        name='username' 
                        className={`register-form__input ${usernameErrors && 'register-form__input--invalid'}`}
                        placeholder='Username'
                        value={username}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                    />
                    { usernameErrors && <p className="register-form__error">
                        {usernameErrors}
                    </p> }
                    <input 
                        type="password" 
                        name='password' 
                        className={`register-form__input ${passwordErrors && 'register-form__input--invalid'}`}
                        placeholder='Password'
                        value={password}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur} 
                    />
                    { passwordErrors && <p className="register-form__error">
                        {passwordErrors}
                    </p> }
                    <input 
                        type="password" 
                        name='confirmPassword' 
                        className={`register-form__input ${confirmPasswordErrors && 'register-form__input--invalid'}`} 
                        placeholder='Confirm password'
                        value={confirmPassword}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                    />
                    { confirmPasswordErrors && <p className="register-form__error">
                        {confirmPasswordErrors}
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
            <div className='register-right'>
                <img src={registerImage} alt="A woman sits among some flowers" className="register-right__image" />
            </div>
        </div>
    );
}

export default Register;