import { Link } from "react-router-dom";

const DeleteList = ({articles, search}) => {                        

    const data = articles.filter((articles => {
        if (articles.title.toLowerCase().includes(search)) {
            return (articles.title)
        }
    }));
    
    return (
        <>
        {data.map(article => (
            <Link key={article.title} to={`/admin/delete=${article.title}`}>
                <p>{article.title}</p>
            </Link>
            ))
        }
        
        </>
    );
}

export default DeleteList;