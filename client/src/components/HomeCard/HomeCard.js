import dog from '../../assets/icons/dog.svg';
import './HomeCard.scss';

function HomeCard() {
    return (
        <div className='home-card'>
            <div className="home-card__left">
                <div 
                    className="home-card__progress-bar"
                    role="progressbar"
                    aria-valuenow="7000"
                    aria-valuemin="0"
                    aria-valuemax="10000"
                ></div>
            </div>
            <div className="home-card__right">
                <div className="home-card__streak">
                    <div className="home-card__streak-header">
                        Streak:
                    </div>
                    <div className='home-card__streak-icons'>
                        {[1,2,3].map(() => {
                            return <img src={dog} alt="dog" className="home-card__streak-icon" />
                        })}
                    </div>
                </div>
                <div className="home-card__progress">
                    <div className="home-card__progress-header">
                        Today's Progress
                    </div>
                    <div className='home-card__progress-percentage'>
                        70%
                    </div>
                </div>
            </div>

        </div>
    );
}

export default HomeCard;