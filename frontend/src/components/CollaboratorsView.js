import "../styles/collection.scss"
import { Badge, Card, Space } from 'antd'
import {faCirclePlus,faMinusCircle} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Input } from 'antd';
import { getCollaborators,deleteCollaborator } from "../services/shoppingList";
import UserBadge from "./UserBadge";
import { useStompClient } from "./WebSocketProvider";
export default function Collection(props){
    const [newCollaborator, setNewCollaborator] = useState(false);
    const [collaboratorEmail, setCollaboratorEmail] = useState("");
    const [collaborators, setCollaborators] = useState([]); 

    const client = useStompClient();
    useEffect(() => {
        getCollaborators(props.listId)
        .then((response) => {
            setCollaborators(response);
        })
        .catch((error)=>{
            console.log(error);
        })
    },[])
    const handleAddCollaborator = ()=> {
        setNewCollaborator(true);
    }
    const handleCollaboratorEmail =(event) => {
        setCollaboratorEmail(event.target.value);
    }
    const handleSaveCollaborator = (event) => {
        if(client!==null && client !==undefined){
            client.send(`/user/${props.listId}/shareShoppingList`,[],collaboratorEmail);
            props.closeViewCollaborators();
        }
        }
    const handleDeleteCollaborator = (event, colId) =>{
        deleteCollaborator(colId,props.listId)
        .then((response) => {
            const newCollaborator = collaborators.filter(col => col.id !== colId);
            setCollaborators(newCollaborator);
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    const handleCloseView=(event)=>{
        if(event.key ="Enter")
            {
                props.closeViewCollaborators();
            }
    }
    return(
    <Space direction="vertical" size={16}>
    <Card title="Your collaborators" className="collection" extra={<FontAwesomeIcon id="add-col" icon={faCirclePlus} onClick={handleAddCollaborator}></FontAwesomeIcon>} 
    style={{ width: 300 , minHeight: 300 }} onClick={(event) => handleCloseView(event)} onKeyDown={(event)=> handleCloseView(event)}>

        {collaborators!==undefined && collaborators.map((collaborator, index) => (
            <Card key={index} type="inner" hoverable="true">
                <div className="user">
            <UserBadge userId={collaborator.id}></UserBadge>
            <FontAwesomeIcon icon={faMinusCircle} onClick={(e) => handleDeleteCollaborator(e,collaborator.id)}></FontAwesomeIcon>
            </div>
          </Card>
        ))}
    {newCollaborator === true && 
    <div className="new-collection">
    <Input placeholder="Collaborator Email" value ={collaboratorEmail} onChange={handleCollaboratorEmail} />
    <button type="button" className='buttons' onClick={handleSaveCollaborator}>Add</button>
    </div>
    } 
    </Card>
  </Space>
    )
}
