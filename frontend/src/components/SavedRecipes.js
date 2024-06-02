
import { Avatar, Card } from 'antd';
import "../styles/collection.scss";
import { useEffect, useState } from 'react';
import Collection from './Collection';
import { getCollections } from '../services/collection';
import RecipesView from './RecipesView';
import { getRecipesByCollection } from '../services/collection';
const { Meta } = Card;
export default function SavedRecipes(props) {
    const [collections, setCollections] = useState([])
    const [seeCollection, setSeeCollection] = useState(false)
    const [collectionRecipes , setCollectionRecipes] = useState(null);
    useEffect(() => {
        getCollections(props.userId)
        .then((response) => {
            setCollections(response);
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
    return(
        <div>
        {seeCollection === false && <div className='collections'>
        <Card  hoverable="true"
        cover={
           <img
               alt="example"
               src="../../images/recipie1.jpg"
           />
            }
            style={{width:200}}
            onClick = {handleSeeAllSavedRecipes}
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
           />
            }
            style={{width:200}}
            onClick={() => handleSeeCollection(collection.id)}
            >
            <Meta
            title={collection.name}
            />
            </Card>)
        )} 
    </div>}
    {seeCollection === true && collectionRecipes !== null &&
        <RecipesView recipes={collectionRecipes} handleRemoveSavedRecipe={props.handleRemoveSavedRecipe} loggedUserId={props.userId} viewedUserId={props.viewedUserId}
        handleChangeLikes={props.handleChangeLikes} handleBlur={props.handleBlur} handleGoToShoppingList={props.handleGoToShoppingList}
        nrLikes ={props.nrLikes}></RecipesView>
    }
    </div>
    )
}