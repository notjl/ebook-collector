import { Link } from "react-router-dom";
import { useState,useEffect } from "react";

const BOOKS_URL = "/library/books";

const ArticlesList = ({articles}) => {                        

    console.log(articles)

    return (
        <>
        {articles.map(article => (
            <Link key={article.title} to={`/a/${article.title}`}>
                <h3>{article.title}</h3>
            </Link>
            ))
        }
        </>
    );
}

export default ArticlesList;