import { useEffect, useState } from "react"
import ItemsView from "./ItemsView"
import { getShoppingList,updateShoppingList } from "../services/shoppingList"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCirclePlus,faMinus} from '@fortawesome/free-solid-svg-icons';
export default function ShoppingList(props) {
    const [items,setItems] = useState([])
    const [shoppingList,setShoppingList] = useState(null)
    

    useEffect(()=> {
        getShoppingList(props.userId)
        .then((response)=> {
            setShoppingList(response);
        })
        .catch((error)=> {
            console.log(error);
        })
    },[])
    const handleAddItem = ()=>{
        setItems([...items,{item: ""}]);
        
    }
    const handleChangeItem = (index,value) =>{
        const newItems = [...items];
        newItems[index] = {item: value};
        setItems(newItems);
    }
    const handleSaveShoppingList = ()=>{
        updateShoppingList(shoppingList.id,items)
        .then(()=> {
            setItems([])
        })
        .catch((error)=>console.log(error))
    }
   
    return (
        <div>
            <h1>Your shopping list</h1> 
            {shoppingList !== null && <ItemsView items={shoppingList.items}></ItemsView>
            }
             <FontAwesomeIcon icon={faCirclePlus} className="icons" onClick={handleAddItem}></FontAwesomeIcon>
            <div>
            {items.map((item,index) => (
                <div key={index}>
                    <ul>
                    <div className="">
                    <li><input type="text" placeholder={"item "+ (index+1)} value={item.item} onChange={(e) => handleChangeItem(index, e.target.value)}></input></li>
                    </div>
                    </ul>
                </div>
               )
               )}
            </div>
               <button type="button" onClick={handleSaveShoppingList}>Save ShoppingList</button>
        </div>
    )
}