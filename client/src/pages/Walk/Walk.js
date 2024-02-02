import { useState } from 'react';
import BottomNav from '../../components/BottomNav/BottomNav';
import { ReactComponent as Tree } from '../../assets/static-images/tree-4.svg';
import Sun from '../../components/Sun/Sun';
import AnimatedWalkingDog from '../../components/AnimatedWalkingDog/AnimatedWalkingDog';
import TopNav from '../../components/TopNav/TopNav';
import WalkForm from '../../components/WalkForm/WalkForm';
import './Walk.scss';

function Walk({ signedIn }) {
    let [ displayForm, setDisplayForm ] = useState(false);

    return (
        <div className='page page--walk'>
            <Sun />
            <Tree className="page__background-tree" />
            <TopNav page='walk' signedIn={signedIn} />
            <AnimatedWalkingDog />
            <BottomNav page='walk' signedIn={signedIn} clickHandler={() => {setDisplayForm(true)}} />
            {displayForm && <WalkForm setDisplayForm={setDisplayForm} signedIn={signedIn}/>}
        </div>
    )
}

export default Walk;