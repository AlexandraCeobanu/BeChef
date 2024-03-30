import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHeart} from '@fortawesome/free-solid-svg-icons';
import '../styles/feedback.scss'
import { useEffect, useState } from 'react'
export default function Feedback(props)
{
    const[liked,setLiked] = useState(props.liked);
    const handleLike = () => {
        props.onClick(!liked)
    }
    useEffect(()=> {
      setLiked(props.liked)
    },[props])
    
    return(
       <div className='feedback'>
         <div className='feedback-text'>
          {props.text === "Likes" ?  
         (<FontAwesomeIcon icon={liked === true ? faHeart : props.icon} className={liked === true ? "liked icons" : "icons"} onClick={handleLike}/>)

         : (<FontAwesomeIcon icon={props.icon} className="icons"/>)}
         <p>{props.nr}</p>
         </div>
         <p>{props.text}</p>
       </div>
    )
}
