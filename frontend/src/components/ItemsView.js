import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faMinus} from '@fortawesome/free-solid-svg-icons';
export default function ItemsView(props) {
    
    const handleRemove  = ((index)=> {
        props.handleRemoveItem(index);
    })
    const handleCheckedItem = ((index,value) => 
    {
        console.log("VALOARE DUPA CHECKED")
        console.log(value);
        props.handleCheckedItem(index, value);
    })
   

    return(
        <div className="items">
            {props.items.length !==0 && props.items.map((item,index)=> (
                item.item!="" && 
                <div className="item" key={index}>
                {props.list !== "stock"  && <input type="checkbox" checked={item.checked} onChange={() => handleCheckedItem(item.id,!item.checked)}></input>}
                <div className="remove">
                <div className="item-info">
                <div className="name-item">
                <p>{item.item}</p>
                </div>
                <div className="quantity-item">
                <p>{item.quantity}</p>
                </div>
                </div>
                <FontAwesomeIcon icon={faMinus} onClick={()=>handleRemove(item.id)} className="icons"></FontAwesomeIcon>
                </div>
            </div>
        ))}
        </div>
    )
}