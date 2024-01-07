import { NavLink } from 'react-router-dom';
import BottomNav from '../../components/BottomNav/BottomNav';
import SittingDog from '../../components/SittingDog/SittingDog';
import TopNav from '../../components/TopNav/TopNav';
import './Home.scss';

function Home() {

    return (
        <>
        <TopNav />
        <SittingDog />
        <BottomNav />
        </>
    );
}

export default Home;