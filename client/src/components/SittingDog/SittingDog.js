import { ReactComponent as Face } from '../../assets/animations/sitting-dog/bare-face.svg';
import { ReactComponent as BlinkEye } from '../../assets/animations/sitting-dog/blink-eye.svg';
import { ReactComponent as Body } from '../../assets/animations/sitting-dog/body.svg';
import { ReactComponent as LeftEar } from '../../assets/animations/sitting-dog/left-ear.svg';
import { ReactComponent as RightEar } from '../../assets/animations/sitting-dog/right-ear.svg';
import { ReactComponent as Neck } from '../../assets/animations/sitting-dog/neck.svg';
import { ReactComponent as Eye } from '../../assets/animations/sitting-dog/right-eye.svg';
import { ReactComponent as Tail } from '../../assets/animations/sitting-dog/full-tail.svg';
import { ReactComponent as Tongue } from '../../assets/animations/sitting-dog/tongue.svg';
import './SittingDog.scss';

function SittingDog({ isBlinking }) {

    function determineClasses() {
        let blinking = isBlinking ? 'sitting-dog--isBlinking' : null;

        return `sitting-dog ${blinking}`
    }

    return (
        <main className="home-main">
            <div className={determineClasses()}>
                <div className="sitting-dog__shadow"></div>
                <div className='sitting-dog__full-body'>
                    <Tail className='sitting-dog__tail' />
                    <Body className='sitting-dog__body' />
                    <Neck className='sitting-dog__neck' />
                </div>
                <div className='sitting-dog__head'>
                    <Face className='sitting-dog__face' />
                    <Eye className='sitting-dog__eye sitting-dog__eye--right' />
                    <Eye className='sitting-dog__eye sitting-dog__eye--left' />
                    <BlinkEye className='sitting-dog__blink-eye sitting-dog__blink-eye--right' />
                    <BlinkEye className='sitting-dog__blink-eye sitting-dog__blink-eye--left' />
                    <Tongue className='sitting-dog__tongue' />
                    <LeftEar className='sitting-dog__ear sitting-dog__ear--left' />
                    <RightEar className='sitting-dog__ear sitting-dog__ear--right' />
                </div>
            </div>
        </main>
    );
}

export default SittingDog;