import '../styles/recipie.scss'
import {faHeart,faComment} from '@fortawesome/free-regular-svg-icons';
import Feedback from './Feedback';
export default function Recipie(props)
{
    return(
        <div>
            <div className="recipie-photo">
                {/* <img src = {props.image} alt="Recipie"></img> */}
                <img src = "/images/recipie1.jpg"></img>
            </div>
            <div className="recipie-feedback">
            <Feedback text='Likes' icon={faHeart}></Feedback>
            <Feedback text='Comments' icon={faComment}></Feedback>
            </div>
        </div>
    )
}