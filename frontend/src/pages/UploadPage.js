import { useRef, useState } from 'react';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';
import { ToastContainer, toast } from 'react-toastify'

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

    const errRef = useRef();

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
        
        try {
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
            ) 
            toast.success("Upload Complete");
        } catch(err) {
            if (err.response?.status === 422) {
                toast.error("Unauthorized")
            } if (err.response?.status === 403) {
                toast.error("Unauthorized, please log in as Professor")
            } else {
                toast.error("Unknown Error")    
            }
            errRef.current.focus();
        }
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
            
            <input id="course_code" type="text" placeholder="Enter Course Code" 
                onChange={(e) => setCourseCode(e.target.value)}
                required/>
            <input id="author" type="text" placeholder="Enter Author"
                onChange={(e) => setAuthor(e.target.value)}
                />
            <input id="publisher" type="text" placeholder="Enter Publisher"
                onChange={(e) => setPublisher(e.target.value)}
                />
            <input id="isbn" type="text" placeholder="Enter ISBN"
                onChange={(e) => setIsbn(e.target.value)}
                />
            <input id="doi" type="text" placeholder="Enter DOI"
                onChange={(e) => setDoi(e.target.value)}
                />
            <textarea rows="3" cols="30" id="description" type="text" placeholder="Enter Description"
                onChange={(e) => setDescription(e.target.value)}
                />
            <label>&lt; Select Document &gt;</label>
            <input id="pdf" type="file" title="Select Document"
                onChange={changeFile}
                />

            <label>&lt; Select Cover Page &gt;</label>
            <input id="cover" type="file" title="Select Cover Page"
                onChange={changeCover}
                />
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
            <button type="submit">UPLOAD</button>
            
        </form>
        </div>
        </>
    )
}

export default UploadPdf;