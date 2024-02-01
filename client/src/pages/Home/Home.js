import BottomNav from '../../components/BottomNav/BottomNav';
import AnimatedSittingDog from '../../components/AnimatedSittingDog/AnimatedSittingDog';
import TopNav from '../../components/TopNav/TopNav';
import './Home.scss';
import HomeCard from '../../components/HomeCard/HomeCard';

function Home({signedIn}) {

    return (
        <div className='page page--home'>
            <div className="page__left">
                <div className="nav__container">
                    <TopNav page='home' signedIn={signedIn} />
                </div>
                <AnimatedSittingDog />
                <BottomNav page='home' />
            </div>
            <div className="page__right">
                <TopNav page='home' signedIn={signedIn} />
                <HomeCard />
            </div>
        </div>
    );
}

export default Home;