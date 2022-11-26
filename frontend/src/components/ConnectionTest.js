import React, { useState,useEffect } from 'react';
import axios from '../api/axios';

export default function ConnectionTest() {
    
    const [ result, setResult ] = useState(null);

    const message = async () => {
        try{
            let res = await axios.get();
            let result = res.data;
            setResult(result)
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        message()
        console.log({result})
    }, [])

    return (
        <></>
    )
}