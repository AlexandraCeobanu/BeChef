import "../styles/collection.scss"
import { Badge, Card, Space } from 'antd'
import {faCirclePlus,faMinusCircle} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Input } from 'antd';
import { getCollaborators,deleteCollaborator, getInvitation,getInvitations,deleteInvitation } from "../services/shoppingList";
import UserBadge from "./UserBadge";
import { useStompClient } from "./WebSocketProvider";
import { createInvitation } from "../services/shoppingList";
import {useNavigate } from "react-router-dom";
export default function Collection(props){
    const [newCollaborator, setNewCollaborator] = useState(false);
    const [collaboratorEmail, setCollaboratorEmail] = useState("");
    const [collaborators, setCollaborators] = useState([]); 
    const [invitations, setInvitations] = useState([]);
    const [error,setError] = useState(null);
    const {client} = useStompClient();
    const navigate= useNavigate();
    useEffect(() => {
        getCollaborators(props.listId)
        .then((response) => {
            setCollaborators(response);
        })
        .catch((error)=>{
            console.log(error);
            navigate('/error')
        })
    },[])
    useEffect(() => {
        getInvitations(props.listId)
        .then((response) => {
            setInvitations(response);
        })
        .catch((error)=>{
            console.log(error);
            navigate('/error')
        })
    },[])
    const handleAddCollaborator = ()=> {
        setNewCollaborator(true);
    }
    const handleCollaboratorEmail =(event) => {
        setError(null)
        setCollaboratorEmail(event.target.value);
    }
    const handleSaveCollaborator = (event) => {

        createInvitation(props.listId,collaboratorEmail)
        .then((response) => {

            if(client !==undefined && client!==null   && client.connected){
                client.send(`/user/${props.listId}/shareShoppingList`,[],collaboratorEmail);
            setNewCollaborator(false);
            const newInvitations = [...invitations]
            console.log(newInvitations)
            newInvitations.push(response)
            setInvitations(newInvitations);
            const subscription = client.subscribe(`/changedStatus/${response.id}`, function(message){
            const deleteInvitation = invitations.filter(inv => inv.id !== response.id );
            setInvitations(deleteInvitation);
            setCollaboratorEmail("");
            getCollaborators(props.listId)
            .then((response) => {
                setCollaborators(response);
            })
            .catch((error)=>{
                console.log(error);
                navigate('/error')
        })

            })}
            // props.closeViewCollaborators();
        })
        .catch((error)=> {
            setError(error.message)
            console.log("error " + error.message)
           
        })
        }
    const handleDeleteCollaborator = (event, colId) =>{
        deleteCollaborator(colId,props.listId)
        .then((response) => {
            const newCollaborator = collaborators.filter(col => col.id !== colId);
            setCollaborators(newCollaborator);
        })
        .catch((error)=>{
            console.log(error)
            navigate('/error')
        })
    }
    const handleCloseView=()=>{

                props.closeViewCollaborators();
            
    }
    const findInvitation=(id)=>{
        const invitation = invitations.find(inv => inv.receiverId == id)
        if(invitation)
            return invitation.status
        else
            return ""
    }
    const handleDeleteInvitation =(invitation) => {
        deleteInvitation(invitation.listId, invitation.id)
        .then(()=> {
                const newList = invitations.filter(inv => inv.id !== invitation.id);
                setInvitations(newList);
        })
        .catch((error)=>{
            console.log(error);
            navigate('/error')
        })
    }
    return(
    <Space direction="vertical" size={16}>
    <Card title="Your collaborators" className="collaborators" extra={<div style={{display:"flex",gap:"1em"}}>
    {
        props.list !== null && props.list.userId===props.userId &&
        <FontAwesomeIcon id="add-col" icon={faCirclePlus} onClick={handleAddCollaborator}></FontAwesomeIcon>}
    <FontAwesomeIcon id= "close" icon={faMinusCircle} onClick={(e) => handleCloseView()}></FontAwesomeIcon>
    </div>
} 
    style={{ width: 300 , minHeight: 300 }} >
     {/* onClick={(event) => handleCloseView(event)} onKeyDown={(event)=> handleCloseView(event)} */}


     {props.list !== null && props.list.userId===props.userId && invitations!==undefined &&  invitations.map((invitation, index) => (
            invitation.status !== "accepted" && 
            <Card key={index} type="inner" hoverable="true">
                <div className="user">
            <UserBadge userId={invitation.receiverId}></UserBadge>
            <p style={{color : (findInvitation(invitation.receiverId)=== "Pending" ? "rgba(228, 123, 6)" : "red" ) }}>{findInvitation(invitation.receiverId)}</p>
            <FontAwesomeIcon icon={faMinusCircle} onClick={(e) => handleDeleteInvitation(invitation)}></FontAwesomeIcon>
            </div>
          </Card>
        ))}

        {collaborators!==undefined && collaborators.map((collaborator, index) => (
            <Card key={index} type="inner" hoverable="true">
                <div className="user">
            <UserBadge userId={collaborator.id}></UserBadge>
            {props.list !== null && props.list.userId===props.userId &&
                <FontAwesomeIcon icon={faMinusCircle} onClick={(e) => handleDeleteCollaborator(e,collaborator.id)}></FontAwesomeIcon>}
            </div>
          </Card>
        ))}
    {newCollaborator === true && 
    <div className="new-collection">
    <Input placeholder="Collaborator Email" value ={collaboratorEmail} onChange={handleCollaboratorEmail} />
    {error!== null && <p style={{color:"red", fontSize:"smaller"}}>{error}</p>}
    <button type="button" className='buttons' onClick={handleSaveCollaborator}>Add</button>
    </div>
    } 
    </Card>
  </Space>
    )
}
