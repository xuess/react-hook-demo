> 修改 App.js 文件，切换demo


# react hook

什么是 React Hook

- Hook 是 `React 16.8` 的新增特性。它可以让你在不编写 `class` 的情况下使用 `state` 以及其他的 `React` 特性

- Hook 是一些可以让你在函数组件里`“钩入”` `React state` 及`生命周期`等特性的函数

- Hook 不能在 `class` 组件中使用



# 什么时候使用它

- Hook 可以和现在的代码一起工作，你可以渐进式地使用它

- 没必要大规模重写原有组件

- 最好先在新的不复杂的组件中尝试使用 Hook



# useState

```jsx
import React, { useState } from "react";

function Example() {
  // 声明一个新的叫做 “count” 的 state 变量
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

# class 组件写法

```jsx
import React from "react";

export default class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
      </div>
    );
  }
}
```



# useState 执行过程

```js
// 第一次render
function Example() {
  const count = 0; // Returned by useState()
  // ...
  <p>You clicked {count} times</p>;
  // ...
}

// 点击之后, 函数再次执行
function Example() {
  const count = 1; // Returned by useState()
  // ...
  <p>You clicked {count} times</p>;
  // ...
}

// 再次点击之后, 函数再次执行
function Example() {
  const count = 2; // Returned by useState()
  // ...
  <p>You clicked {count} times</p>;
  // ...
}
```



# demo2

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  function handleAlertClick() {
    setTimeout(() => {
      alert("You clicked on: " + count);
    }, 3000);
  }

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
      <button onClick={handleAlertClick}>Show alert</button>
    </div>
  );
}
```



# 执行过程

```jsx
// 第一次render
function Counter() {
  const count = 0; // Returned by useState()
  // ...
  function handleAlertClick() {
    setTimeout(() => {
      alert("You clicked on: " + 0);
    }, 3000);
  }
  // ...
  <button onClick={handleAlertClick} />;
}

// 点击之后, 函数再次执行
function Counter() {
  const count = 1; // Returned by useState()
  // ...
  function handleAlertClick() {
    setTimeout(() => {
      alert("You clicked on: " + 1);
    }, 3000);
  }
  // ...
  <button onClick={handleAlertClick} />;
}

// 再次点击之后, 函数再次执行
function Counter() {
  const count = 2; // Returned by useState()
  // ...
  function handleAlertClick() {
    setTimeout(() => {
      alert("You clicked on: " + 2);
    }, 3000);
  }
  // ...
  <button onClick={handleAlertClick} />;
}
```



# 小结

- 每一次渲染都有它自己的 `props` 和 `state`

- 当我们`更新`状态的时候，React 会重新渲染组件

- 每一次渲染都能拿到独立的 count 状态，这个状态值是函数中的一个常量



# useEffect

```jsx
import React, { useState, useEffect } from "react";

function Example() {
  const [count, setCount] = useState(0);

  // 相当于 componentDidMount 和 componentDidUpdate:
  useEffect(() => {
    // 使用浏览器的 API 更新页面标题
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```



# 执行过程

```js
// 第一次 render
function Counter() {
  // ...
  useEffect(() => {
    document.title = `You clicked ${0} times`;
  });
  // ...
}

// 点击, 再次执行函数
function Counter() {
  // ...
  useEffect(() => {
    document.title = `You clicked ${1} times`;
  });
  // ...
}

// 再次点击, 再次执行函数
function Counter() {
  // ...
  useEffect(() => {
    document.title = `You clicked ${2} times`;
  });
  // ..
}
```



 # demo

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      console.log(`You clicked ${count} times`);
    }, 3000);
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```



# 小结

- `useEffect` 就是一个 `Effect Hook`，给函数组件增加了操作副作用的能力

- 它跟 class 组件中的 `componentDidMount`、`componentDidUpdate` 和 `componentWillUnmount` 具有相同的用途

- 执行 DOM 更新之后调用它，它在第一次渲染之后和每次更新之后都会执行

- 每次渲染都有它自己的 `Effects`




# effect 清除操作

```jsx
import React, { useState, useEffect } from "react";

