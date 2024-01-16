import Graph from '../../components/Graph/Graph';
import TopNav from '../../components/TopNav/TopNav';
import './User.scss';

function User() {
    return (
        <div className="page page--user">
            <TopNav page='user' />
            <main className="main-user">
                <Graph />
            </main>
        </div>
    );
}

export default User;