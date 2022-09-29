import { Link } from "react-router-dom";

const ArticlesList = ( { articles } ) => {
    return (
        <>
        {articles.map(article => (
            <Link key={article.name} to={`/articles/${article.name}`}>
                <h3>{article.title}</h3>
                <p>{article.content}</p>
            </Link>
            ))
        }
        </>
    );
}

export default ArticlesList;