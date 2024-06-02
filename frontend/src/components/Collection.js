import "../styles/collection.scss"
import { Card, Space } from 'antd'
import {faCirclePlus} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Input } from 'antd';
import { getCollections, saveCollection } from "../services/collection";
import { saveRecipeInCollection } from "../services/collection";
export default function Collection(props){
    const [newCollection, setNewCollection] = useState(false);
    const [collectionName, setCollectionName] = useState("");
    const [collections, setCollections] = useState([]); 
    useEffect(() => {
        getCollections(props.userId)
        .then((response) => {
            setCollections(response);
        })
        .catch((error)=>{
            console.log(error);
        })
    },[])
    const handleAddCollection = ()=> {
        setNewCollection(true);
    }
    const handleCollectionName =(event) => {
        setCollectionName(event.target.value);
    }
    const handleSaveCollection = (event) => {
        let collection = {
            name : collectionName,
            recipeId: props.recipeId
        }
        saveCollection(collection)
        .then(() => {
            props.closeViewCollections();
        })
        .catch((error) => {
            console.log(error);
        })
    }
    const handleSaveRecipeInCollection = (collection) => {
        saveRecipeInCollection(collection.id, props.recipeId)
        .then(() => {
            props.closeViewCollections();
        })
        .catch((error) => {
            console.log(error);
        })

    }
    return(
    <Space direction="vertical" size={16}>
    <Card title="Your collections" className="collection" extra={<FontAwesomeIcon id="add-col" icon={faCirclePlus} onClick={handleAddCollection}></FontAwesomeIcon>} style={{ width: 300 , minHeight: 300 }}>

        {collections!==undefined && collections.map((collection, index) => (
            <Card key={index} type="inner" hoverable="true" onClick={() => handleSaveRecipeInCollection(collection)}>
            {collection.name}
          </Card>
        ))}
    {newCollection === true && 
    <div className="new-collection">
    <Input placeholder="Collection Name" value ={collectionName} onChange={handleCollectionName} />
    <button type="button" className='buttons' onClick={handleSaveCollection}>Save</button>
    </div>
    } 
    </Card>
  </Space>
        // <div className="collection">
        //     <h3>Your collection</h3>
        //     <hr></hr>
        // </div>
    )
}
