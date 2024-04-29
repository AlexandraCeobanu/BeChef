import { useEffect, useState } from "react";
import { postComment } from "../services/comments";
import { useStompClient } from "./WebSocketProvider";
export default function AddComment(props)
{
    const [comment,setComment] = useState("");
    const client = useStompClient();
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
                if(client!==null && client !==undefined){
                    client.send(`/user/${comm.receiverId}/comment`,[],JSON.stringify(comm));}
            }
          )
          .catch((error)=> {
            setComment("");
            console.log(error);
          })
        }
    };

    return(
        <div className="add-comment">
            <input type="text" placeholder="Add a comment" value={comment} onChange={handleValueChange} onKeyDown={handleKeyDown}></input>
        </div>
        
    )
}