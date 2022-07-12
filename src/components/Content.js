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
    const [selectedElement, setSelectedElement] = useState(null);
    const [isSorted, setIsSorted] = useState(false);
    const [sortedOrder, setSortedOrder] = useState(null);
    const [isAscending, setIsAscending] = useState(true);

    const handleChange = (event) => {
        setArrayLength(event.target.value);
    };

    const handleClick = (event) => {
        if (!isSorted) {
            if (isAscending) {
                const gt = (x, y) => {
                    return x > y;
                };
                bubbleSort(array, setArray, setSelectedElement, setIsSorted, gt, 0.5);
            }
            else {
                const gt = (x, y) => {
                    return x < y;
                };
                bubbleSort(array, setArray, setSelectedElement, setIsSorted, gt, 0.5);
            }
        }
    };

    const handleSortChange = (event) => {
        if (event.target.value === "ascending") {
            setIsAscending(true);
        }
        else {
            setIsAscending(false);
        }
    }

    useEffect(() => {
        setArray(generateArray(arrayLength));
        setSelectedElement(null);
        setIsSorted(false);
    }, [arrayLength]);

    return (
        <div id="content">
            <Navbar
                arrayLength={ arrayLength } 
                onChange={ handleChange }
                onClick={ handleClick }
                onSortChange={ handleSortChange }
            />
            <Visualization 
                array={ array }
                selectedElement={ selectedElement }
                isSorted= { isSorted }
            />
        </div>
    )
}