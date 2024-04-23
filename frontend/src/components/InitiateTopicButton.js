import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRocketchat } from "@fortawesome/free-brands-svg-icons"
import "../styles/ThreadChat.scss";
export default function InitiateTopicButton() {
    return (
        <div className="initiate-topic">
            <FontAwesomeIcon icon = {faRocketchat}></FontAwesomeIcon>
            <h5>Initiate Topic</h5>
        </div>
    )
}