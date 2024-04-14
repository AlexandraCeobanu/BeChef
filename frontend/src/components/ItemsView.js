import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faMinus,faBasketShopping} from '@fortawesome/free-solid-svg-icons';
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
        ))}
        </div>
    )
}