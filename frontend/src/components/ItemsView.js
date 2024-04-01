export default function ItemsView(props) {
    return(
        <div>
            {props.items.map((item,index)=> (
                item.item!="" && 
                <div className="" key={index}>
                <p>{item.item}</p>
            </div>
        ))}
        </div>
    )
}