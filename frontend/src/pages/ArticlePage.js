
import { useParams } from "react-router-dom";
import axios from "../api/axios";
import { useState,useEffect } from "react";

import Download from "../components/download";
import Preview from "../components/preview";

import NotFoundPage from "./NotFoundPage";

const BOOK_URL = "/library/book";

const ArticlePage = () => {
    
    const {articleID} = useParams();
    const [article, setArticle] = useState([]);
    const call = BOOK_URL+"?book_title="+articleID

    const book = async () => {
        try{
            let res = await axios.get(call);
            let result = await res.data;
            setArticle(result);
        } catch (e) {
            console.log(e)
        }
    };

    useEffect(() => {
        book()
    }, [])

    if (!article) {
        return <NotFoundPage />
    }

    return (
        <>
        <h1>{article.title}</h1>
        <p key={article.course_code}>
            {article.course_code}
        </p>
        <Preview book={article}/>
        <Download book={article}/>
        </>
    );
}

export default ArticlePage;

