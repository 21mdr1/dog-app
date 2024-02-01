import './GraphRow.scss';

function GraphRow({ date, steps, maxLength }) {
    const length = Math.round((steps / maxLength)*100);
    return (
        <tr className='graph-row'>
            <th className='graph-row__day'>{date}</th>
            <td className="graph-row__right-side">
                <span 
                    style={{'width': `${length}%`}} 
                    className={`graph-row__bar graph-row__bar--${length}`}
                >{steps}</span>
            </td>
        </tr>
    );
}

export default GraphRow;