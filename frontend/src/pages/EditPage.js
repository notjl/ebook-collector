import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';

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

    const { auth } = useAuth();
    const token = "Bearer " + auth?.accessToken.access_token

    const call = "/library/book?book_title="+articleID
    const call2 = "/library/"+articleID+"/cover"
    const UPDATE_URL = "library/"

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

    console.log("1 "+JSON.stringify(article.author))
    console.log("2 "+article.author)
    console.log("3 "+author)

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

        console.log("4 "+JSON.stringify(article.author))
        console.log("5 "+article.author)
        console.log("6 "+author)

        const formData = new FormData();
        formData.append('book_title',articleID);
        formData.append('title',new_title);
        formData.append('course_code', course_code);
        formData.append('author',author);
        formData.append('publisher',publisher);
        formData.append('isbn',isbn);
        formData.append('doi',doi);
        formData.append('description',description)

        const response = await axios.put(
            UPDATE_URL+articleID+'/update',
            formData,
            {
                headers: {
                    'accept': 'application/json',
                    'Authorization': token,
                    'Content-Type': 'multipart/form-data'
                }
            }
        );
        console.log(response)
    }


    return (
        <>
        <img src={bookCover}/>
        <p>
            <br/>course code: {article.course_code}
            <br/>author: {article.author}
            <br/>publisher: {article.publisher}
            <br/>ISBN: {article.isbn}
            <br/>DOI: {article.doi}
            
            <br/>description: {article.description}

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
            <input id="description" type="text" placeholder="Enter New Description"
                onChange={(e) => setDescription(e.target.value)}
                /><br/>

            <button type="submit">EDIT</button>
        </form>
        </p>
        </>
    );
}

export default EditPage;