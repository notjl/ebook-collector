import { useParams } from "react-router-dom";
import axios from "../api/axios";
import { useState,useEffect } from "react";

import Download from "../components/download";
import Preview from "../components/preview";

import NotFoundPage from "./NotFoundPage";

const ArticlePage = () => {
    
    const {articleID} = useParams();
    const [article, setArticle] = useState([]);
    const [bookCover, setCover] = useState([]);
    const call = "/library/book?book_title="+articleID
    const call2 = "/library/"+articleID+"/cover"

    const book = async () => {
        try{
            let res = await axios.get(call);
            let result = await res.data;
            setArticle(result);
        } catch (e) {
            console.log(e)
        }
    };
    const cover = async () => {
        try{
            await axios({
                url: call2,
                method: 'GET',
                responseType: 'blob', // Important
              }).then((response) => {
                const file = new Blob(
                    [response.data], 
                    {type: 'application/png'});
                const fileURL = URL.createObjectURL(file);
                setCover(fileURL)
              });
              
        }catch (e) {
            console.log(e);
        };
    };
    useEffect(() => {
        book()
        cover()
    }, [])

    if (!article) {
        return <NotFoundPage />
    }

    return (
        <>
        <img src={bookCover}/>
        <h1>{article.title}</h1>
        <p>
            {article.course_code}
            <br/>author: {article.author}
            <br/>publisher: {article.publisher}
            <br/>ISBN: {article.isbn}
            <br/>DOI: {article.doi}
            
            <br/>description: {article.description}

        </p>
        <Preview book={article}/>
        <Download book={article}/>
        </>
    );
}

export default ArticlePage;