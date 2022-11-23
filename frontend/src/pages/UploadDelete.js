import { useRef, useState, useEffect } from 'react';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';

import "./UploadPdf.css"

const DELETE_URL = "library/"

const DeletePdf = () => {


    const { auth } = useAuth();
    const token = "Bearer " + auth?.accessToken.access_token

    const [title, setTitle] = useState('');

    const handleUpdate = async (e) => {
        e.preventDefault();

        const response = await axios.delete(
            DELETE_URL+title+'/delete',
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
            <h1>&lt; D E L E T E &gt;</h1>
        <form onSubmit={handleUpdate}>
            <input id="title"type="text" placeholder="Enter Title" 
                onChange={(e) => setTitle(e.target.value)}
                required/>

            <button type="submit">DELETE</button>
        </form>
        </div>
        </>
    )
}

export default DeletePdf;