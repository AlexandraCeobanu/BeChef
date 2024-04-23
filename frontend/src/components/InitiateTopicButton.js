import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRocketchat } from "@fortawesome/free-brands-svg-icons"
import "../styles/ThreadChat.scss";
import { useState } from "react";
export default function InitiateTopicButton() {
    const [addTopic, setAddTopic] = useState(false);

    const handleClick = () => {
        setAddTopic(true);
    }
    return (
        <div className="initiate-topic" onClick={handleClick}>
            <FontAwesomeIcon icon = {faRocketchat}></FontAwesomeIcon>
            <h5>Initiate Topic</h5>
        </div>
    )
}