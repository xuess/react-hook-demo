import React, { useState, useEffect } from "react";
import axios from 'axios';


function SearchResultsTwoRequest() {
    const [result, setResult] = useState([]);
    const [result2, setResult2] = useState([]);
    
    
    useEffect(() => {
        async function fetchData() {
            const res = await axios('https://api.apiopen.top/musicRankingsDetails?type=' + 1);
            setResult(res.data.result);
        }
        fetchData();
    }, []);

    useEffect(() => {
        async function fetchData() {
            const res = await axios('https://api.apiopen.top/musicRankingsDetails?type=' + 2);
            setResult2(res.data.result);
        }
        fetchData();
    }, []);

    return (
        <>
        type:1
        <ul>
            {result.map(item => 
                <li key={item.album_id}>
                    {item.album_title}
                </li>
            )}
        </ul>
        <hr/>
        type:2
        <ul>
            {result2.map(item => 
                <li key={item.album_id}>
                    {item.album_title}
                </li>
            )}
        </ul>
        </>
    );
}

export default SearchResultsTwoRequest;