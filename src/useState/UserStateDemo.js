import React, { useState } from 'react';

// export default 
export default function UserStateDemo() {
    // 声明一个叫 "count" 的 state 变量
    const [count, setCount] = useState(0);
    console.log('aaa,',useState(0));
    //   可以声明多个 state 变量
    //   const [age, setAge] = useState(42);
    //   const [fruit, setFruit] = useState('banana');
    //   const [todos, setTodos] = useState([{ text: '学习 Hook' }]);


    // setCount 只会覆盖 不会继承

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
        Click me
            </button>
        </div>
    );
}
