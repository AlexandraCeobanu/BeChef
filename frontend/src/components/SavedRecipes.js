
import { Card } from 'antd';
import "../styles/collection.scss";
import {faMinus}  from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { getCollections } from '../services/collection';
import RecipesView from './RecipesView';
import { getRecipesByCollection } from '../services/collection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { removeCollection } from '../services/collection';
const { Meta } = Card;
export default function SavedRecipes(props) {
    const [collections, setCollections] = useState([])
    const [seeCollection, setSeeCollection] = useState(false)
    const [collectionRecipes , setCollectionRecipes] = useState(null);
    useEffect(() => {
        getCollections(props.userId)
        .then((response) => {
            setCollections(response);
            setSeeCollection(false);
        })
        .catch((error) =>{
            console.log(error)
        })
    },[])
    const handleSeeCollection = (id)=>{
        setSeeCollection(true);
        getRecipesByCollection(id)
        .then((response) => {
            setCollectionRecipes(response);
        })
        .catch((error) => {
            console.log(error)
        })

    }
    const handleSeeAllSavedRecipes = () =>{
        setSeeCollection(true);
        setCollectionRecipes(props.savedRecipes);
    }
    const handleRemoveCollection = (id) => {
        removeCollection(id)
        .then((response)=> {
            setCollections(response);
        })
        .catch((error)=> {
            console.log(error);
        })
    }
    return(
        <div>
        {seeCollection === false && <div className='collections'>
        <Card  hoverable="true"
        cover={
           <img
               alt="example"
               src="../../images/recipie1.jpg"
               onClick = {handleSeeAllSavedRecipes}
           />
            }
            style={{width:200}}
            >
            <Meta
            title="All"
            />
            </Card>
        {collections!== undefined && collections.length !== 0 && collections.map((collection, index) => (
           <Card key={index}  hoverable="true"
           cover={
           <img
               alt="example"
               src="../../images/recipie1.jpg"
               onClick={() => handleSeeCollection(collection.id)}
           />
            }
            style={{width:200}}
           
            >
            <Meta
            title={<div className='title-card'>
                <h4>{collection.name}</h4>
                <FontAwesomeIcon className = "remove" icon={faMinus} onClick={() => handleRemoveCollection(collection.id)}></FontAwesomeIcon>
                </div>}
            />
            </Card>)
        )} 
    </div>}
    {seeCollection === true && collectionRecipes !== null && collectionRecipes.length !== 0 ? 
        (<RecipesView recipes={collectionRecipes} handleRemoveSavedRecipe={props.handleRemoveSavedRecipe} loggedUserId={props.userId} viewedUserId={props.viewedUserId}
        handleChangeLikes={props.handleChangeLikes} handleBlur={props.handleBlur} handleGoToShoppingList={props.handleGoToShoppingList}
        nrLikes ={props.nrLikes}></RecipesView>) :
        (  seeCollection === true && (
            <div className="no-recipes">
                <h1>No recipes saved</h1>
                </div> )
        
        )
    }
    </div>
    )
}