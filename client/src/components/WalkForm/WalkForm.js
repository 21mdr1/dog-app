import { useState } from 'react';
import { convertToSteps, convertToMins } from '../../utils/mathUtils';
import { recordSteps } from '../../utils/storageUtils';
import './WalkForm.scss';


function WalkForm({ setDisplayForm }) {

    let [ inputs, setInputs ] = useState({hours: '0', minutes: '10', seconds: '0'})
    let { hours, minutes, seconds } = inputs;

    function clickOut() {
        setDisplayForm(false);
    }

    function dontClickOut(event) {
        event.stopPropagation();
    }

    async function submitHandler(event) {
        event.preventDefault();
        let mins = convertToMins(inputs);
        let steps = convertToSteps(mins);
        // call api to submit walk, 
        //show a success message under the form for a few seconds or error message if it doesn't work?
        await recordSteps({ minsWalked: mins, steps: steps });
        
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
                            {Array.from({length: 13}, (_val, index) => {
                                return (
                                    <option 
                                        key={index} 
                                        value={index} 
                                        className='form__option'
                                    >
                                        {index}
                                    </option>
                                )
                            })}
                        </select>
                        Hours
                    </label>
                    <p className="form__colon">:</p>
                    <label htmlFor="minutes" className="form__label">
                        <select className="form__input" id='minutes' name='minutes' value={minutes} onChange={handleInputChange}>
                            {Array.from({length: 61}, (_val, index) => {
                                return (
                                    <option 
                                        key={index} 
                                        value={index} 
                                        className='form__option'
                                    >
                                        {index}
                                    </option>
                                )
                            })}
                        </select>
                        Minutes
                    </label>
                    <p className="form__colon">:</p>
                    <label htmlFor="seconds" className="form__label">
                        <select className="form__input" id="seconds" name="seconds" value={seconds} onChange={handleInputChange}>
                            {Array.from({length: 61}, (_val, index) => {
                                return (
                                    <option 
                                        key={index} 
                                        value={index} 
                                        className='form__option'
                                    >
                                        {index}
                                    </option>
                                )
                            })}
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