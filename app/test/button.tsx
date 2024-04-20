'use client'
import {useState} from "react";

export default function Button() {

    const [count, setCount] = useState(0);
    const handleClick = () => setCount(count + 1);
    return <>
        <p>You clicked {count} times</p>
        <button onClick={handleClick}>Click me</button>
    </>
}