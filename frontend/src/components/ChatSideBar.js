import TitleSideBar from "./TitleSideBar";
import Comment from "./Comment";
import AddMessage from "./AddMessage";
export default function ChatSideBar(props) {
    return(
        <div className="sidebar">
            <TitleSideBar showThreadChat={props.showThreadChat}></TitleSideBar>
            <div className="messages">
            <Comment></Comment>
            <Comment></Comment>
            <Comment></Comment>
            <Comment></Comment>
            </div>
            <AddMessage></AddMessage>
        </div>
    )
}

