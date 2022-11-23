import { useRef, useState, useEffect } from 'react';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';

import "./UploadPdf.css"

const UPDATE_URL = "library/"

const EditPdf = () => {


    const { auth } = useAuth();
    const token = "Bearer " + auth?.accessToken.access_token

    const [old_title, setOldTitle] = useState('');
    const [new_title, setNewTitle] = useState('');
    const [course_code, setCourseCode] = useState('');
    const [author, setAuthor] = useState('');
    const [publisher, setPublisher] = useState('');
    const [isbn, setIsbn] = useState('');
    const [doi, setDoi] = useState('');
    const [description, setDescription] = useState('');



    const handleUpdate = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('book_title',old_title);
        formData.append('title',new_title);
        formData.append('course_code', course_code);
        formData.append('author',author);
        formData.append('publisher',publisher);
        formData.append('isbn',isbn);
        formData.append('doi',doi);
        formData.append('description',description)

        const response = await axios.put(
            UPDATE_URL+old_title+'/update',
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
        <div className="updatePDF"></div>
        <div className="updateDiv">
            <h1>&lt; U P D A T E &gt;</h1>
        <form onSubmit={handleUpdate}>
            <input id="title"type="text" placeholder="Enter Old Title" 
                onChange={(e) => setOldTitle(e.target.value)}
                required/>
            <input id="title"type="text" placeholder="Enter New Title" 
                onChange={(e) => setNewTitle(e.target.value)}
                required/>
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

            <button type="submit">EDIT</button>
        </form>
        </div>
        </>
    )
}

export default EditPdf;