function Example() {
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
```



- 为什么要在 effect 中返回一个函数？
  - 这是 effect 可选的清除机制。每个 effect 都可以返回一个清除函数。如此可以将添加和移除订阅的逻辑放在一起。它们都属于 effect 的一部分。不需要清除，就不用返回。

- React 何时清除 effect？
  - React 会在组件卸载的时候执行清除操作。



# demo

```jsx
import React, { useState, useEffect } from "react";

export default function UseEffectDemo2() {
    const [count, setCount] = useState(0);
    const [data, setData] = useState(0);

    useEffect(() => {
        document.title = `You clicked ${count} times`;
        console.log('do it ~');
    });

    return (
        <div>
            <p>count clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>Click me</button>
            <p>data clicked {data} times</p>
            <button onClick={() => setData(data + 1)}>Click me</button>
        </div>
    );
}
```



# 怎么才能在相应的元素更新后再执行？



class 方式

```jsx
componentDidUpdate(prevProps, prevState) {
  if (prevState.count !== this.state.count) {
    document.title = `You clicked ${this.state.count} times`;
  }
}
```



# hook 方式

```jsx
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // 设置依赖 仅在 count 更改时更新
```



# demo

```jsx
import React, { useState, useEffect } from "react";

export default function UseEffectDemo2() {
    const [count, setCount] = useState(0);
    const [data, setData] = useState(0);

    useEffect(() => {
        document.title = `You clicked ${count} times`;
        console.log('do it ~');
    },[count]);//<--✌️

    return (
        <div>
            <p>count clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>Click me</button>
            <p>data clicked {data} times</p>
            <button onClick={() => setData(data + 1)}>Click me</button>
        </div>
    );
}
```


# 怎么使用 useEffect 实现 componentDidMount

```jsx
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, []);
```

 > `[]`表示 effect 没有使用任何 React`数据流`里的值，因此该 effect 仅被调用`一次`



# 使用 useEffect 请求数据

```jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

function SearchResults() {
  const [type, setType] = useState(1);
  const [result, setResult] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await axios(
        "https://api.apiopen.top/musicRankingsDetails?type=" + type
      );
      setResult(res.data.result);
    }
    fetchData();
  }, [type]);

  return (
    <>
      <input value={type} onChange={e => setType(e.target.value)} />
      <ul>
        {result.map(item => (
          <li key={item.album_id}>{item.album_title}</li>
        ))}
      </ul>
    </>
  );
}
```



# hook 使用规则

- 只能在函数最外层调用 `Hook`。不要在循环、条件判断或者子函数中调用

- 只能在 `React` 的函数组件中调用 `Hook`，不要在普通的 `JavaScript` 函数中调用 Hook
 - 可以在自定义 Hook 中调用其他 Hook



# hook eslint

```bash
yarn add eslint-plugin-react-hooks@next
# or
npm install eslint-plugin-react-hooks@next

// 你的 ESLint 配置
{
  "plugins": [
    // ...
    "react-hooks"
  ],
  "rules": {
    // ...
    "react-hooks/rules-of-hooks": "error", // 检查 Hook 的规则
    "react-hooks/exhaustive-deps": "warn" // 检查 effect 的依赖
  }
}

```


# demo，创建两个请求

```jsx
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
```



# 自定义 hook

```jsx
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
```



 - 自定义 Hook 是一个函数

 - 其名称以 “use” 开头
 
 - 函数内部可以调用其他的 Hook




# 特点

- 自定义 Hook 是一种自然遵循 Hook 设计的约定，而并不是 React 的特性

- 组件之间的 state 是完全独立的




# 其他 hook api

https://react.docschina.org/docs/hooks-reference.html



# 总结

- effect 拿到的总是定义它的那次渲染中的 props 和 state

- effects 的模型和 componentDidMount 以及其他生命周期是不同的，最好可以“think in effects”，effects的模型更接近于实现状态同步，而不是响应生命周期事件。

- 一般建议把不依赖 `props` 和 `state` 的函数提到你的组件外面，并且把那些仅被 `effect` 使用的函数放到 `effect` 里面。



参考文档：

https://overreacted.io/zh-hans/a-complete-guide-to-useeffect/

https://react.docschina.org/docs/hooks-intro.html