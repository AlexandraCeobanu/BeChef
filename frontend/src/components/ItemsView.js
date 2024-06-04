import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faMinus,faBasketShopping} from '@fortawesome/free-solid-svg-icons';
import { DatePicker } from "antd";
import dayjs from 'dayjs';
import { useEffect, useState } from "react";
export default function ItemsView(props) {

    const [items, setItems] = useState([]);

    useEffect(() => {
        const newItems = [...props.items]
        newItems.sort((a, b) => {
            if (a.expirationDate && b.expirationDate) {
            
              const dateA = dayjs(a.expirationDate);
              const dateB = dayjs(b.expirationDate);
              return dateA - dateB; }
          });
        setItems(newItems);
    },[props.items])
    
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
    const daysUntilExpiration = ((date) => {
        const currentDate = dayjs();
        const expirationDate  = dayjs(date)
        const differenceInDays = expirationDate.diff(currentDate, 'day');
        if (differenceInDays < 0) {
            return -1;
        } else if (differenceInDays < 5) {
            return 0;
        } else {
            return 1;
        }
    })
   

    return(
        <div className="items">
            {items.length !==0 && items.map((item,index)=> (
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
                {item.expirationDate !== undefined && (
                     <div className="expiration">
                    <p>Expiration Date</p>
                     <DatePicker className={daysUntilExpiration(item.expirationDate) === -1 ? "expiration-date expired" : 
                     (daysUntilExpiration(item.expirationDate) === 0 ?  "expiration-date close-expiration" : "expiration-date ok")} 
                     disabled="true" showNow={false} defaultValue={dayjs(item.expirationDate)}/>
                     </div>
                )}
                </div>
            
        ))}
        </div>
    )
}