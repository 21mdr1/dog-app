import { useState } from 'react';
import BottomNav from '../../components/BottomNav/BottomNav';
import WalkingDog from '../../components/WalkingDog/WalkingDog';
import TopNav from '../../components/TopNav/TopNav';
import WalkForm from '../../components/WalkForm/WalkForm';
import './Walk.scss';

function Walk() {
    let [ displayForm, setDisplayForm ] = useState(false);
    // let [ inputs, setInputs ] = useState({hours: '0', minutes: '2', seconds: '0'})
    // let { hours, minutes, seconds } = inputs;

    // function clickOut() {
    //     setDisplayForm(false);
    // }

    // function dontClickOut(event) {
    //     event.stopPropagation();
    // }

    // function submitHandler(event) {
    //     event.preventDefault();
    //     //other logic
    //     setDisplayForm(false);
    // }

    // function handleInputChange(event) {
    //     setInputs({...inputs, [event.target.name]: event.target.value})
    // }


    return (
        <div className='page page--walk'>
            <TopNav />
            <WalkingDog />
            <BottomNav page='walk' clickHandler={() => {setDisplayForm(true)}} />
            {displayForm && <WalkForm setDisplayForm={setDisplayForm} />}
        </div>
    )
}

export default Walk;