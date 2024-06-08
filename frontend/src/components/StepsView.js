import "../styles/recipeview.scss";
export default function StepsView(props)
{
    return(
        <div className="steps-view">
        {props.steps.map((step,index)=> (
                step.description!=="" && 
                <div className="step-view" key={index}>
                <h4>Pas  {index+1}</h4>
                <p>{step.description}</p>
            </div>
        ))}
        </div>
    )
}