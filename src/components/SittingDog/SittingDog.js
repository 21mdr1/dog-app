import dog from '../../assets/static-images/home-dog-prototype-2.svg';
import './SittingDog.scss';

function SittingDog() {
    return (
        <main className="home-main">
            <img src={dog} alt="sitting dog" className="sitting-dog" />
            <div className="sitting-dog__shadow"></div>
        </main>
    );
}

export default SittingDog;