import dog from '../../assets/static-images/home-dog-prototype-2.svg';
import './SittingDog.scss';

function SittingDog() {
    return (
        <main className="home-main">
            <div className="sitting-dog__container">
                <div className="sitting-dog__shadow"></div>
                <img src={dog} alt="sitting dog" className="sitting-dog" />
            </div>
        </main>
    );
}

export default SittingDog;