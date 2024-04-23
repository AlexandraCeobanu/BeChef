import InitiateTopicButton from "./InitiateTopicButton";
import SearchBar from "./SearchBar";

export default function SearchTopic() {
    return(
        <div className="search-topic">
            <SearchBar></SearchBar>
            <InitiateTopicButton></InitiateTopicButton>
        </div>
    )
}