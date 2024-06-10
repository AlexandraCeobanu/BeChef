import { useEffect, useState } from 'react'
import '../styles/filter.scss'
export default function Filter(props){
    const [clicked,setClicked] = useState(props.clicked);
    const handleClickFilter=()=>{

        props.handleClickFilter(props.filter);
       
    
    }
    useEffect(()=> {
        setClicked(props.clicked);
    },[props.clicked])
    return(
        <div className="filter">
            <button className={clicked === true ? 'filter clicked' : "filter" }onClick={handleClickFilter}>{props.text}</button>
        </div>
    )
}