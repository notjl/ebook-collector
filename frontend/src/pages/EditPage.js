import { useRef, useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';
import { ToastContainer, toast } from 'react-toastify'

import "./EditPage.css";

import NotFoundPage from "./NotFoundPage";

const EditPage = () => {

    const {articleID} = useParams();
    const [article, setArticle] = useState([]);
    const [bookCover, setCover] = useState([]);

    var [new_title, setNewTitle] = useState('');
    var [course_code, setCourseCode] = useState('');
    var [author, setAuthor] = useState('');
    var [publisher, setPublisher] = useState('');
    var [isbn, setIsbn] = useState('');
    var [doi, setDoi] = useState('');
    var [description, setDescription] = useState('');

    const errRef = useRef();
    const { auth } = useAuth();
    const token = "Bearer " + auth?.accessToken.access_token

    const BOOK_URL = "/library/book?book_title="+articleID
    const COVER_URL = "/library/"+articleID+"/cover"
    const UPDATE_URL = "library/"+articleID+"/update"

    const book = async () => {
        try{
            let res = await axios.get(BOOK_URL);
            let result = await res.data;
            setArticle(result);
        } catch (e) {
            console.log(e)
        }
    };
    const cover = async () => {
        try{
            await axios({
                url: COVER_URL,
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

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (author === '') {
            author = article.author;
        }
        if (publisher === '') {
            publisher = article.publisher;
        }
        if (isbn === '') {
            isbn = article.isbn;
        }
        if (doi === '') {
            doi = article.doi;
        }
        if (description === '') {
            description = article.description;
        }

        const formData = new FormData();
        formData.append('book_title',articleID);
        formData.append('title',new_title);
        formData.append('course_code', course_code);
        formData.append('author',author);
        formData.append('publisher',publisher);
        formData.append('isbn',isbn);
        formData.append('doi',doi);
        formData.append('description',description)

        try {
            const response = await axios.put(
                UPDATE_URL,
                formData,
                {
                    headers: {
                        'accept': 'application/json',
                        'Authorization': token,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            ) 
            toast.success("Update Successful");
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
        <body>
            <div className="all-container">
                <h1>&lt; E D I T &gt;</h1>
                <div className="box">
                    <div className="book-inputs">
                        <h2>Update</h2>
                        <form onSubmit={handleUpdate}>
                            <input id="title"type="text" placeholder="Enter New Title" 
                                onChange={(e) => setNewTitle(e.target.value)}
                                required/><br/>
                            <input id="course_code" type="text" placeholder="Enter New Course Code" 
                                onChange={(e) => setCourseCode(e.target.value)}
                                required/><br/>
                            <input id="author" type="text" placeholder="Enter New Author"
                                onChange={(e) => setAuthor(e.target.value)}
                                /><br/>
                            <input id="publisher" type="text" placeholder="Enter New Publisher"
                                onChange={(e) => setPublisher(e.target.value)}
                                /><br/>
                            <input id="isbn" type="text" placeholder="Enter New ISBN"
                                onChange={(e) => setIsbn(e.target.value)}
                                /><br/>
                            <input id="doi" type="text" placeholder="Enter New DOI"
                                onChange={(e) => setDoi(e.target.value)}
                                /><br/>
                            <textarea id="description" type="text" placeholder="Enter New Description"
                                onChange={(e) => setDescription(e.target.value)}
                                /><br/>

                            <button className="uploadButton" type="submit">EDIT</button>
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
                        </form>

                    </div>

                    <div className="infos">
                        <h2>Current Book Details</h2>
                        <img src={bookCover} width="300" height="380"/>
                        <div className="detailbox">
                            <p className="edit-title"><b>Title: </b>{article.title}</p>
                            <p className="edit-coursecode"><b>Course Code: </b>{article.course_code}</p>
                            <p className="edit-info"><b>Author: </b>{article.author}</p>
                            <p className="edit-info"><b>Publisher: </b>{article.publisher}</p>
                            <p className="edit-info"><b>ISBN: </b>{article.isbn}</p>
                            <p className="edit-info"><b>DOI: </b>{article.doi}</p>
                            <p className="edit-info"><b>Description: </b>{article.description}</p>

                        </div>

                    </div>


                </div>
            </div>
        </body>
        </>    
    );
}

export default EditPage;