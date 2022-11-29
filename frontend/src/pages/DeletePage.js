import { useRef, useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';
import "./ArticlePage.css";
import { ToastContainer, toast } from 'react-toastify'

import NotFoundPage from "./NotFoundPage";

const DeletePage = () => {

    const { auth } = useAuth();
    const token = "Bearer " + auth?.accessToken.access_token

    const {articleID} = useParams();
    const [article, setArticle] = useState([]);
    const [bookCover, setCover] = useState([]);
    const call = "/library/book?book_title="+articleID
    const call2 = "/library/"+articleID+"/cover"
    const DELETE_URL = "/library/"+articleID+"/delete"

    const errRef = useRef();

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

        try {
        await axios.delete(
            DELETE_URL,
            {
                headers: {
                    'accept': 'application/json',
                    'Authorization': token
                }
            }
        )
        toast.success("Book Deleted")
        } catch(err) {
            if (err.response?.status === 422) {
                toast.error("Unauthorized, please log in as Admin")
            } else {
                toast.error("Unknown Error")    
            }
            errRef.current.focus();
            } 
        }

    return (
        <>
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
                    <form onSubmit={getDeleted}>
                        <label className="warningMsg">WARNING: Are you sure to remove this book?</label>
                        <ToastContainer
                            position="top-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable={false}
                            pauseOnHover
                            theme="light"
                            />
                        <button className="deleteButton" type="submit">Delete</button>
                    </form>
                </div>
            </div>
        </div>
        </>
    );
}

export default DeletePage;