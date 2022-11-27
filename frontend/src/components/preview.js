import React from 'react';
import { useState,useEffect } from "react";
import axios from "../api/axios";
import "./preview.css";
const PV_URL = "/library";

const Preview = ( {book} ) => {

    const PV_Path = PV_URL+"/preview?book_title="+book.title

    const preview = async () => {
        try{
            await axios({
                url: PV_Path,
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