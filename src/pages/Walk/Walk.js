import { useState } from 'react';
import BottomNav from '../../components/BottomNav/BottomNav';
import WalkingDog from '../../components/WalkingDog/WalkingDog';
import TopNav from '../../components/TopNav/TopNav';
import './Walk.scss';

function Walk() {
    let [ displayForm, setDisplayForm ] = useState(false);

    return (
        <div className='page page--walk'>
            <TopNav />
            <WalkingDog />
            <BottomNav page='walk' clickHandler={() => {setDisplayForm(true)}} />
        {displayForm && (
            <div className='form__background'>
                <form className="form">
                        <div className="form__content">
                        <input type="text" className="form__input" />
                        <p className="form__text">:</p>
                        <input type="text" className="form__input" />
                        <p className="form__text">:</p>
                        <input type="text" className="form__input" />
                    </div>
                    <button type='submit' className="form__button">Log Walk</button>
                </form>
            </div>
        )}
        </div>
    )
}

export default Walk;