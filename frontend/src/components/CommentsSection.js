import Comment from "./Comment"
import AddComment from "./AddComment"
import "../styles/recipeview.scss"
import { useEffect, useState } from "react"
import { getRecipeComments } from "../services/comments"
import {useNavigate } from "react-router-dom";
export default function CommentsSection(props)
{
    const [commentAdded, setCommentAdded] = useState(false);
    const [comments,setComments] = useState([]);
    const navigate = useNavigate();
    const handleCommentAdded = ()=> {
        setCommentAdded(true);
        props.handleAddComment();
    }
    useEffect(() => {
        getRecipeComments(props.recipe.id)
        .then((response)=> {
                setComments(response.reverse());
        })
        .catch((error) => {
            console.log(error);
            navigate('/error')
        })
        setCommentAdded(false);
    },[commentAdded])

    return(
        <div className="comments-section">
            <h1>Comments</h1>
            <div className="comments">
                {
                    comments.map((comment,index)=> (
                        <Comment key={index} comment = {comment.comm} userId={comment.senderId}></Comment>
                    ))
                }
            </div>
            <AddComment  recipe={props.recipe} loggedUserId={props.loggedUserId} handleCommentAdded= {handleCommentAdded}></AddComment>
        </div>
        
    )
}