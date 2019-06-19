import React, { useState, useEffect } from "react";

export default function UseEffectDemoCleanup() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        document.title = `You clicked ${count} times`;

        // 这是 effect 可选的清除机制 每个 effect 都可以返回一个清除函数
        return () => {
            console.log("unmonut count-->", count);
        };
    });

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>Click me</button>
        </div>
    );
}
