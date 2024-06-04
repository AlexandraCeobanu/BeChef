import { useEffect, useState } from "react"
import ItemsView from "./ItemsView"
import { getShoppingListById,updateShoppingList,deleteItem,checkItem } from "../services/shoppingList"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCirclePlus} from '@fortawesome/free-solid-svg-icons';
import "../styles/shoppingList.scss";
export default function ShoppingList(props) {
    const [items,setItems] = useState([])
    const [shoppingList,setShoppingList] = useState(null)
    

    useEffect(()=> {
        getShoppingListById(props.userId)
        .then((response)=> {
            setShoppingList(response);
        })
        .catch((error)=> {
            console.log(error);
        })
    },[props])
    const handleAddItem = ()=>{
        setItems([...items,{item: "", quantity: ""}]);
        
    }
    const handleChangeItem = (index,value) =>{
        const newItems = [...items];
        newItems[index] = {item: value};
        setItems(newItems);
    }

    const handleChangeQuantity = (index,value) =>{
        const newItems = [...items];
        newItems[index].quantity = value; 
        setItems(newItems);
    }
    const handleSaveShoppingList = ()=>{
        updateShoppingList(shoppingList.id,items)
        .then((response)=> {
            setShoppingList(response);
            setItems([])
        })
        .catch((error)=>console.log(error))
    }
    const handleRemoveItem=((id)=> {
        deleteItem(id)
        .then((response)=> {
            setShoppingList(response);

        })
        .catch((error)=> {console.log(error)});
    })

    
    const handleCheckedItem=((id, value)=> {
        checkItem(id,value)
        .then(()=> {

            getShoppingListById(props.userId)
                .then((response)=> {
                    setShoppingList(response);
                })
                .catch((error)=> {
                    console.log(error);
                })
        //    props.handleCheckedItem(value);
        })
        .catch((error)=> {console.log(error)});
    })
    return (
        <div className="shoppingList">
            <h1>Your shopping list</h1> 
            <div className="add-item">
             <p>Add to your list</p>
             <FontAwesomeIcon icon={faCirclePlus} className="icons" onClick={handleAddItem}></FontAwesomeIcon>
             </div>
            {shoppingList !== null && <ItemsView items={shoppingList.items} list="shopping" handleRemoveItem={handleRemoveItem} handleCheckedItem={handleCheckedItem}></ItemsView>
            }
            <div className="">
            {items.length !== 0 && items.map((item,index) => (
                <div key={index}>
                    <div className="add-item-box">
                    <input type="text" placeholder={"new item"} value={item.item} onChange={(e) => handleChangeItem(index, e.target.value)}></input>
                    <input type="text" placeholder={"quantity"} value={item.quantity} onChange={(e) => handleChangeQuantity(index, e.target.value)}></input>
                    </div>
                </div>
               )
               )}
            </div>
            <div className="save">
            <button type="button" onClick={handleSaveShoppingList}>Save Shopping List</button>
            </div>
        </div>
    )
}