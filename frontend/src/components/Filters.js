import { useEffect, useState } from "react";
import Filter from "./Filter";

export default function Filters(props){
    const [clickedFilter, setClickedFilter] = useState(props.appliedFilter);
    const handleClickFilter=(filter)=> {
        // setClickedFilter(filter)
        props.handleFilter(filter);
    }
    const handleRemoveFilter=(filter)=> {
        props.handleRemoveFilter(filter);
    }
    useEffect(()=> {
        setClickedFilter(props.appliedFilter);
    },[props.appliedFilter])
    return(
        <div className={props.blur === true ? "blur filters" : "filters"}>
            <Filter text="All" clicked={clickedFilter===1 || clickedFilter===null ? true : false} filter={1}  handleClickFilter={handleClickFilter} ></Filter>
            <Filter text="Meat" clicked={clickedFilter===2 ? true : false} filter={2}  handleClickFilter={handleClickFilter} ></Filter>
            <Filter text=" Fish" clicked={clickedFilter===3 ? true : false} filter={3} handleClickFilter={handleClickFilter} ></Filter>
            <Filter text=" Pasta" clicked={clickedFilter===4 ? true : false} filter={4} handleClickFilter={handleClickFilter} ></Filter>
            <Filter text=" Salad" clicked={clickedFilter===5 ? true : false} filter={5} handleClickFilter={handleClickFilter} ></Filter>
            <Filter text=" Dessert" clicked={clickedFilter===6 ? true : false} filter={6}  handleClickFilter={handleClickFilter} ></Filter>
            <Filter text=" Time < 1h" clicked={clickedFilter===7 ? true : false} filter={7}  handleClickFilter={handleClickFilter}></Filter>
            <Filter text=" Time < 2h" clicked={clickedFilter===8 ? true : false} filter={8}  handleClickFilter={handleClickFilter} ></Filter>
            <Filter text= "Your ingredients" clicked={clickedFilter===9 ? true : false} filter={9} handleClickFilter={handleClickFilter}></Filter>
        </div>
    )
}