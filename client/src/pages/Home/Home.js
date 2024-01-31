import BottomNav from '../../components/BottomNav/BottomNav';
import AnimatedSittingDog from '../../components/AnimatedSittingDog/AnimatedSittingDog';
import TopNav from '../../components/TopNav/TopNav';
import './Home.scss';

function Home({signedIn}) {

    return (
        <div className='page page--home'>
            <TopNav page='home' signedIn={signedIn} />
            <AnimatedSittingDog />
            <BottomNav page='home' />
        </div>
    );
}

export default Home;