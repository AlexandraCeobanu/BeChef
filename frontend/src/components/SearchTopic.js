import InitiateTopicButton from "./InitiateTopicButton";
import SearchBar from "./SearchBar";

export default function SearchTopic(props) {
    return(
        <div className="search-topic">
            <SearchBar></SearchBar>
            <InitiateTopicButton handleAddTopic = {props.handleAddTopic}></InitiateTopicButton>
        </div>

    )
}