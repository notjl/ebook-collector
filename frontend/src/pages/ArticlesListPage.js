import React from 'react';
import { useState,useEffect } from "react";
import axios from "../api/axios";
import "./ArticlesListPage.css";
import ArticlesList from "../components/ArticlesList";
import CoursesList from '../components/CoursesList';

import NavBar from '../components/Navbar';
import ImageBG from '../components/ImageBG';

const BOOKS_URL = "/library/books?approved=true";

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
        <div>
          <NavBar />
          <ImageBG heading='E-BOOK COLLECTION'/>
        </div>
        <div className="articleAll">
            <div className="allCourse">
                <h1>&lt; C O U R S E S &gt;</h1>   
                <CoursesList articles={articles} />
            </div>

            
            <div className="allBooks">
                <h1>&lt; B O O K S &gt;</h1>
                <ArticlesList articles={articles} />
            </div>
        </div>
        </>
        
    );
}

export default ArticlesListPage;