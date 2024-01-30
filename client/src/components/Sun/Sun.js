import { ReactComponent as Layer1 } from '../../assets/animations/sun/sun1.svg';
import { ReactComponent as Layer2 }  from '../../assets/animations/sun/sun2.svg';
import { ReactComponent as Layer3 }  from '../../assets/animations/sun/sun3.svg';
import { ReactComponent as Layer4 }  from '../../assets/animations/sun/sun4.svg';
import { ReactComponent as Layer5 }  from '../../assets/animations/sun/sun5.svg';
import { ReactComponent as Layer6 }  from '../../assets/animations/sun/sun6.svg';

import './Sun.scss';

function Sun() {
        return(
            <div className="sun">
                <Layer1 className="sun__layer1" />
                <Layer2 className="sun__layer2" />
                <Layer3 className="sun__layer3" />
                <Layer4 className="sun__layer4" />
                <Layer5 alt="" className="sun__layer5" />
                <Layer6 className="sun__layer6" />
            </div>
        )

}

export default Sun;