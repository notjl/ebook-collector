import { Link } from "react-router-dom";

const UnApprovedList = ({ articles, search}) => {                        

    const unapprovedBooks = articles.filter(articles => {
        return articles.approved === false;
    });
    const data = unapprovedBooks.filter((articles => {
        if (articles.title.toLowerCase().includes(search)) {
            return (articles.title)
        }
    }));
    
    return (
        <>
        {data.map(article => (
            <Link key={article.title} to={`/admin/approve=${article.title}`}>
                <p>{article.title}</p>
            </Link>
            ))
        }
        
        </>
    );
}

export default UnApprovedList;