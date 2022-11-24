import { useRef, useState, useEffect } from 'react';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';

import "./UploadPage.css"

const UPLOAD_URL = "/library/upload"

const UploadPdf = () => {


    const { auth } = useAuth();
    const token = "Bearer " + auth?.accessToken.access_token

    const [title, setTitle] = useState('');
    const [course_code, setCourseCode] = useState('');
    const [author, setAuthor] = useState('');
    const [publisher, setPublisher] = useState('');
    const [isbn, setIsbn] = useState('');
    const [doi, setDoi] = useState('');
    const [description, setDescription] = useState('');

    const [pdf, setPDF] = useState();
    const [cover, setCover] = useState(null);

    const changeFile = (event) => {
        setPDF(event.target.files[0])
    }
    const changeCover = (event) => {
        setCover(event.target.files[0])
    }

    const handleUpload = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('ebook', pdf);
        formData.append('title',title);
        formData.append('course_code', course_code);
        formData.append('author',author);
        formData.append('publisher',publisher);
        formData.append('isbn',isbn);
        formData.append('doi',doi);
        formData.append('description',description);
        if (cover != undefined ) {
            formData.append('cover_page',cover);
        }
        
        await axios.post(
            UPLOAD_URL,
            formData,
            {
                headers: {
                    'accept': 'application/json',
                    'Authorization': token,
                    'Content-Type': 'multipart/form-data'
                }
            }
        );
    }


    return (
        <>
        <div className="uploadPDF"></div>
        <div className="uploadDiv">
            <h1>&lt; U P L O A D &gt;</h1>
        <form onSubmit={handleUpload}>
            <input id="title"type="text" placeholder="Enter Title" 
                onChange={(e) => setTitle(e.target.value)}
                required/>
            <label>Document</label>
            <input id="pdf" type="file"
                onChange={changeFile}
                />

            <input id="course_code" type="text" placeholder="Enter Course Code" 
                onChange={(e) => setCourseCode(e.target.value)}
                required/>
            <input id="author" type="text" placeholder="Enter author"
                onChange={(e) => setAuthor(e.target.value)}
                />
            <input id="publisher" type="text" placeholder="Enter publisher"
                onChange={(e) => setPublisher(e.target.value)}
                />
            <input id="isbn" type="text" placeholder="Enter isbn"
                onChange={(e) => setIsbn(e.target.value)}
                />
            <input id="doi" type="text" placeholder="Enter doi"
                onChange={(e) => setDoi(e.target.value)}
                />
            <input id="description" type="text" placeholder="Enter description"
                onChange={(e) => setDescription(e.target.value)}
                />
            <label>Cover Page</label>
            <input id="cover" type="file"
                onChange={changeCover}
                />
            <button type="submit">UPLOAD</button>
        </form>
        </div>
        </>
    )
}

export default UploadPdf;