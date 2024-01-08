import { useState } from 'react';
import './WalkForm.scss';


function WalkForm({ setDisplayForm }) {

    let [ inputs, setInputs ] = useState({hours: '0', minutes: '2', seconds: '0'})
    let { hours, minutes, seconds } = inputs;

    function clickOut() {
        setDisplayForm(false);
    }

    function dontClickOut(event) {
        event.stopPropagation();
    }

    function submitHandler(event) {
        event.preventDefault();
        //other logic
        setDisplayForm(false);
    }

    function handleInputChange(event) {
        setInputs({...inputs, [event.target.name]: event.target.value})
    }

    return (
        <div className='form__background' onClick={clickOut}>
            <form className="form" onClick={dontClickOut} onSubmit={submitHandler}>
                <div className="form__content">
                    <select className="form__input" name='hours' value={hours} onChange={handleInputChange}>
                        <option value="0" className="form__option">0</option>
                        <option value="1" className="form__option">1</option>
                        <option value="2" className="form__option">2</option>
                        <option value="3" className="form__option">3</option>
                        <option value="4" className="form__option">4</option>
                    </select>
                    <p className="form__text">:</p>
                    <select className="form__input" name='minutes' value={minutes} onChange={handleInputChange}>
                        <option value="0" className="form__option">0</option>
                        <option value="1" className="form__option">1</option>
                        <option value="2" className="form__option">2</option>
                    </select>
                    <p className="form__text">:</p>
                    <select className="form__input" name='seconds' value={seconds} onChange={handleInputChange}>
                        <option value="0" className="form__option">0</option>
                        <option value="1" className="form__option">1</option>
                        <option value="2" className="form__option">2</option>
                    </select>
                </div>
                <button type='submit' className="form__button">Log Walk</button>
            </form>
        </div>
    );
}

export default WalkForm;