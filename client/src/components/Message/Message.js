import { getRandomElement } from '../../utils/mathUtils';
import './Message.scss';

function Message({ steps }) {

    let happyMessages = [
        "Have you walked yet today?",
        "Take 5 minutes to stretch",
        "Paws for thought: a walk a day keeps the stress away",
        "Every step is a step toward a happier you and a happier dog",
        "Take a break and grab a cup of water",
    ];
    let sadMessages = [
        "Stretch those legs and let your dog stretch its paws!", 
        "Your dog needs a walk - take some time to move",
    ];

    let array = steps.steps === 0 ? sadMessages : happyMessages;

    return <p className="message">{getRandomElement(array)}</p>
}

export default Message;