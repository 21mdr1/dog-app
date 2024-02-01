import dog from '../../assets/icons/dog.svg';
import './ShowStreak.scss';

function ShowStreak({ streak }) {
    if (streak === 0 || streak > 7) {
        return (
        <>
            <p className="home-card__streak-num">{streak}</p>
            <img src={dog} alt="dog" className="home-card__streak-icon" />
        </>
        );
    } else {
        return Array.from({length: streak}, (_val, index) => {
            return <img key={index} src={dog} alt="dog" className="home-card__streak-icon" />
        })
    }
}

export default ShowStreak;