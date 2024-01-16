import { Link } from 'react-router-dom';
import back from '../../assets/icons/left_line.svg';
import './Register.scss';

function Register() {
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
            <form className='register-form'>
                <h1 className='register-form__title'>Create an Account</h1>
                <input 
                    type="text" 
                    name='email' 
                    className="register-form__input" 
                    placeholder='Email'
                />
                <input 
                    type="text" 
                    name='username' 
                    className="register-form__input" 
                    placeholder='Username'
                />
                <input 
                    type="password" 
                    name='password' 
                    className="register-form__input"
                    placeholder='Password' 
                />
                <input 
                    type="password" 
                    name='confirmPassword' 
                    className="register-form__input" 
                    placeholder='Confirm password'
                />
                <button className="register-form__button">
                    Create Account
                </button>
                <p className='register-form__text'>Already have an account? 
                    <Link to='/login' className='register-form__text register-form__text--highlight'> Log in</Link>
                </p>
            </form>
        </div>
    );
}

export default Register;