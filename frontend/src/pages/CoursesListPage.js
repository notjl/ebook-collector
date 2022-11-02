import React from 'react';
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";
import ArticlesList from "../components/ArticlesList";
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
        <h1>{courseID}</h1>
        <ArticlesList articles={articles} />
        </>
        
    );
}

export default CoursesListPage;