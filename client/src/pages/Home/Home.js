import TopNav from '../../components/TopNav/TopNav';
import BottomNav from '../../components/BottomNav/BottomNav';
import Message from '../../components/Message/Message';
import AnimatedSittingDog from '../../components/AnimatedSittingDog/AnimatedSittingDog';
import HomeCard from '../../components/HomeCard/HomeCard';
import { useState, useEffect } from 'react';
import { getTodaysSteps } from '../../utils/storageUtils';
import './Home.scss';


function Home({ signedIn }) {

    let [ steps, setSteps ] = useState({});

    useEffect(() => {
        getTodaysSteps(
            signedIn,
            (data) => {
                data.length === 0 ? setSteps({steps: 0}) : setSteps(data[0])}, 
            (error) => console.log('Error getting steps', error)
        );
    }, [signedIn]);

    return (
        <div className='page page--home'>
            <div className="page__left">
                <div className="nav__container">
                    <TopNav page='home' signedIn={signedIn} />
                </div>
                <Message steps={steps} />
                <AnimatedSittingDog />
                <BottomNav page='home' signedIn={signedIn} />
            </div>
            <div className="page__right">
                <TopNav page='home' signedIn={signedIn} />
                <HomeCard steps={steps} signedIn={signedIn} />
            </div>
        </div>
    );
}

export default Home;