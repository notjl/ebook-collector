import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';

import NotFoundPage from "./NotFoundPage";

const ApprovePage = () => {

    const { auth } = useAuth();
    const token = "Bearer " + auth?.accessToken.access_token

    const {articleID} = useParams();
    const [article, setArticle] = useState([]);
    const [bookCover, setCover] = useState([]);
    const call = "/library/books?book_title="+articleID
    const call2 = "/library/"+articleID+"/cover"
    const APPROVE_URL = "/library/"+articleID+"/approve"

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

    const getApproved = async (e) => {
        e.preventDefault();

        await axios.get(
            APPROVE_URL,
            {
                headers: {
                    'accept': 'application/json',
                    'Authorization': token
                }
            }
        )
    }

    return (
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
                    <form onSubmit={getApproved}>
                        <label className="warningMsg">WARNING: Are you sure to approve this book?</label>
                        <button className="approveButton" type="submit">Approve</button>
                    </form>
                </div>
            </div>
        </div>
    );
}


export default ApprovePage;