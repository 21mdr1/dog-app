import dog from '../../assets/static-images/home-dog-prototype-2.svg';
import './WalkingDog.scss';

function WalkingDog() {
    return (
        <main className="home-main">
            <div className="walking-dog__container">
                <div className="walking-dog__shadow"></div>
                <img src={dog} alt="walking dog" className="walking-dog" />
            </div>
        </main>
    );
}

export default WalkingDog;