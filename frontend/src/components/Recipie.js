import '../styles/recipie.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHeart,faComment} from '@fortawesome/free-regular-svg-icons';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import Feedback from './Feedback';
export default function Recipie()
{
    return(
        <div>
            <div className="recipie-photo">
                <img src = "/images/recipie1.jpg" alt="Recipie"></img>
            </div>
            <div className="recipie-feedback">
            <Feedback text='Likes' icon={faHeart}></Feedback>
            <Feedback text='Comments' icon={faComment}></Feedback>
            <Feedback text='Made it' icon={faUtensils}></Feedback>
            </div>
        </div>
    )
}