import "../styles/options.scss"
import { useState } from "react"
export default function ProfileOptions(){
    const[classApplication1,setClassApplication1] = useState(true);
    const[classApplication2,setClassApplication2] = useState(false);
    const[classApplication3,setClassApplication3] = useState(false);
    const handleClick1 = () => {
        setClassApplication2(false);
        setClassApplication3(false);
        setClassApplication1(!classApplication1);
    }
    const handleClick2 = () => {
        setClassApplication1(false);
        setClassApplication3(false);
        setClassApplication2(!classApplication2);
    }
    const handleClick3 = () => {
        setClassApplication1(false);
        setClassApplication2(false);
        setClassApplication3(!classApplication3);
    }
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
        </div>
    )
}