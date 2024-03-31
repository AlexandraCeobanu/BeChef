export default function Comment(props)
{
    return(
        <div className="comment">
            <div className="mini-photo">
                <img src="/images/buc.jpg"></img>
            </div>
            <div className="comment-details">
            <h5>@alexandra17: </h5>
            <h6>{props.comment}</h6>
            </div>
        </div>
    )
}