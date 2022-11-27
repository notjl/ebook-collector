import React from 'react';
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";
import ArticlesList from "../components/ArticlesList";

import NavBar from '../components/Navbar';
import ImageBG from '../components/ImageBG';

const QUERY_URL = "/library/search?query=";

const CoursesListPage = () => {

    const {courseID} = useParams();
    const [articles, setArticles] = useState([]);

    const books = async () => {
        try{
            let res = await axios.get(QUERY_URL+courseID);
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
          <ImageBG heading={courseID}/>
        </div>
        <ArticlesList articles={articles} />
        </>
        
    );
}

export default CoursesListPage;