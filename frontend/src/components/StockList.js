import { useEffect, useState } from "react"
import ItemsView from "./ItemsView"
import { getStockList, deleteItem,updateStockList } from "../services/stockList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCirclePlus,faMinus} from '@fortawesome/free-solid-svg-icons';
import "../styles/shoppingList.scss";
import { updateShoppingList } from "../services/shoppingList";
export default function StockList(props) {
    const [items,setItems] = useState([])
    const [stockList,setStockList] = useState(null)
    

    useEffect(()=> {
        getStockList(props.userId)
        .then((response)=> {
            setStockList(response);
        })
        .catch((error)=> {
            console.log(error);
        })
    },[props])
    const handleAddItem = ()=>{
        setItems([...items,{item: ""}]);
        
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
    const handleSaveStockList = ()=>{
        updateStockList(stockList.id,items)
        .then((response)=> {
            setStockList(response);
            setItems([])
        })
        .catch((error)=>console.log(error))
    }
    const handleRemoveItem=((id)=> {
       
        deleteItem(id)
        .then((response)=> {
           
            setStockList(response);

        })
        .catch((error)=> {console.log(error)});
    })

    const handleAddtoShoppingList = (item)=>{
        updateShoppingList(stockList.id,[item])
        .then(()=> {
           props.handleAddedItem();
        })
        .catch((error)=>console.log(error))
    }


    return (
        <div className="shoppingList">
            <h1>Your stock list</h1> 
            <div className="add-item">
             <p>Add to your list</p>
             <FontAwesomeIcon icon={faCirclePlus} className="icons" onClick={handleAddItem}></FontAwesomeIcon>
             </div>
            {stockList !== null && <ItemsView items={stockList.items} list="stock" handleRemoveItem={handleRemoveItem} handleAddtoShoppingList={handleAddtoShoppingList}></ItemsView>
            }
            <div className="">
            {items.map((item,index) => (
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
            <button type="button" onClick={handleSaveStockList}>Save Stock List</button>
            </div>
        </div>
    )
}