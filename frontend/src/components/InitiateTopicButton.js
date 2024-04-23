import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRocketchat } from "@fortawesome/free-brands-svg-icons"
import "../styles/ThreadChat.scss";
import { useState } from "react";
import AddTopic from "./AddTopic";
export default function InitiateTopicButton() {
    const [addTopic, setAddTopic] = useState(false);

    const handleClick = () => {
        if(addTopic === false)
        setAddTopic(true);
        else
        setAddTopic(false);
    }
    return (
        <div className="initiate-topic">
            <FontAwesomeIcon icon = {faRocketchat} onClick={handleClick}></FontAwesomeIcon>
            <h5>Initiate Topic</h5>
            {addTopic === true && <AddTopic handleClick={handleClick} ></AddTopic>}
        </div>
    )
}