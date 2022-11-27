import {  useState, useEffect } from 'react';
import axios from '../api/axios';
import DeleteList from '../components/deleteList';

import "./AdminEdit.css"

const BOOKS_URL = "/library/books";

const DeletePdf = () => {

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
        <div className="adminEdit"></div>
        <div className="adminSearch">
            <h1>&lt; D E L E T E &gt;</h1>
            <div className='searchbar'>
                <input type="text" id="Reactive-Search" placeholder="SEARCH <BOOK>" onChange={goSearch} />
            </div>

            <div className="editResults">
                <DeleteList action={"approve"} articles={articles} search={search} />
            </div>
        </div>
        </>
    )
}

export default DeletePdf;