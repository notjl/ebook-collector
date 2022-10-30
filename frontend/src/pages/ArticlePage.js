import { useParams } from "react-router-dom";
import articles from '../components/article-content';
import NotFoundPage from "./NotFoundPage";

const ArticlePage = () => {
    const {articleID} = useParams();
    const article = articles.find(article => article.title === articleID);

    if (!article) {
        return <NotFoundPage />
    }

    return (
        <>
        <h1>{article.title}</h1>
        <p key={article.course_code}>
            {article.course_code}
        </p>
        </>
    );
}

export default ArticlePage;