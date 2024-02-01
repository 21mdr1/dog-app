import dog from '../../assets/icons/dog.svg';
import './ShowStreak.scss';

function ShowStreak({ streak }) {
    if (streak === 0 || streak > 7) {
        return (
        <div className='streak'>
            <p className="streak__num">{streak}</p>
            <img src={dog} alt="dog" className="streak__icon" />
        </div>
        );
    } else {
        return (
            <div className='streak'>
                {Array.from({length: streak}, (_val, index) => {
                    return <img 
                        key={index} 
                        src={dog} 
                        alt="dog" 
                        className="streak__icon" 
                    />
                })}
            </div>
        )
    }
}

export default ShowStreak;