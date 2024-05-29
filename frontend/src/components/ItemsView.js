import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faMinus,faBasketShopping} from '@fortawesome/free-solid-svg-icons';
import { DatePicker } from "antd";
import dayjs from 'dayjs';
export default function ItemsView(props) {
    
    const handleRemove  = ((index)=> {
        props.handleRemoveItem(index);
    })
    const handleCheckedItem = ((item) => 
    {
        
        props.handleCheckedItem(item.id, !item.checked);
       
    })

    const handleAddToShoppingList = ((item) => 
    {
        
        props.handleAddtoShoppingList(item);
       
    })
   

    return(
        <div className="items">
            {props.items.length !==0 && props.items.map((item,index)=> (
                item.item!="" && 
                <div className="with-expiration">
                <div className="item" key={index}>
                {props.list !== "stock"  && <input type="checkbox" checked={item.checked} onChange={() => handleCheckedItem(item)}></input>}
                <div className="remove">
                <div className="item-info">
                <div className="name-item">
                <p>{item.item}</p>
                </div>
                <div className="quantity-item">
                <p>{item.quantity}</p>
                </div>
                </div>
                <div className="right-icons">
                <FontAwesomeIcon icon={faMinus} onClick={()=>handleRemove(item.id)} className="icons"></FontAwesomeIcon>
                {props.list === "stock" && <FontAwesomeIcon icon={faBasketShopping} onClick={()=>handleAddToShoppingList(item)} className="icons"></FontAwesomeIcon>}
                </div>
                </div>
                </div>
                {item.expirationDate !==undefined && (
                     <div className="expiration">
                    <p>Expiration Date</p>
                     <DatePicker  className="expiration-date" disabled="true" showNow={false} defaultValue={dayjs(item.expirationDate)}/>
                     </div>
                )}
                </div>
            
        ))}
        </div>
    )
}