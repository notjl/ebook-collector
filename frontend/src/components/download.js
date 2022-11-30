import React from 'react';
import { useEffect } from "react";
import axios from "../api/axios";
import "./download.css";
const DOWNLOAD_URL = "/library";


const Download = ( {book} ) => {

    const DL_Path = DOWNLOAD_URL+"/"+book.title+"/download"
    
    const FileDownload = require('js-file-download')

    const download = async () => {
        try{
            await axios({
                url: DL_Path,
                method: 'GET',
                responseType: 'blob', // Important
              }).then((response) => {
                  FileDownload(response.data, book.title+'.pdf');
              });
              
        }catch (e) {
            console.log(e);
        };
    }

    useEffect(() => {
        download()
    }, [])

    return (
        <>
        <button className='download' onClick={download}>Download</button>
        </>
        
    );
}

export default Download;