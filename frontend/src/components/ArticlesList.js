import { Link } from "react-router-dom";

const ArticlesList = ({articles}) => {                        

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