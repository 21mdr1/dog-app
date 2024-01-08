import { useState } from 'react';
import BottomNav from '../../components/BottomNav/BottomNav';
import WalkingDog from '../../components/WalkingDog/WalkingDog';
import TopNav from '../../components/TopNav/TopNav';
import WalkForm from '../../components/WalkForm/WalkForm';
import tree from '../../assets/static-images/tree-4.svg';
import './Walk.scss';

function Walk() {
    let [ displayForm, setDisplayForm ] = useState(false);

    return (
        <div className='page page--walk'>
            <img src={tree} alt='tree' className="page__background-tree" />
            <TopNav />
            <WalkingDog />
            <BottomNav page='walk' clickHandler={() => {setDisplayForm(true)}} />
            {displayForm && <WalkForm setDisplayForm={setDisplayForm} />}
        </div>
    )
}

export default Walk;