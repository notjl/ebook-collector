import { useRef, useState, useEffect } from 'react';
import axios from '../api/axios';
import UnApprovedList from '../components/unapprovedList';

const BOOKS_URL = "/library/books";

const UploadApprove = () => {

    const [ articles, setArticles ] = useState([]);
    const [ search, setSearch ] = useState('');

    const books = async () => {
        try{
            let res = await axios.get(BOOKS_URL);
            let result = await res.data;
            setArticles(result);
        } catch (e) {
            console.log(e)
        }
    };

    let goSearch = (e) => {
        setSearch(e.target.value)
    }    

    useEffect(() => {
        books()
    }, [])

    return (
        <>
        <div className="uploadPDF"></div>
        
        <div className="uploadDiv">
            <h1>&lt; A P P R O V E &gt;</h1>
            <div>
                <input type="text" id="Reactive-Search" onChange={goSearch} />
            </div>
            <UnApprovedList action={"approve"} articles={articles} search={search} />
        </div>
        </>
    )
}

export default UploadApprove;