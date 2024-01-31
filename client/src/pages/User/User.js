import Graph from '../../components/Graph/Graph';
import TopNav from '../../components/TopNav/TopNav';
import './User.scss';

function User({ signedIn }) {
    return (
        <div className="page page--user">
            <TopNav page='user' signedIn={signedIn} />
            <main className="main-user">
                <Graph signedIn={signedIn} />
            </main>
        </div>
    );
}

export default User;