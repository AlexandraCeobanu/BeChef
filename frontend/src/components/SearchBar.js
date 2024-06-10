import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import "../styles/ThreadChat.scss";
export default function SearchBar(props) {
    const [search,setSearch] = useState("");
    const searchChangeHandler=(event) =>{
        setSearch(event.target.value);
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
         props.searchTopic(search);
         setSearch("")
        }
    };
    
    return(
        <div className="search-bar">
            <FontAwesomeIcon icon={faMagnifyingGlass} id="loop"/>
            <input type="text" id="input-search-bar" name="search-bar"  placeholder="Search by topic" onChange={searchChangeHandler}  onKeyDown={handleKeyDown} ></input>
        </div>
    )
}