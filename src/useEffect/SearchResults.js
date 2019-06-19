import React, { useState, useEffect } from "react";
import axios from 'axios';


function SearchResults() {
    const [type, setType] = useState(1);
    const [result, setResult] = useState([]);
    
    useEffect(() => {
        async function fetchData() {
            const res = await axios(
                'https://api.apiopen.top/musicRankingsDetails?type=' + type,
            );
            setResult(res.data.result);
        }
        fetchData();
    }, [type]);

    return (
      <>
        <input value={type} onChange={e => setType(e.target.value)} />
        <ul>
            {result.map(item => 
                <li key={item.album_id}>
                    {item.album_title}
                </li>
            )}
        </ul>
      </>
    );
}

export default SearchResults;