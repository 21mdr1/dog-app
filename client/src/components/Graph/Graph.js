import { getWeekday } from '../../utils/dateUtils';
import { getRandomNum, roundToNext5000 } from '../../utils/mathUtils';
import { getLastWeeksSteps } from '../../utils/storageUtils';
import { useState, useEffect } from 'react';
import './Graph.scss';

function Graph() {

    let [ stepsArr, setStepsArr ] = useState([]); 

    useEffect(() => {
        async function getSteps() {
            let steps = await getLastWeeksSteps()
            setStepsArr(steps);
        }
        
        getSteps();

    }, [])

    if ( stepsArr.length === 0) {
        return (
            <div className="graph__container">
                <p>steps walked</p>
                <p>No data</p>
            </div>
        );
    }

    let maxLength = roundToNext5000(Math.max(...stepsArr.map(a => a.steps)));

    function GraphRow({ date, steps }) {
        const length = Math.round((steps / maxLength)*100);
        return (
            <tr className='graph__row'>
                <th className='graph__day'>{date}</th>
                <td className="graph__right-side">
                    <span 
                        style={{'width': `${length}%`}} 
                        className={`graph__bar graph__bar--${length}`}
                    >{steps}</span>
                </td>
            </tr>
        );
    }

    return (
        <div className="graph__container">
            <table className="graph">
                <caption>steps walked</caption>
                <tbody className='graph__body'>
                    {stepsArr.map((day) => {
                        return (
                            <GraphRow key={day.date} date={day.date} steps={day.steps}/>
                        );
                    })}
                </tbody>
            </table>
            <div className="legend">
                <div className="legend__left"></div>
                <div className="legend__container">
                    <div className="legend__text">0</div>
                    <div className="legend__text">{`${maxLength/2000}k`}</div>
                    <div className="legend__text">{`${maxLength/1000}k`}</div>
                </div>
            </div>
        </div>
    );
}

export default Graph;