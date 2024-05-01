import "../styles/recipeview.scss";
export default function StepsView(props)
{
    return(
        <div>
        {props.steps.map((step,index)=> (
                step.description!=="" && 
                <div className="step-view" key={index}>
                <p>{step.description}</p>
            </div>
        ))}
        </div>
    )
}