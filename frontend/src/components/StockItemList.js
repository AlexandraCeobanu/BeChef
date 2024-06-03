import { Card } from 'antd';
import { Input } from 'antd';
import { useEffect,useState } from 'react';
import { DeleteOutlined} from '@ant-design/icons';
import { DatePicker } from "antd";
import dayjs from 'dayjs';
export default function StockItemList(props){

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

    const handleRemoveItem = (id) => {
        if(props.handleRemoveItem !== undefined)
        props.handleRemoveItem(id);
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


    return(
        <>
        { items !== null && items.map((item,index) => (
             <Card.Grid key={index} className='grid-stock'>
             <div className="expiration">
             <p>Expiration Date</p>
                     <DatePicker className={daysUntilExpiration(item.expirationDate) === -1 ? "expiration-date expired" : 
                     (daysUntilExpiration(item.expirationDate) === 0 ?  "expiration-date close-expiration" : "expiration-date ok")} 
                     disabled="true" showNow={false} defaultValue={dayjs(item.expirationDate)}/>
            </div>
            <div className='item'>
            <Input className='name-item'  value={item.item} disabled="true"  placeholder={item.item}/>
            <Input className='quantity-item' value={item.quantity}  placeholder={item.quantity}/>
            <DeleteOutlined id="delete-item" onClick={(e) => {handleRemoveItem(item.id)}}></DeleteOutlined>
            
            </div>
             </Card.Grid>
        )
        )   
        }
        </>
    )
}