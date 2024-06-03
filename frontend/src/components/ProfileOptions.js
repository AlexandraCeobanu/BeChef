import "../styles/options.scss"
import { useEffect, useState } from "react"
export default function ProfileOptions(props){
    const[classApplication1,setClassApplication1] = useState(props.option===1 ? true : false);
    const[classApplication2,setClassApplication2] = useState(props.option===2 ? true : false);
    const[classApplication3,setClassApplication3] = useState(props.option===3 ? true : false);
    const[classApplication4,setClassApplication4] = useState(props.option===3 ? true : false);
    const handleClick1 = () => {
        setClassApplication2(false);
        setClassApplication3(false);
        setClassApplication4(false);
        setClassApplication1(!classApplication1);
        props.handleOption(1);
    }
    const handleClick2 = () => {
        setClassApplication1(false);
        setClassApplication3(false);
        setClassApplication4(false);
        setClassApplication2(!classApplication2);
        props.handleOption(2);
    }
    const handleClick3 = () => {
        setClassApplication1(false);
        setClassApplication2(false);
        setClassApplication4(false);
        setClassApplication3(!classApplication3);
        props.handleOption(3);
    }
    const handleClick4 = () => {
        setClassApplication1(false);
        setClassApplication2(false);
        setClassApplication3(false);
        setClassApplication3(!classApplication4);
        props.handleOption(4);
    }
    useEffect(()=> {
        setClassApplication1(props.option ===1 ?true : false);
        setClassApplication2(props.option ===2 ?true : false);
        setClassApplication3(props.option ===3 ?true : false);
        setClassApplication4(props.option ===4 ?true : false);
    },[props])

    return(
        <div className="options">
            <div className={classApplication1 ? "user-recipes clicked" : 'user-recipes'}>
                <button type="button" onClick={handleClick1}>Your Recipes</button>
            </div>
            <div className={classApplication2 ? "saved-recipes clicked" : 'saved-recipes'}>
                <button type="button" onClick={handleClick2}>Saved Recipes</button>
            </div>
            <div className={classApplication3 ? "shopping-list clicked" : 'shopping-list'}>
                <button type="button" onClick={handleClick3}>Shopping List</button>
            </div>
            <div className={classApplication4 ? "shopping-list clicked" : 'shopping-list'}>
                <button type="button" onClick={handleClick4}>Stock List</button>
            </div>
        </div>
    )
}