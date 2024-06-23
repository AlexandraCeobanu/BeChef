import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { faChevronUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import StepsView from "./StepsView";
export default function Step(props)
{
    const [viewMore, setViewMore] = useState(false);
    const handleViewMore=()=>{
        setViewMore(!viewMore);
    }
    return(
        <div className={viewMore===false ? "view-more-steps" : ' pos-absolute'}>
            <div className="more">
            <h2>Steps</h2>
            {viewMore === true && 
                <FontAwesomeIcon id="view-more" icon={faChevronUp} onClick={handleViewMore}></FontAwesomeIcon>
            }
            {viewMore === false && 
            <FontAwesomeIcon id="view-more" icon={faChevronDown} onClick={handleViewMore}></FontAwesomeIcon>
            }
            </div>
            {viewMore === true && 
            <StepsView steps = {props.steps}></StepsView>
            }
        </div>
    )
}