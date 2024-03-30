import '../styles/recipeview.scss';
export default function IngredientView(props)
{
    return(
        <div className="ingredients">
                <h1>Ingredients</h1>
                <ul>
                    {props.ingredients.map((ingredient,index) => (
                        ingredient.name!=="" && 
                        <li key={index}>{ingredient.name}</li>
                    ))}
                </ul>
        </div>
    )
}