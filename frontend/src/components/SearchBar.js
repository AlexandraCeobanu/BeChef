import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import "../styles/ThreadChat.scss";
export default function SearchBar() {
    return(
        <div className="search-bar">
            <FontAwesomeIcon icon={faMagnifyingGlass} id="loop"/>
            <input type="text" id="input-search-bar" name="search-bar"  placeholder="Search by topic" ></input>
        </div>
    )
}