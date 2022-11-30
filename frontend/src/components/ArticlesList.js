import { Link } from "react-router-dom";
import "./ArticlesList.css";
import BookCover from "./BookCover";

const ArticlesList = ({articles}) => {                        

    return (
        <>
        <div className="allBooks">
        {articles.map(article => (
            <div className="container">
            <Link className="link" style={{textDecoration: 'none'}} key={article.title} to={`/a/${article.title}`}> 
            <BookCover title={article.title} />
                <p>{article.title}</p> 
            </Link> </div>
            ))
        }
        </div>
        </>
    );
}

export default ArticlesList;
