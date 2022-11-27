import React from 'react';
import { useState,useEffect } from "react";
import axios from "../api/axios";
import "./ArticlesListPage.css";
import ArticlesList from "../components/ArticlesList";
import CoursesList from '../components/CoursesList';
import Navbar from '../components/Navbar';
import ImageBG from '../components/ImageBG';


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
        <Navbar />
        <ImageBG heading='E-BOOKS'/>
        <CoursesList articles={articles} />
        <ArticlesList articles={articles} />
        </>
        
    );
}

export default ArticlesListPage;