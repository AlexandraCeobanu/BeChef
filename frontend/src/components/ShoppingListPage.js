import React, { useEffect, useState } from 'react';
import { Card, Input } from 'antd';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import "../styles/ItemList.scss";
import ItemList from './ItemList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { addShoppingList,getShoppingLists,deleteItem,checkItem } from '../services/shoppingList';
import { DeleteOutlined, EllipsisOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { updateShoppingList } from '../services/shoppingList';

const ShoppingListPage = (props) => {
  const [activeTabKey, setActiveTabKey] = useState("tab");
  const [newList, setNewList] = useState("");
  const [addList, setAddList] = useState(false);
  const [tabList, setTabList] = useState([]);
  const [contentList, setContentList] = useState({});
  const [items,setItems] = useState([])
  useEffect(() =>
{
    let tabs = []
    let items = {}
    getShoppingLists(props.userId)
    .then((response) => {
        response.map((list,index)=> {
            let myKey = list.id.toString();
           const newTab = {
            key: myKey,
            tab: list.name
           }
           tabs.push(newTab);
          items[myKey] = renderListItems(list.items);
        })
        
        setContentList(items)
        setTabList(tabs)
        setActiveTabKey(tabs[0]?.key);
    })
},[])

const handleRemoveItem=((id)=> {
    let newItems = { ...contentList}
    deleteItem(id)
    .then((response)=> {
        newItems[response.id] = renderListItems(response.items);
        setContentList( newItems)
    })
    .catch((error)=> {console.log(error)});
})
const renderListItems = (items) => {
    return (
      <div className='list-items'>
        {items.map((item, index) => (
          <ItemList key={index} item={item} handleRemoveItem={handleRemoveItem} handleCheckedItem={handleCheckedItem}></ItemList>
        ))}
      </div>
    );
  };

  const onTabChange = (key) => {
    setActiveTabKey(key);
  };

  const handleSaveShoppingList = (event) => {
    if (event.key === 'Enter') {
      let shoppingList = {
        name: newList,
        userId: props.userId
      };
      addShoppingList(shoppingList)
        .then((response) => {
          setNewList("");
          setAddList(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleChangeShoppingList = (event) => {
    if (event.target && event.target.value !== undefined) {
        setNewList(event.target.value);
      }
  };

  const handleAddShoppingList = () => {
    setAddList(true);
  };
  const handleAddItem = () =>{
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

const handleSaveItems = (id)=>{
    let newItems = { ...contentList}
    updateShoppingList(id,items)
    .then((response)=> {
        newItems[id] = renderListItems(response.items);
       setContentList(newItems)
        setItems([])
    })
    .catch((error)=>console.log(error))
}
const handleCheckedItem=((id, value)=> {
  let tabs = []
  let items = {}
  checkItem(id,value)
  .then(()=> {
      getShoppingLists(props.userId)
      .then((response) => {
        response.map((list,index)=> {
            let myKey = list.id.toString();
           const newTab = {
            key: myKey,
            tab: list.name
           }
           tabs.push(newTab);
          items[myKey] = renderListItems(list.items);
        })
        
        setContentList(items)
        setTabList(tabs)
        setActiveTabKey(tabs[0]?.key);
    })
          .catch((error)=> {
              console.log(error);
          })
    //  props.handleCheckedItem(value);
  })
  .catch((error)=> {console.log(error)});
})


  return (
    <Card
      className='card-list'
      style={{ width: '100%' }}
      title="Shopping Lists"
      extra={<FontAwesomeIcon icon={faPlus} onClick={handleAddShoppingList} style={{ cursor: "pointer" }} />}
      tabList={tabList}
      activeTabKey={activeTabKey}
      onTabChange={onTabChange}
      actions={[
        <DeleteOutlined key="delete" />,
        <PlusOutlined key="add-ingredient" onClick={handleAddItem} />,
        <EditOutlined key="ellipsis" />,
      ]}
    >
        
    <div>
    {items.length !== 0 && items.map((item,index) => (
                <div key={index} className='items-to-add'>
                    <div className='add-item'>
                    <Input className='newList'  placeholder={"new item"} value={item.item} onChange={(e) => handleChangeItem(index, e.target.value)}></Input>
                    <Input id="quantity"  placeholder={"quantity"} value={item.quantity} onChange={(e) => handleChangeQuantity(index, e.target.value)} ></Input>
                    </div>
                </div>
               )
    )}
    {items.length !== 0 &&
     <button type="button" className='buttons' onClick={(e) => handleSaveItems(activeTabKey)}>Save</button>}
    </div>
    {
    addList === true &&
    <Input className='newList' value={newList} placeholder='Name' onChange={(event) => handleChangeShoppingList(event)} onKeyDown={(event) => handleSaveShoppingList(event)} />
    }
    {contentList[activeTabKey]}
    </Card>
  );
};

export default ShoppingListPage;
