import { Link } from "react-router-dom";
import BookCover from "./BookCover";


const DeleteList = ({articles, search}) => {                        

    const data = articles.filter((articles => {
        if (articles.title.toLowerCase().includes(search)) {
            return (articles.title)
        }
    }));
    
    return (
        <div className="editResults">
        {data.map(article => (
            <div className="container">
                <Link className="link" style={{textDecoration: 'none'}} key={article.title} to={`/admin/delete=${article.title}`}>
                <BookCover title={article.title} />
                <p>{article.title}</p>
            </Link></div>
            ))
        }
        
        </div>
    );
}

export default DeleteList;