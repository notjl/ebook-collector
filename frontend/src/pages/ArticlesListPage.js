import React from 'react';
import { useState,useEffect } from "react";
import axios from "../api/axios";
import "./ArticlesListPage.css";
import ArticlesList from "../components/ArticlesList";
import CoursesList from '../components/CoursesList';


const BOOKS_URL = "/library/books";

const ArticlesListPage = () => {

    const [articles, setArticles] = useState([]);

    const books = async () => {
        try{
            let res = await axios.get(BOOKS_URL);
            let result = await res.data;
            setArticles(result);
        } catch (e) {
            console.log(e)
        }
    };

    useEffect(() => {
        books()
    }, [])
    
    return (
        <>
        <CoursesList articles={articles} />
        <h1>Articles!</h1>
        <ArticlesList articles={articles} />
        </>
        
    );
}

export default ArticlesListPage;