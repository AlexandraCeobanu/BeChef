import { useState } from "react";
import { postThread } from "../services/chat";
import {useNavigate } from "react-router-dom";
export default function AddTopic(props)
{
    const [topic,setTopic] = useState("");
    const navigate=useNavigate();
    const handleValueChange = (event) => {
        setTopic(event.target.value);
    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
        let thread = {
            topic: topic,
            initiatorId: JSON.parse(localStorage.getItem("user")).id
        }
          postThread(thread)
          .then (
            () => {
                setTopic("");
                props.handleClick();
                props.handleAddTopic();
            }
          )
          .catch((error)=> {
            setTopic("");
            console.log(error);
            navigate('/error');
          })
        }
    };

    return(
        <div className="add-thread">
            <input type="text" placeholder="Topic / question " value={topic} onChange={handleValueChange} onKeyDown={handleKeyDown}></input>
        </div>
    )
}