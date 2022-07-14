import { useEffect, useState } from 'react';
import Navbar from "./Navbar/Navbar";
import Visualization from "./Visualization/Visualization";
import BubbleSort from '../sorting-algorithms/bubble-sort';
// import SelectionSort from "../sorting-algorithms/selection-sort";

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

function algorithmToClass(algorithmName, array, setArray, setSelectedElement, setIsSorted) {
    let algorithmToClass = new Map([
        ["Bubble Sort", () => new BubbleSort(array, setArray, setSelectedElement, setIsSorted, 4)],
        ["Selection Sort", () => console.log("hey")]
    ]);

    return algorithmToClass.get(algorithmName);
}

export default function Content() {
    const [arrayLength, setArrayLength] = useState(250);
    const [array, setArray] = useState(generateArray(arrayLength));
    const [selectedElement, setSelectedElement] = useState(null);
    const [isSorted, setIsSorted] = useState(false);
    const [isSortedAscending, setIsSortedAscending] = useState(null);
    const [isSortable, setIsSortable] = useState(true);
    const [isSorting, setIsSorting] = useState(false);
    const [isAscending, setIsAscending] = useState(true);
    const [isGreaterThan, setIsGreaterThan] = useState(() => (x, y) => {return x > y});
    const [sortingAlgorithm, setSortingAlgorithm] = useState(algorithmToClass("Bubble Sort", array, setArray, setSelectedElement, setIsSorted))


    const handleChange = (event) => {
        setArrayLength(event.target.value);
    };

    const handleClick = (event) => {
        console.log(isSorting);
        console.log(event.target.textContent)
        if (!isSorting && isSortable) {
            if (event.target.textContent === "Bubble Sort") {
                setSortingAlgorithm(new BubbleSort(array, setArray, setSelectedElement, setIsSorted, 4));
            }
            setIsSortedAscending(isAscending);
            setIsSorting(true);
            sortingAlgorithm.sort(isGreaterThan);
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
        if (isAscending) {
            setIsGreaterThan(() => (x, y) => {return x > y});
        }
        else {
            setIsGreaterThan(() => (x, y) => {return x < y});
        }

        if (!isSorted || (isSorted && isAscending === !isSortedAscending)) {
            setIsSortable(true);
            setIsSorted(false);
            setIsSorting(false);
        }
        else {
            setIsSortable(false);
            setIsSorting(false);
        }
        setSelectedElement(null);
    }, [isSorted, isSortedAscending, isAscending])

    useEffect(() => {
        setArray(generateArray(arrayLength));
        setIsSortedAscending(null);
        setSelectedElement(null);
        setIsSorted(false);
        sortingAlgorithm.endSort();
    }, [arrayLength]);

    useEffect(() => {
        sortingAlgorithm.arr = array;
    }, [sortingAlgorithm, array])

    // useEffect(() => {
    //     setIsSorting(true);
    // }, [isAscending, sortingAlgorithm])

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