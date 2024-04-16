import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faXmark}  from '@fortawesome/free-solid-svg-icons';
export default function SuccessfullyAddedIngredients(props) {
    const handleGoToShoppingList = () => {
        props.handleGoToShoppingList();
    }
    const handleCloseSuccessfully = ()=> {
        props.handleCloseSuccessfully();
    }
    return (
        <div className="successfully-added-ingredients">
            <h3>Ingredients successfully added </h3>
            <p><button onClick={handleGoToShoppingList}>Go</button> to your shopping list</p>
            <FontAwesomeIcon icon={faXmark} id="xMark" onClick={handleCloseSuccessfully}></FontAwesomeIcon>
        </div>
    )

}