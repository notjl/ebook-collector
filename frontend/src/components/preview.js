import React from 'react';
import { useEffect } from "react";

import axios from "../api/axios";
import "./preview.css";

const Preview = ( {book} ) => {

    const PV_URL = "/library/preview?book_title="+book.title;

    const preview = async () => {
        try{
            await axios({
                url: PV_URL,
                method: 'GET',
                responseType: 'blob', // Important
              }).then((response) => {
                const file = new Blob(
                    [response.data], 
                    {type: 'application/pdf'});
                const fileURL = URL.createObjectURL(file);
                window.open(fileURL);
              });
              
        }catch (e) {
            console.log(e);
        };
    }

    useEffect(() => {
        preview()
        
    }, [])

    return (
        <>
        <button className='preview' onClick={preview}>Preview</button>
        </>
        
    );
}

export default Preview;