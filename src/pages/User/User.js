import barLeash from '../../assets/static-images/graph-leash.svg';
import './User.scss';

function User() {

    let avatar='https://api.multiavatar.com/maria.svg';
    let dataObj = {dates: [], values: []};
    let dataArr = [];

    const formatter = new Intl.DateTimeFormat('en-US', {weekday: 'short'});

    for (let i=0; i<7; i++) {
        let d = new Date();
        d.setDate(d.getDate() - i);
        dataObj.dates.push(d);
        let steps = Math.floor(Math.random() * 10000);
        dataObj.values.push(steps);
        dataArr.push({date: d, steps: steps});
    }



    return (
        <div className="page page--user">
            <header className="header">
                <div className="user-avatar__container">
                    <img src={avatar} alt="user avatar" className="user-avatar" />
                    <div className="user-avatar__mask"></div>
                </div>
            </header>
            <main className="main-user">
                <div className="graph__container">
                    <table className="graph">
                        <tbody className='graph__body'>
                            {dataArr.map((day) => {
                                let length = (day.steps/10000)*100;
                                return (
                                    <tr className='graph__row'key={day.date}>
                                        <th className='graph__day'>{formatter.format(day.date)}</th>
                                        <td className="graph__right-side">
                                            <span 
                                                style={{'width': `${length}%`}} 
                                                className={`graph__bar graph__bar--${length}`}
                                            >{day.steps}</span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}

export default User;