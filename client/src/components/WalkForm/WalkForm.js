import { useState } from 'react';
import { convertToSteps, convertToMins } from '../../utils/mathUtils';
import { recordSteps } from '../../utils/storageUtils';
import Select from 'react-select';
import './WalkForm.scss';


function WalkForm({ setDisplayForm, signedIn }) {
    let [ message, setMessage] = useState("");

    let [ hours, setHours ] = useState({value: '0', label: '0'});
    let [ minutes, setMinutes ] = useState({value: '15', label: '15'});
    let [ seconds, setSeconds ] = useState({value: '0', label: '0'});

    let toTwelve = Array.from({length: 13}, (_val, index) => {
        return {value: index, label: index}
    })

    let toSixty = Array.from({length: 60}, (_val, index) => {
        return {value: index, label: index}
    })

    function clickOut() {
        setDisplayForm(false);
    }

    function dontClickOut(event) {
        event.stopPropagation();
    }

    async function submitHandler(event) {
        event.preventDefault();
        let mins = convertToMins({hours: hours, minutes: minutes, seconds: seconds});
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

    return (
        <div className='walk-form__background' onClick={clickOut}>
            <form className="walk-form" onClick={dontClickOut} onSubmit={submitHandler}>
                <div className="walk-form__content">
                    <label htmlFor="hours" className="walk-form__label">
                        <Select 
                            className="walk-form__input"
                            classNamePrefix="walk-form"
                            id="hours"
                            value={hours}
                            onChange={setHours}
                            options={toTwelve}
                            isSearchable={false}
                            unstyled={true}
                        />
                        Hours
                    </label>
                    <p className="walk-form__colon">:</p>
                    <label htmlFor="minutes" className="walk-form__label">
                        <Select 
                            className="walk-form__input"
                            classNamePrefix="walk-form"
                            id="minutes"
                            value={minutes}
                            onChange={setMinutes}
                            options={toSixty}
                            isSearchable={false}
                            unstyled={true}
                        />
                        Minutes
                    </label>
                    <p className="walk-form__colon">:</p>
                    <label htmlFor="seconds" className="walk-form__label">
                        <Select 
                            className="walk-form__input"
                            classNamePrefix="walk-form"
                            id="seconds"
                            value={seconds}
                            onChange={setSeconds}
                            options={toSixty}
                            isSearchable={false}
                            unstyled={true}
                        />
                        Seconds
                    </label>
                </div>
                <button type='submit' className="walk-form__button">Log Walk</button>
                <p className="walk-form__message">{message}</p>
            </form>
        </div>
    );
}

export default WalkForm;