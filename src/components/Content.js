import { useEffect, useState } from 'react';
import Navbar from "./Navbar/Navbar";
import Visualization from "./Visualization/Visualization";
import Sort from '../sorting-algorithms/Sort';
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

function nameToFunction(algorithmName, sortingAlgorithms) {
    let nameToFunction = new Map([
        ["Bubble Sort", (isGreaterThan) => sortingAlgorithms.bubbleSort(isGreaterThan)],
        ["Selection Sort", (isGreaterThan) => sortingAlgorithms.selectionSort(isGreaterThan)],
        ["Insertion Sort", (isGreaterThan) => sortingAlgorithms.insertionSort(isGreaterThan)],
        ["Merge Sort", (isGreaterThan) => sortingAlgorithms.mergeSort(isGreaterThan)],
        ["Quick Sort", (isGreaterThan) => sortingAlgorithms.quickSort(isGreaterThan)],
        ["Heap Sort", (isGreaterThan) => sortingAlgorithms.heapSort(isGreaterThan)],
        ["Bogo Sort", (isGreaterThan) => sortingAlgorithms.bogoSort(isGreaterThan)]
    ]);

    return nameToFunction.get(algorithmName);
}

function greaterThan(isAscending) {
    if (isAscending) {
        return () => (x, y) => {return x > y};
    }
    else {
        return () => (x, y) => {return x < y};
    }
}

export default function Content() {
    const [arrayLength, setArrayLength] = useState(250);
    const [array, setArray] = useState(generateArray(arrayLength));
    const [selectedElement, setSelectedElement] = useState(null);
    const [isSorted, setIsSorted] = useState(false);
    const [sortingAlgorithms, setSortingAlgorithms] = useState(new Sort(array, setArray, setSelectedElement, setIsSorted, 4));

    const [isSortedAscending, setIsSortedAscending] = useState(null);
    const [isSorting, setIsSorting] = useState(false);
    const [isAscending, setIsAscending] = useState(true);
    const [isGreaterThan, setIsGreaterThan] = useState(() => (x, y) => {return x > y});
    


    const handleChange = (event) => {
        setArrayLength(event.target.value);
        setSelectedElement(null);
        sortingAlgorithms.endSort();
    };

    const handleClick = (event) => {
        console.log(isSorting)
        if (!isSorting) {
            console.log("begin sorting")
            setIsSorted(false);
            setIsSorting(true);
            setIsSortedAscending(isAscending);
            let sortingAlgorithm = nameToFunction(event.target.textContent, sortingAlgorithms);
            sortingAlgorithm(isGreaterThan);
        }
    };

    useEffect(() => {
        console.log("#0 triggered")
        console.log(isSorting)
        setIsGreaterThan(greaterThan(isAscending));
        if (isSorted) {
            setIsSorting(false);
        }
        if (!isSorting && isSorted && isAscending === !isSortedAscending) {
            console.log("hey");
            setIsSorted(false);
        }
        setSelectedElement(null);
    }, [isSorted, isSortedAscending, isAscending]);

    useEffect(() => {
        console.log("#1 triggered");
        setArray(generateArray(arrayLength));
        setIsSortedAscending(null);
        setSelectedElement(null);
        setIsSorted(false);
        setIsSorting(false);
        sortingAlgorithms.endSort();
    }, [sortingAlgorithms, arrayLength]);

    useEffect(() => {
        sortingAlgorithms.arr = array;
    }, [sortingAlgorithms, array])

    return (
        <div id="content">
            <Navbar
                arrayLength={ arrayLength } 
                onChange={ handleChange }
                onClick={ handleClick }
                onSortChange={ (event) => {setIsAscending(event.target.value === "ascending")} }
            />
            <Visualization 
                array={ array }
                selectedElement={ selectedElement }
                isSorted={ isSorted }
            />
            <button onClick={() => {sortingAlgorithms.endSort()}}>
                Hey
            </button>
        </div>
    )
}