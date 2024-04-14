import '../styles/recipeview.scss';
import {faCheck,faXmark}  from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from 'react';
export default function IngredientView(props)
{
    
    return(
        <div className="ingredients">
                <h1>Ingredients</h1>
                <ul>
                    {props.ingredients.map((ingredient,index) => (
                        ingredient.name!==""  && 
                        <li key={index}>{ingredient.name}
                        {(props.stockList !== null && props.stockList.items.length > 0  && (props.stockList.items.some(item => item.item === ingredient.name)) ? <FontAwesomeIcon icon={faCheck} id="checkedMark"></FontAwesomeIcon> :
                          <FontAwesomeIcon icon={faXmark} id="xMark"></FontAwesomeIcon>)
                          }
                        </li>
                        
                    ))}
                </ul>
        </div>
    )
}