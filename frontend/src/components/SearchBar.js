import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
export default function SearchBar() {
    return(
        <div>
            <input type="text" id="search-bar" name="search-bar"  placeholder="Search by recipe name" ></input>
             <FontAwesomeIcon icon={faMagnifyingGlass} id="loop"/>
        </div>
    )
}