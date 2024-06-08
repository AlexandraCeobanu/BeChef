import React, { useEffect, useState } from 'react';
import { Card, Input } from 'antd';
import { faEllipsisVertical, faPlus } from '@fortawesome/free-solid-svg-icons';
import "../styles/ItemList.scss";
import ItemList from './ItemList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { addShoppingList,getShoppingLists,deleteItem,checkItem } from '../services/shoppingList';
import { DeleteOutlined, EllipsisOutlined, EditOutlined, PlusOutlined,UserAddOutlined,ShareAltOutlined } from '@ant-design/icons';
import CollaboratorsView from "./CollaboratorsView";
import { deleteList } from '../services/shoppingList';
import { updateShoppingList } from '../services/shoppingList';
import UserBadge from './UserBadge';
import MiniRecipe from './MiniRecipe';
import { useNavigate } from 'react-router-dom';
import { useStompClient } from "./WebSocketProvider";
const ShoppingListPage = (props) => {
  const [activeTabKey, setActiveTabKey] = useState(null);
  const [newList, setNewList] = useState("");
  const [addList, setAddList] = useState(false);
  const [lists, setLists] = useState([]);
  const [tabList, setTabList] = useState([]);
  const [contentList, setContentList] = useState({});
  const [items,setItems] = useState([])
  const [addUser, setAddUser] = useState(false)
  const [editing, setEditing] = useState([])
  const client = useStompClient();
  const navigate = useNavigate();
  useEffect(() =>
{
    let tabs = []
    let items = {}
    getShoppingLists(props.userId)
    .then((response) => {
      setLists(response)
        response.map((list,index)=> {
            let myKey = list.id.toString();
           const newTab = {
            key: myKey,
            tab: <div>{list.userId===props.userId ? <p>{list.name}</p> :
             <div style={{display:"flex", gap:"0.3em"}}><ShareAltOutlined></ShareAltOutlined><p>{list.name}</p></div>}</div>
           }
           tabs.push(newTab);
          items[myKey] = renderListItems(list.items);
        })
        
        setContentList(items)
        setTabList(tabs)
        setActiveTabKey(tabs[0]?.key);
    })
},[])

useEffect(()=> {
  if(lists.length !==0)
    {
      lists.forEach(function(list) {
        if(client!==null && client !==undefined){
          const subscription = client.subscribe(`/updateList/${list.id}`, function(message){
            let newItems = { ...contentList}
            newItems[list.id] = renderListItems(JSON.parse(message.body).items)
          })
          const subscription2 = client.subscribe(`/editingList/${list.id}`, function(message){
            console.log(editing)
           const newEditing = [...editing]
           newEditing.push(JSON.parse(message.body))
           console.log("editing")
           console.log(newEditing);
           setEditing(newEditing)
          })

          // const subscription3 = client.subscribe(`/stopEditingList/${list.id}`, function(message){
          //   const newEditing = editing.filter(user => user.id !== JSON.parse(message.body).id)
          //   setEditing(newEditing)
          //  })

          return () => {
            subscription.unsubscribe();
            subscription2.unsubscribe();
            // subscription3.unsubscribe();
                };
        }
      });

    }

},[lists])

const handleRemoveItem=((id)=> {
    let newItems = { ...contentList}
    deleteItem(id)
    .then((response)=> {
      if(client!==null && client !==undefined){
        client.send(`/user/${response.id}/updateList`,[]);
      }
        newItems[response.id] = renderListItems(response.items);
        setContentList(newItems)
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
          setLists(response)
          let tabs = [...tabList]
          let myKey = response.id.toString();
          tabs.push(
            {
              key: myKey,
              tab: <div>{response.userId===props.userId ? <p>{response.name}</p> :
              <div style={{display:"flex", gap:"0.3em"}}><ShareAltOutlined></ShareAltOutlined><p>{response.name}</p></div>}</div>
            }
          )
          setTabList(tabs);
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
  const handleAddItem = (id) =>{
    if(client!==null && client !==undefined){
      client.send(`/user/${id}/editingList`,[],props.userId);
    }
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
        if(client!==null && client !==undefined){
          client.send(`/user/${id}/updateList`,[]);
          // client.send(`/user/${id}/stopEditingList`,[],props.userId);
        }
       setContentList(newItems)
        setItems([])
    })
    .catch((error)=>console.log(error))
}
const handleCheckedItem=((id, value)=> {
  let tabs = []
  let items = {}
  let newItems = { ...contentList}
  checkItem(id,value)
  .then((response)=> {

    if(client!==null && client !==undefined){
            client.send(`/user/${id}/updateList`,[]);
          }
    newItems[response.id] = renderListItems(response.items);
    setContentList(newItems)
      // getShoppingLists(props.userId)
    //   .then((response) => {
    //     if(client!==null && client !==undefined){
    //       client.send(`/user/${id}/updateList`,[]);
    //     }
    //     setLists(response)
    //     response.map((list,index)=> {
    //         let myKey = list.id.toString();
    //        const newTab = {
    //         key: myKey,
    //         tab: list.name
    //        }
    //        tabs.push(newTab);
    //       items[myKey] = renderListItems(list.items);
    //     })
        
    //     setContentList(items)
    //     setTabList(tabs)
    //     setActiveTabKey(tabs[0]?.key);
    // })
    //       .catch((error)=> {
    //           console.log(error);
    //       })
    //  props.handleCheckedItem(value);
  })
  .catch((error)=> {console.log(error)});
})

const handleAddUserEmail = () =>{
  setAddUser(true);
}
const handleDeleteList=(id)=>{
  if(id!==null)
  deleteList(id)
  .then((response)=> {
      const newLists = lists.filter(list=> list.id !== id);
      const tabs = tabList.filter(item => item.key !== id);
      setTabList(tabs);
      setLists(newLists);
  })
  .catch((error)=>{
    console.log(error)
  })
}
const closeViewCollaborators = ()=>{
  setAddUser(false);
}
const displayName = (id) =>{
  const listToFind = lists.find(list => list.id == id);
    if (listToFind) {
      return listToFind.userId;}
  else 
  return -1;
}
const checkOwner = (id) =>{
  const listToFind = lists.find(list => list.id == id);
    if (listToFind && listToFind.userId !== props.userId) {
      return "true";}
  else 
  return "false";
}
const checkRecipe = (id) =>{
  const listToFind = lists.find(list => list.id == id);
    if (listToFind && listToFind.recipeId !== null) {
      return listToFind.recipeId;}
  else 
  return null;
}
const handleSeeRecipe = (id) => {
  const data= {recipeId : id};
  navigate('/viewRecipe', { state: data });
}
const findList = (id) => {
  const listToFind = lists.find(list => list.id == id);
  if(listToFind)
    return listToFind;
  else 
  return null;
}

  return (
    <Card
      className={'card-list'}
      style={{ width: '100%' }}
      title="Shopping Lists"
      extra={<FontAwesomeIcon icon={faPlus} onClick={handleAddShoppingList} style={{ cursor: "pointer" }} />}
      tabList={tabList}
      activeTabKey={activeTabKey}
      onTabChange={onTabChange}
      actions={[
        <DeleteOutlined key="delete" onClick={() => handleDeleteList(activeTabKey)}/>,
        <PlusOutlined key="add-ingredient" onClick={() =>handleAddItem(activeTabKey)} />,
        <UserAddOutlined key="ellipsis" onClick={handleAddUserEmail}/>,
      ]}
    >{
      checkOwner(activeTabKey) === "true" && (<>
      <div style={{display: "flex",flexDirection: "column", gap: "0.5em", color: "rgba(228, 123, 6)", marginBottom: "1em"}}>
      <h4>Owner  </h4> {}<UserBadge userId = {displayName(activeTabKey)}></UserBadge></div>
      </>
    )}
    {editing !== null && (
        <div style={{display: "flex",flexDirection: "column", gap: "0.5em", color: "rgba(228, 123, 6)", marginBottom: "1em"}}>
        <h4>Editing</h4>
        {editing.map((user, index) => (
          user.id !== props.userId &&
          <div key={index}  style={{display: "flex", gap: "0.5em", color: "rgba(228, 123, 6)", marginBottom: "1em"}}>
            <EditOutlined></EditOutlined>
            <h6>{user.userUsername}</h6>
          </div>
        ))}
        </div>
      )}
    {
      checkRecipe(activeTabKey) !==null && (
                    <MiniRecipe recipeId={checkRecipe(activeTabKey)} handleSeeRecipe = {(e)=>handleSeeRecipe(checkRecipe(activeTabKey))}></MiniRecipe>
       
      )
    }
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
    {
      addUser === true &&
      <CollaboratorsView userId={props.userId} listId={activeTabKey} list = {findList(activeTabKey)}  closeViewCollaborators={closeViewCollaborators}></CollaboratorsView>
     
    }
    {contentList[activeTabKey]}
    </Card>
  );
};

export default ShoppingListPage;
