import { useParams } from "react-router-dom";
import axios from "../api/axios";
import { useState,useEffect } from "react";

import Download from "../components/download";
import Preview from "../components/preview";
import NavBar from "../components/Navbar";
import ImageBG from "../components/ImageBG";
import NotFoundPage from "./NotFoundPage";

import "./ArticlePage.css";

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
        <div>
          <NavBar />
          <ImageBG heading={article.title}/>
        </div>
        <div className="book-page">
            <div className="book-cover">
                <img src={bookCover} width="350" height="450"/>
                <div className="details">
                    <p className="title">{article.title}</p>
                    <p className="coursecode">{article.course_code}</p>
                    <p className="info">Author: {article.author}</p>
                    <p className="info">Publisher: {article.publisher}</p>
                    <p className="info">ISBN: {article.isbn}</p>
                    <p className="info">DOI: {article.doi}</p>
                    <p className="info">Description: {article.description}</p>
                    <Preview book={article}/>
                    <Download book={article}/>
                </div>
            </div>
        </div>
        </>
    );
}

export default ArticlePage;