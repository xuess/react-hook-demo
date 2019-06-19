
import React, { useState, useEffect } from "react";

export default function UseEffectDemo2() {
    const [count, setCount] = useState(0);
    const [data, setData] = useState(0);

    useEffect(() => {
        document.title = `You clicked ${count} times`;
        console.log('do it ~');
    },[count]);

    return (
        <div>
            <p>count clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>Click me</button>
            <p>data clicked {data} times</p>
            <button onClick={() => setData(data + 1)}>Click me</button>
        </div>
    );
}
