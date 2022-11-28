import React from 'react';
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import NavBar from '../components/Navbar';
import ImageBG from '../components/ImageBG';

import axios from "../api/axios";
import ArticlesList from "../components/ArticlesList";

const QUERY_URL = "/library/search?query=";

const SearchPage = () => {

    const {searchID} = useParams();
    const [articles, setArticles] = useState([]);

    const books = async () => {
        try{
            let res = await axios.get(QUERY_URL+searchID);
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
        <NavBar />
        <ImageBG heading='LOGIN'/>
        <h1>You Searched for "{searchID}"</h1>
        <ArticlesList articles={articles} />
        </>
        
    );
}

export default SearchPage;