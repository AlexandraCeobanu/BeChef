import { useState } from "react";
import { postComment } from "../services/comments";
import { useStompClient } from "./WebSocketProvider";
import {useNavigate } from "react-router-dom";
export default function AddComment(props)
{
    const [comment,setComment] = useState("");
    const {client} = useStompClient();
    const navigate = useNavigate();
    const handleValueChange = (event) => {
        setComment(event.target.value);
    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
        let comm = {
            comm: comment,
            senderId: props.loggedUserId,
            receiverId: props.recipe.userId,
            recipeId: props.recipe.id
        }
          postComment(comm)
          .then (
            () => {
                setComment("");
                props.handleCommentAdded();
                if(client !==undefined && client !==null && client.connected) {
                    client.send(`/user/${comm.receiverId}/comment`,[],JSON.stringify(comm));}
            }
          )
          .catch((error)=> {
            setComment("");
            console.log(error);
            navigate('/error');
          })
        }
    };

    return(
        <div className="add-comment">
            <input type="text" placeholder="Add a comment" value={comment} onChange={handleValueChange} onKeyDown={handleKeyDown}></input>
        </div>
        
    )
}