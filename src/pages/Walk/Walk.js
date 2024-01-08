import BottomNav from '../../components/BottomNav/BottomNav';
import WalkingDog from '../../components/WalkingDog/WalkingDog';
import TopNav from '../../components/TopNav/TopNav';
import './Walk.scss';

function Walk() {
    return (
        <div className='page page--walk'>
            <TopNav />
            <WalkingDog />
            <BottomNav page='walk' />
        </div>
    )
}

export default Walk;