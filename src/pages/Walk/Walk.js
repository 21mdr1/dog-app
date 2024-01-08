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
                        <select className="form__input" defaultValue='2'>
                            <option value="1" className="form__option">1</option>
                            <option value="2" className="form__option">2</option>
                            <option value="3" className="form__option">3</option>
                        </select>
                        <p className="form__text">:</p>
                        <select className="form__input" defaultValue='2'>
                            <option value="1" className="form__option">1</option>
                            <option value="2" className="form__option">2</option>
                        </select>
                        <p className="form__text">:</p>
                        <select className="form__input">
                            <option value="1" className="form__option">1</option>
                            <option value="2" className="form__option">2</option>
                        </select>
                    </div>
                    <button type='submit' className="form__button">Log Walk</button>
                </form>
            </div>
        )}
        </div>
    )
}

export default Walk;