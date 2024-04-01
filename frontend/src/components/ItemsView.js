import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faMinus} from '@fortawesome/free-solid-svg-icons';
export default function ItemsView(props) {
    return(
        <div className="items">
            {props.items.map((item,index)=> (
                item.item!="" && 
                <div className="item" key={index}>
                <input type="checkbox"></input>
                <div className="remove">
                <div className="item-info">
                <div className="name-item">
                <p>{item.item}</p>
                </div>
                <div className="quantity-item">
                <p>3</p>
                </div>
                </div>
                <FontAwesomeIcon icon={faMinus} className="icons"></FontAwesomeIcon>
                </div>
            </div>
        ))}
        </div>
    )
}