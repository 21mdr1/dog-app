import { getWeekday } from '../../utils/dateUtils';
import { roundToNext5000 } from '../../utils/mathUtils';
import { getLastWeeksSteps } from '../../utils/storageUtils';
import { useState, useEffect } from 'react';
import GraphRow from '../GraphRow/GraphRow';
import './Graph.scss';

function Graph({ signedIn }) {

    let [ stepsArr, setStepsArr ] = useState([]); 

    useEffect(() => {
        getLastWeeksSteps(signedIn, (data) => setStepsArr(data.reverse()))
    }, [signedIn]);

    if ( stepsArr.length === 0) {
        return (
            <div className="graph__container">
                <p className='graph__title'>steps walked</p>
                <p>No data</p>
            </div>
        );
    }

    let maxLength = roundToNext5000(Math.max(...stepsArr.map(a => a.steps))) || 5000;

    return (
        <div className="graph__container">
            <table className="graph">
                <caption className='graph__title'>steps walked</caption>
                <tbody className='graph__body'>
                    {stepsArr.map((day) => {
                        return (
                            <GraphRow key={getWeekday(day.date)} date={getWeekday(day.date)} steps={day.steps} maxLength={maxLength}/>
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