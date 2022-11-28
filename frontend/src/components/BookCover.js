import axios from "../api/axios";
import { useState,useEffect } from "react";

const BookCover = (article) => {                        

    const [bookCover, setCover] = useState([]);
    const REQUEST_URL = "/library/"+article.title+"/cover"

    const cover = async () => {
        try{
            await axios({
                url: REQUEST_URL,
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
        cover()
    }, [])

    return (
            <img src={bookCover} width="200" height="250"/>
    );
}
export default BookCover;