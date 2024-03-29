import Comment from "./Comment"
import AddComment from "./AddComment"
import "../styles/recipeview.scss"
export default function commentsSection()
{
    return(
        <div className="comments-section">
            <h1>Comments</h1>
            <div className="comments">
            <Comment></Comment>
            <Comment></Comment>
            <Comment></Comment>
            <Comment></Comment>
            <Comment></Comment>
            <Comment></Comment>
            <Comment></Comment>
            </div>
            <AddComment></AddComment>
        </div>
    )
}