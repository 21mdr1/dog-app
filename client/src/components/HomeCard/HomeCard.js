import dog from '../../assets/icons/dog.svg';
import './HomeCard.scss';

function HomeCard({ steps }) {

    return (
        <div className='home-card'>
            <div className="home-card__left">
                <div 
                    className="home-card__progress-bar"
                    role="progressbar"
                    aria-valuenow={steps.steps}
                    aria-valuemin="0"
                    aria-valuemax="10000"
                    style={{
                        'background': `
                            radial-gradient(closest-side, #C0B1EB 79%, transparent 80% 100%),
                            conic-gradient(#7058AF ${Math.round((steps.steps/10000)*100)}%, #E6DCFF 0)
                        `}} 
                ></div>
                <div className="home-card__legend">
                    <div className="home-card__steps">
                        {steps.steps}
                    </div>
                    <div className="home-card__steps-header">
                        steps walked
                    </div>
                </div>
            </div>
            <div className="home-card__right">
                <div className="home-card__streak">
                    <div className="home-card__streak-header">
                        Streak:
                    </div>
                    <div className='home-card__streak-icons'>
                        {[1,2,3].map((el) => {
                            return <img key={el} src={dog} alt="dog" className="home-card__streak-icon" />
                        })}
                    </div>
                </div>
                <div className="home-card__progress">
                    <div className="home-card__progress-header">
                        Today's Progress
                    </div>
                    <div className='home-card__progress-percentage'>
                        {`${Math.round((steps.steps/10000)*100)}%`}
                    </div>
                </div>
            </div>

        </div>
    );
}

export default HomeCard;