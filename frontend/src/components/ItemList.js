import { Card } from 'antd';
import { Input } from 'antd';
import { useEffect,useState } from 'react';
import { DeleteOutlined} from '@ant-design/icons';
export default function ItemList(props){

    const handleRemoveItem = (id) => {
        if(props.handleRemoveItem !== undefined)
        props.handleRemoveItem(id);
    }
    useEffect(()=>{
        
    },[props.item])

    return(
        <>
        { props.item !== null && (
            <>
             <Card.Grid className='grid'>
            <div className='item'>
            <Input type="checkbox" className="checkbox"/>
            <Input className='name-item'  value={props.item!== null ? props.item.item : ""} disabled="true"  placeholder={props.item!== null ? props.item.item : ""} />
            <Input className='quantity-item' value={props.item!==null && props.item.quantity}  placeholder={props.item!==null && props.item.quantity}/>
            <DeleteOutlined id="delete-item" onClick={(e) => {handleRemoveItem(props.item.id)}}></DeleteOutlined>
            </div>
           
             </Card.Grid>
            
            </>
            )
        }
        </>
    )
}