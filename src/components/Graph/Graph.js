import { getLast7Days, getWeekday } from '../../utils/dateUtils';
import { getRandomNum, roundToNext5000 } from '../../utils/mathUtils';
import './Graph.scss';

function Graph() {

    let dataObj = {dates: getLast7Days('timestamp'), values: []};
    let dataArr = [];

    for (let date of dataObj.dates) {
        let steps = getRandomNum(10000);
        dataObj.values.push(steps);
        dataArr.push({date: getWeekday(date), steps: steps});
    }

    let maxLength = roundToNext5000(Math.max(...dataObj.values));

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
                    {dataArr.map((day) => {
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