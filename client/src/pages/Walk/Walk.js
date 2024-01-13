import { useState } from 'react';
import BottomNav from '../../components/BottomNav/BottomNav';
import WalkingDog from '../../components/WalkingDog/WalkingDog';
import TopNav from '../../components/TopNav/TopNav';
import WalkForm from '../../components/WalkForm/WalkForm';
import tree from '../../assets/static-images/tree-4.svg';
import sun1 from '../../assets/animations/sun/sun1.svg';
import sun2 from '../../assets/animations/sun/sun2.svg';
import sun3 from '../../assets/animations/sun/sun3.svg';
import sun4 from '../../assets/animations/sun/sun4.svg';
import sun5 from '../../assets/animations/sun/sun5.svg';
import sun6 from '../../assets/animations/sun/sun6.svg';
import './Walk.scss';

function Walk() {
    let [ displayForm, setDisplayForm ] = useState(false);

    return (
        <div className='page page--walk'>
            <div className="sun">
                <img src={sun1} alt="" className="sun__layer1" />
                <img src={sun2} alt="" className="sun__layer2" />
                <img src={sun3} alt="" className="sun__layer3" />
                <img src={sun4} alt="" className="sun__layer4" />
                <img src={sun5} alt="" className="sun__layer5" />
                <img src={sun6} alt="" className="sun__layer6" />
            </div>
            <img src={tree} alt='tree' className="page__background-tree" />
            <TopNav />
            <WalkingDog />
            <BottomNav page='walk' clickHandler={() => {setDisplayForm(true)}} />
            {displayForm && <WalkForm setDisplayForm={setDisplayForm} />}
        </div>
    )
}

export default Walk;