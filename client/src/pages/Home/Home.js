import BottomNav from '../../components/BottomNav/BottomNav';
import AnimatedSittingDog from '../../components/AnimatedSittingDog/AnimatedSittingDog';
import TopNav from '../../components/TopNav/TopNav';
import './Home.scss';
import HomeCard from '../../components/HomeCard/HomeCard';

function Home({ signedIn }) {

    let happyMessages = [
        "Have you walked yet today?",
        "Take 5 minutes to stretch",
        "Paws for thought: a walk a day keeps the stress away",
        "Every step is a step toward a happier you and a happier dog",
        "Take a break and grab a cup of water"
    ];
    let sadMessages = [
        "Stretch those legs and let your dog stretch its paws!", 
        "Your dog needs a walk - take some time to move",
    ];

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
                <HomeCard signedIn={signedIn} />
            </div>
        </div>
    );
}

export default Home;