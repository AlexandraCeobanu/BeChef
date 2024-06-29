import { useState } from "react";
import InitiateTopicButton from "./InitiateTopicButton";
import SearchBar from "./SearchBar";

export default function SearchTopic(props) {
    
    const searchTopic = (search) =>{
        props.searchTopic(search)
    }
    return(
        <div className="search-topic">
            <SearchBar searchTopic = {searchTopic}></SearchBar>
            <InitiateTopicButton handleAddTopic = {props.handleAddTopic}></InitiateTopicButton>
        </div>

    )
}