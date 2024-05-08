import { useEffect, useState } from 'react'
import '../styles/filter.scss'
export default function Filter(props){
    const [clicked,setClicked] = useState(props.clicked);
    const handleClickFilter=()=>{
        if(clicked === false)
        {setClicked(true);
        props.handleClickFilter(props.filter);}
        else{
        setClicked(false)
        props.handleRemoveFilter(props.filter);
    }
    }
    useEffect(()=> {
        setClicked(props.clicked);
    },[props.clicked])
    useEffect(()=> {
        if(props.text !== "All" && props.allFilter === true){
        setClicked(false);}
    },[props.allFilter])
    return(
        <div className="filter">
            <button className={clicked === true ? 'filter clicked' : "filter" }onClick={handleClickFilter}>{props.text}</button>
        </div>
    )
}