import { Link } from "react-router-dom";
import BookCover from "./BookCover";

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
        <div className="editResults">
        {data.map(article => (
            <div className="container">
                <Link className="link" style={{textDecoration: 'none'}} key={article.title} to={`/admin/approve/${article.title}`}>
                <BookCover title={article.title} />
                <p>{article.title}</p>
            </Link></div>
            ))
        }
        </div>
    );
}

export default UnApprovedList;