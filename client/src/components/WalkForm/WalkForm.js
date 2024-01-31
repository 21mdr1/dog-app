import { useState } from 'react';
import { convertToSteps, convertToMins } from '../../utils/mathUtils';
import { recordSteps } from '../../utils/storageUtils';
import './WalkForm.scss';


function WalkForm({ setDisplayForm, signedIn }) {

    let [ inputs, setInputs ] = useState({hours: '0', minutes: '10', seconds: '0'})
    let { hours, minutes, seconds } = inputs;

    let [ message, setMessage] = useState("");


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

        await recordSteps(
            { minsWalked: mins, steps: steps },
            signedIn, 
            () => {
                setMessage("Walk logged successfully");
                setTimeout(() => {setDisplayForm(false)}, 2000);
            }, 
            () => {
                setMessage("Error logging walk");
            }
        );
        
    }

    function handleInputChange(event) {
        setInputs({...inputs, [event.target.name]: event.target.value})
    }

    return (
        <div className='walk-form__background' onClick={clickOut}>
            <form className="walk-form" onClick={dontClickOut} onSubmit={submitHandler}>
                <div className="walk-form__content">
                    <label htmlFor="hours" className="walk-form__label">
                        <select className="walk-form__input" id='hours' name='hours' value={hours} onChange={handleInputChange}>
                            {Array.from({length: 13}, (_val, index) => {
                                return (
                                    <option 
                                        key={index} 
                                        value={index} 
                                        className='walk-form__option'
                                    >
                                        {index}
                                    </option>
                                )
                            })}
                        </select>
                        Hours
                    </label>
                    <p className="walk-form__colon">:</p>
                    <label htmlFor="minutes" className="walk-form__label">
                        <select className="walk-form__input" id='minutes' name='minutes' value={minutes} onChange={handleInputChange}>
                            {Array.from({length: 61}, (_val, index) => {
                                return (
                                    <option 
                                        key={index} 
                                        value={index} 
                                        className='walk-form__option'
                                    >
                                        {index}
                                    </option>
                                )
                            })}
                        </select>
                        Minutes
                    </label>
                    <p className="walk-form__colon">:</p>
                    <label htmlFor="seconds" className="walk-form__label">
                        <select className="walk-form__input" id="seconds" name="seconds" value={seconds} onChange={handleInputChange}>
                            {Array.from({length: 61}, (_val, index) => {
                                return (
                                    <option 
                                        key={index} 
                                        value={index} 
                                        className='walk-form__option'
                                    >
                                        {index}
                                    </option>
                                )
                            })}
                        </select>
                        Seconds
                    </label>
                </div>
                <button type='submit' className="walk-form__button">Log Walk</button>
                {message && <p className="walk-form__message">{message}</p>}
            </form>
        </div>
    );
}

export default WalkForm;