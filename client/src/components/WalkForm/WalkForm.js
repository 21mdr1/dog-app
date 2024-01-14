import { useState } from 'react';
import './WalkForm.scss';
import { convertToSteps, convertToMins } from '../../utils/mathUtils';


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
        let mins = convertToMins(inputs);
        let steps = convertToSteps(mins);

        // call api to submit walk, 
        //show a success message under the form for a few seconds or error message if it doesn't work?
        // reset inputs
        
        setDisplayForm(false);
    }

    function handleInputChange(event) {
        setInputs({...inputs, [event.target.name]: event.target.value})
    }

    return (
        <div className='form__background' onClick={clickOut}>
            <form className="form" onClick={dontClickOut} onSubmit={submitHandler}>
                <div className="form__content">
                    <label htmlFor="hours" className="form__label">
                        <select className="form__input" id='hours' name='hours' value={hours} onChange={handleInputChange}>
                            <option value="0" className="form__option">0</option>
                            <option value="1" className="form__option">1</option>
                            <option value="2" className="form__option">2</option>
                            <option value="3" className="form__option">3</option>
                            <option value="4" className="form__option">4</option>
                        </select>
                        Hours
                    </label>
                    <p className="form__colon">:</p>
                    <label htmlFor="minutes" className="form__label">
                        <select className="form__input" id='minutes' name='minutes' value={minutes} onChange={handleInputChange}>
                            <option value="0" className="form__option">0</option>
                            <option value="1" className="form__option">1</option>
                            <option value="2" className="form__option">2</option>
                        </select>
                        Minutes
                    </label>
                    <p className="form__colon">:</p>
                    <label htmlFor="seconds" className="form__label">
                        <select className="form__input" id="seconds" name="seconds" value={seconds} onChange={handleInputChange}>
                            <option value="0" className="form__option">0</option>
                            <option value="1" className="form__option">1</option>
                            <option value="2" className="form__option">2</option>
                        </select>
                        Seconds
                    </label>
                </div>
                <button type='submit' className="form__button">Log Walk</button>
            </form>
        </div>
    );
}

export default WalkForm;