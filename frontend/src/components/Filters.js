import { useEffect } from "react";
import Filter from "./Filter";

export default function Filters(props){
    const handleClickFilter=(filter)=> {
        props.handleFilter(filter);
    }
    useEffect(()=> {

    },[props.allFilter])
    return(
        <div className={props.blur === true ? "blur filters" : "filters"}>
            <Filter text="All" clicked={props.allFilter} filter={1} allFilter={props.allFilter} handleClickFilter={handleClickFilter}></Filter>
            <Filter text=" Breakfast" clicked={false} filter={2} allFilter={props.allFilter} handleClickFilter={handleClickFilter}></Filter>
            <Filter text=" Lunch" clicked={false} filter={3} allFilter={props.allFilter} handleClickFilter={handleClickFilter} ></Filter>
            <Filter text=" Dinner" clicked={false} filter={4} allFilter={props.allFilter} handleClickFilter={handleClickFilter} ></Filter>
            <Filter text=" Dessert" clicked={false} filter={5} allFilter={props.allFilter} handleClickFilter={handleClickFilter}></Filter>
            <Filter text=" Time < 1h" clicked={false} filter={6} allFilter={props.allFilter} handleClickFilter={handleClickFilter}></Filter>
            <Filter text=" Time < 2h" clicked={false} filter={7} allFilter={props.allFilter} handleClickFilter={handleClickFilter}></Filter>
            <Filter text= "Your ingredients" clicked={false} filter={8} allFilter={props.allFilter} handleClickFilter={handleClickFilter}></Filter>
        </div>
    )
}