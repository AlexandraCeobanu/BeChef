import "../styles/home.scss"
import { Card } from 'antd';
import "../styles/collection.scss";
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getArticles } from '../services/articles';
import Header from './Header';
const { Meta } = Card;
export default function Articles() {
  const [articles, setArticles] = useState([])
  const navigate = useNavigate();
    useEffect(() => {
        getArticles()
        .then((response) => {
            setArticles(response.articles);
            
        })
        .catch((error) =>{
            console.log(error)
            navigate("/error")

        })
    },[])

   
    return(
        <div className='home'>
        <Header></Header>
        <div className='articles'>
        {articles.length !== 0 && articles.map((article, index) => (
            article.urlToImage !== null && article.title!==null && (
            <Link to={article.url} key={index}>
           <Card key={index}  hoverable="true"
           cover={
           <img
               alt="example"
               src={article.urlToImage}
           />
            }
            >
            <Meta
            title={<div className='title-card'>
                <h4>{article.title}</h4>
               
                </div>}
            />
            </Card>
            </Link>)
            )
        )} 
        </div>
    </div>
    )
}