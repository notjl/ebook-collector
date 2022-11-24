import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';

import NotFoundPage from "./NotFoundPage";

const DeletePage = () => {

    const { auth } = useAuth();
    const token = "Bearer " + auth?.accessToken.access_token

    const {articleID} = useParams();
    const [article, setArticle] = useState([]);
    const [bookCover, setCover] = useState([]);
    const call = "/library/books?book_title="+articleID
    const call2 = "/library/"+articleID+"/cover"
    const DELETE_URL = "/library/"+articleID+"/delete"

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

    const getDeleted = async (e) => {
        e.preventDefault();

        await axios.delete(
            DELETE_URL,
            {
                headers: {
                    'accept': 'application/json',
                    'Authorization': token
                }
            }
        )
    }

    return (
        <>
        <img src={bookCover}/>
        <h1>{article.title}</h1>
        <p key={article.course_code}>
            {article.course_code}
            <br/>author: {article.author}
            <br/>publisher: {article.publisher}
            <br/>ISBN: {article.isbn}
            <br/>DOI: {article.doi}
            
            <br/>description: {article.description}
            <form onSubmit={getDeleted}>
                <button type="submit">Delete</button>
            </form>
        </p>
        </>
    );
}

export default DeletePage;