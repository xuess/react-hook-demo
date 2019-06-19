import React, { useState, useEffect } from "react";
import axios from 'axios';

/**
 * 自定义hook
 * 1.自定义 Hook 是一个函数
 * 2.其名称以 “use” 开头
 * 3.函数内部可以调用其他的 Hook
 */
function useMyHook (type) {
    const [result, setResult] = useState([]);
    
    useEffect(() => {
        async function fetchData() {
            const res = await axios('https://api.apiopen.top/musicRankingsDetails?type=' + type);
            setResult(res.data.result);
        }
        fetchData();
    }, [type]);
    
    return result;
}

function SearchResultsMyHook() {

    const result = useMyHook(1);
    const result2 = useMyHook(2);

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

export default SearchResultsMyHook;