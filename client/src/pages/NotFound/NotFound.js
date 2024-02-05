import { Link } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import './NotFound.scss';

function NotFound() {

    return (
        <div className='page page--not-found'>
            <h1 className='not-found__title'>Oops this page seems to be missing...</h1>
            <Loading />
            <h2 className='not-found__subtitle'><Link to='/'>Click here to return home</Link></h2>
        </div>
    );
}

export default NotFound;