import { Card, Space } from 'antd';
import { Input } from 'antd';
import { useEffect,useState } from 'react';
import { DeleteOutlined,ShoppingCartOutlined} from '@ant-design/icons';
import {faCirclePlus, faClose} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DatePicker } from "antd";
import dayjs from 'dayjs';
import { getShoppingLists } from '../services/shoppingList';
export default function StockItemList(props){

    const [items, setItems] = useState([]);
    const [expiration, setExpiration] = useState(null);
    const [quantity, setQuantity] = useState(null);
    const [item,setItem] = useState(null);
    const [seeShoppingLists, setSeeShoppingLists] = useState(false);
    const [lists, setLists] = useState([])
    const [itemToAdd, setItemToAdd] = useState(null);
    const [itemQuantity,setItemQuantity] = useState(null);

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

    const handleRemoveItem = (id) => {
        if(props.handleRemoveItem !== undefined)
        props.handleRemoveItem(id);
    }
    const handleSeeShoppingLists = (item) => {
        setItemToAdd(item)
        getShoppingLists(props.userId)
        .then((response) =>{
            setLists(response)
            setSeeShoppingLists(true);
        })
       .catch((error)=> {
        console.log(error);
       })
        // if(props.handleAddToShoppingList !== undefined)
        // props.handleAddToShoppingList(item);
    }
    const handleAddToShoppingList = (shoppingList) => {
        if(props.handleAddToShoppingList !== undefined)
        {props.handleAddToShoppingList(shoppingList.id,itemToAdd);
            setSeeShoppingLists(false)}

    }
    useEffect(()=>{
       
        
    },[props.items])

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

    const handleUpdateExpiration = (event) => {
        if (event.key === 'Enter') {
        props.updateExpirationDate(item,expiration)
      };}

      const handleChangeExpiration = (e,newExpiration,item) => {
        setExpiration(newExpiration);
        setItem(item);
       
      };

      const handleSeeLists=()=>{
        setSeeShoppingLists(false);
      }

      const handleChangeQuantity = ((e,item) => {
        setQuantity(e.target.value);
        setItemQuantity(item)
    })
    const handleUpdateQuantity= (event) => {
        if (event.key === 'Enter') {
        props.updateQuantity(itemQuantity, quantity)
      };}

    return(
        <>
        { items !== null && items.map((item,index) => (
             <Card.Grid key={index} className='grid-stock'>
             <div className="expiration">
             <p>Expiration Date</p>
                     <DatePicker className={daysUntilExpiration(item.expirationDate) === -1 ? "expiration-date expired" : 
                     (daysUntilExpiration(item.expirationDate) === 0 ?  "expiration-date close-expiration" : "expiration-date ok")} 
                     disabled={item.expirationDate !== null ? true : false} showNow={false} defaultValue={dayjs(item.expirationDate)} 
                     onChange={(e,dateString) => handleChangeExpiration(e,dateString,item)} onKeyDown={(event) => handleUpdateExpiration(event)}/>
            </div>
            
            <div className='item'>
            <Input className='name-item'  value={item.item} disabled={true}  placeholder={item.item}/>

            <Input className='quantity-item' value={(itemQuantity!==null && itemQuantity.id !== item.id) || itemQuantity===null ? item.quantity : quantity}  placeholder={(itemQuantity!==null && itemQuantity.id !== item.id) || itemQuantity===null ? item.quantity : quantity}
            onChange={(e) => handleChangeQuantity(e,item)} onKeyDown={(event) => handleUpdateQuantity(event)} />

            <DeleteOutlined id="delete-item" onClick={(e) => {handleRemoveItem(item.id)}}></DeleteOutlined>
            <ShoppingCartOutlined id="buy-item"  onClick={(e) => {handleSeeShoppingLists(item)}}></ShoppingCartOutlined>
            </div>
             </Card.Grid>
        )
        )   
        }
        {seeShoppingLists === true && (
            <Space direction="vertical" size={16}>
            <Card title="Choose a shopping list"extra={<FontAwesomeIcon id="add-col" icon={faClose} style={{cursor:'pointer'}} onClick={handleSeeLists}></FontAwesomeIcon>}  
            className="shopping-lists" 
            style={{ width: 300 , minHeight: 300 }}>
                {lists!==undefined && lists.map((list, index) => (
                    <Card key={index} type="inner" hoverable="true" onClick={() => handleAddToShoppingList(list)}>
                    {list.name}
                  </Card>
                ))} 
            </Card>
          </Space>
        )}
        </>
    )
}