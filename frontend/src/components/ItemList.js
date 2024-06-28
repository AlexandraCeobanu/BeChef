import { Card } from 'antd';
import { Input } from 'antd';
import { useEffect,useState } from 'react';
import { DeleteOutlined} from '@ant-design/icons';
export default function ItemList(props){
const [quantity, setQuantity] = useState(props.item!==null ? props.item.quantity : "")
    const handleRemoveItem = (id) => {
        if(props.handleRemoveItem !== undefined)
        props.handleRemoveItem(id);
    }
    useEffect(()=>{
        
    },[props.item])

    const handleCheckedItem = ((item) => 
        {
            
            props.handleCheckedItem(item.id, !item.checked);
           
        })
     
    const handleChangeQuantity = ((e) => {
        setQuantity(e.target.value);
    })
    const handleUpdateQuantity= (event) => {
        if (event.key === 'Enter') {
        props.updateQuantity(props.item.id, quantity)
      };}
    return(
        <>
        { props.item !== null && (
            <>
             <Card.Grid className='grid'>
            <div className='item'>
            <Input type="checkbox" className="checkbox" checked={props.item.checked} onChange={() => handleCheckedItem(props.item)}/>
            <Input className='name-item'  value={props.item!== null ? props.item.item : ""} disabled={true}  placeholder={props.item!== null ? props.item.item : ""} />
            <Input className='quantity-item' value={quantity}  placeholder={quantity}
            onChange={(e) => handleChangeQuantity(e)} onKeyDown={(event) => handleUpdateQuantity(event)} />
            <DeleteOutlined id="delete-item" onClick={(e) => {handleRemoveItem(props.item.id)}} ></DeleteOutlined>
            </div>
           
             </Card.Grid>
            
            </>
            )
        }
        </>
    )
}