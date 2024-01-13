import { Link } from 'react-router-dom';
import Graph from '../../components/Graph/Graph';
import back from '../../assets/icons/left_line.svg';
import './User.scss';

function User() {

    let avatar='https://api.multiavatar.com/maria.svg';

    return (
        <div className="page page--user">
            <header className="header">
                <Link to='/' className="back-button">
                    <img src={back} alt="back" className="back-button__image" />
                    <span className="back-button__text">back</span>
                </Link>
                <img src={avatar} alt="user avatar" className="user-avatar" />
            </header>
            <main className="main-user">
                <Graph />
            </main>
        </div>
    );
}

export default User;