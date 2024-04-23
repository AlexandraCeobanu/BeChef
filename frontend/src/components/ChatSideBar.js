import TitleSideBar from "./TitleSideBar";
import Comment from "./Comment";
export default function ChatSideBar() {
    return(
        <div className="sidebar">
            <TitleSideBar></TitleSideBar>
            <div className="messages">
            <Comment></Comment>
            <Comment></Comment>
            <Comment></Comment>
            <Comment></Comment>
            </div>
        </div>
    )
}

