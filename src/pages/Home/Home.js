import BottomNav from '../../components/BottomNav/BottomNav';
import SittingDog from '../../components/SittingDog/SittingDog';
import TopNav from '../../components/TopNav/TopNav';
import './Home.scss';

function Home() {

    return (
        <div className='page page--home'>
            <TopNav />
            <SittingDog />
            <BottomNav page='home' />
        </div>
    );
}

export default Home;