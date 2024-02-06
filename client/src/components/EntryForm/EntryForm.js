import { recordPreferences } from '../../utils/storageUtils';
import { useState } from 'react';
import { formIsValid } from '../../utils/validationUtils';
import Select from 'react-select';
import './EntryForm.scss';

function EntryForm({ setNeedPreferences, signedIn }) {

    let [ message, setMessage] = useState("");

    let [ name, setName ] = useState("");
    let [ tooltips, setTooltips ] = useState({value: true, label: 'Yes'});

    let [ invalid, setInvalid ] = useState(false);

    async function submitHandler(event) {
        event.preventDefault();
        setMessage("");
        setInvalid(false);

        if (formIsValid({name: name, tooltips: tooltips})) {
            let avatar = `https://api.multiavatar.com/${name}.svg`;

            await recordPreferences(
                { tooltips: tooltips.value, avatar: avatar },
                signedIn, 
                () => {
                    setMessage("Preferences logged successfully");
                    setTimeout(() => {setNeedPreferences(false)}, 1500);
                }, 
                () => {
                    setMessage("Error recording preferences");
                }
            );
        } else {
            setInvalid(true);
        }
    }

    return (
        <div className='entry-form__background'>
            <form className="entry-form" onSubmit={submitHandler}>
                <div className="entry-form__container">
                    <label htmlFor="name" className="entry-form__label">
                        What can we call you?
                    </label>
                    <input 
                        className={`entry-form__input ${invalid && "entry-form__input--invalid"}`}
                        id="name"
                        name="name"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value)
                            e.target.value && setInvalid(false);
                        }}
                    />
                </div>
                { invalid && <p className="entry-form__error">
                        This field is required
                    </p> }
                <div className="entry-form__container">
                    <label htmlFor="tooltips" className="entry-form__label">
                    Do you want to see tooltips?
                    </label>
                    <Select 
                        className="entry-form__input entry-form__input--select"
                        id="tooltips"
                        classNamePrefix={"entry-form"}
                        value={tooltips}
                        onChange={setTooltips}
                        options={[
                            {value: true, label: "Yes"}, 
                            {value: false, label: "No"}
                        ]}
                        isSearchable={false}
                        unstyled={true}
                    />
                
                </div>
                <button type='submit' className="entry-form__button">Get Started</button>
                <p className="entry-form__message">{message}</p>
            </form>
        </div>
    );
}

export default EntryForm;