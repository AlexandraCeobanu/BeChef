import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../styles/feedback.scss'
export default function Feedback(props)
{
    return(
       <div className='feedback'>
         <div className='feedback-text'>
         <FontAwesomeIcon icon={props.icon} className="icons" />
         <p>100</p>
         </div>
         <p>{props.text}</p>
       </div>
    )
}
