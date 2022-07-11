import { useEffect, useState } from 'react';
import Navbar from "./Navbar/Navbar";
import Visualization from "./Visualization/Visualization";
import bubbleSort from '../sorting-algorithms/bubble-sort';

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateArray(arrayLength) {
    let array = [];
    for (let i = 0; i < arrayLength; i++) {
        array.push(randomInt(1, arrayLength));
    }
    return array;
}

export default function Content() {
    const [arrayLength, setArrayLength] = useState(250);
    const [array, setArray] = useState(generateArray(arrayLength));

    const handleChange = (event) => {
        setArrayLength(event.target.value);
    };

    const handleClick = (event) => {
        console.log(event); 
        setArray(bubbleSort(array));
    }

    useEffect(() => {
        setArray(generateArray(arrayLength));
    }, [arrayLength]);

    return (
        <div id="content">
            <Navbar
                arrayLength={ arrayLength } 
                onChange={ handleChange }
                onClick={ handleClick }
            />
            <Visualization array={ array }/>
            <h1>{ arrayLength }</h1>
        </div>
    )
}