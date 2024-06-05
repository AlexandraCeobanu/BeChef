import { Card , Input, DatePicker} from 'antd';
import "../styles/ItemList.scss";
import { DeleteOutlined, EllipsisOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useState,useEffect } from 'react';
import StockItemList from './StockItemList';
import { getStockList, deleteItem,updateStockList ,updateItem} from "../services/stockList";
import { updateShoppingList } from "../services/shoppingList";
import { deleteAll } from '../services/stockList';

export default function StockListPage(props){

    const [items,setItems] = useState([])
    const [stockList,setStockList] = useState(null)
    const [expiration , setExpiration] = useState(null)

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
    const handleChangeExpiration = (index,e,newExpiration) => {
        const newItems = [...items];
        newItems[index].expirationDate = e;
        setItems(newItems);
        // setExpiration(e);
      };

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

    const updateExpirationDate = (item,newExpiration) => {
        let updatedItem = {
            item: item.item,
            quantity:item.quantity,
            expirationDate:  newExpiration
        }
        updateItem(item.id,updatedItem)
        .then((response) =>{
            setStockList(response);
        })
        .catch((error)=> {console.log(error)});
      };

      const handleAddtoShoppingList = (id,item)=>{
        updateShoppingList(id,[item])
        .then(()=> {
          
        })
        .catch((error)=>console.log(error))
    }
    const handleDeleteAll = ()=>{
        deleteAll(stockList.id)
        .then((response)=> {
            setStockList(null);
            setItems([])
        })
        .catch((error)=>{
            console.log(error)
            
        })
    }

    return (
        <Card title="Stock List" className='card-list'
        style={{ width: '100%' }}
        actions={[
        <DeleteOutlined key="delete" onClick={handleDeleteAll} />,
        <PlusOutlined key="add-ingredient" onClick={handleAddItem}/>,
        <EditOutlined key="ellipsis" />,
      ]}
        >
    <div>
    {items.length !== 0 && items.map((item,index) => (
                <div key={index} className='items-to-add'>
                    <div className='add-item'>
                    <Input className='newList'  placeholder={"new item"} value={item.item} onChange={(e) => handleChangeItem(index, e.target.value)}></Input>
                    <Input id="quantity"  placeholder={"quantity"} value={item.quantity} onChange={(e) => handleChangeQuantity(index, e.target.value)} ></Input>
                    <div className="expiration">
                    <DatePicker  className="expiration-date" placeholder="Choose an expiration date" showNow={false} value={item.expirationDate}  onChange={(e,dateString) => handleChangeExpiration(index,e,dateString)}/>
                    </div> 
                    </div>
                </div>
               )
    )}
    {items.length !== 0 &&
     <button type="button" className='buttons' onClick={handleSaveStockList}>Save</button>}
    </div>
         <div className='list-items'>
        {stockList !== null && <StockItemList items={stockList.items} handleRemoveItem={handleRemoveItem} userId={props.userId}
        updateExpirationDate={updateExpirationDate} handleAddToShoppingList={handleAddtoShoppingList}></StockItemList>}
        </div> 
        </Card>
    )
}