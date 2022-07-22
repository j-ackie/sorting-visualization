import { useEffect, useState } from 'react';
import Navbar from "./Navbar/Navbar";
import Visualization from "./Visualization/Visualization";
import Footer from "./Footer/Footer"
import Sort from '../sorting-algorithms/Sort';
import { generateUnorderedArray } from '../helpers/helpers';


function nameToFunction(algorithmName, sortingAlgorithms) {
    const nameToFunction = new Map([
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
    const [array, setArray] = useState(generateUnorderedArray(arrayLength));
    const [selectedElement, setSelectedElement] = useState(null);
    const [isSorted, setIsSorted] = useState(false);
    const [sortingAlgorithms, setSortingAlgorithms] = useState(new Sort(array, setArray, setSelectedElement, setIsSorted, 4));
    const [isSortedAscending, setIsSortedAscending] = useState(null);
    const [isSorting, setIsSorting] = useState(false);
    const [isAscending, setIsAscending] = useState(true);
    const [isGreaterThan, setIsGreaterThan] = useState(() => (x, y) => {return x > y});

    const [delay, setDelay] = useState(0);
    const [selectedAlgorithm, setSelectedAlgorithm] = useState("Bubble Sort");
    
    const handleChange = (event) => {
        setArrayLength(event.target.value);
        setSelectedElement(null);
        sortingAlgorithms.endSort();
    };

    const handleStartClick = () => {
        if (!isSorting) {
            // console.log("begin sorting")
            setIsSorted(false);
            setIsSorting(true);
            setIsSortedAscending(isAscending);
            let sortingAlgorithm = nameToFunction(selectedAlgorithm, sortingAlgorithms);
            sortingAlgorithm(isGreaterThan);
        }
    };

    const stopSort = () => {
        setIsSortedAscending(null);
        setSelectedElement(null);
        setIsSorted(false);
        setIsSorting(false);
        sortingAlgorithms.endSort();
    };

    const setNewArray = () => {
        // console.log("Setting new array");
        setArray(generateUnorderedArray(arrayLength));
        stopSort();
    };

    useEffect(() => {
        // console.log("#0 triggered")
        // console.log(isSorting)
        setIsGreaterThan(greaterThan(isAscending));
        if (isSorted) {
            setIsSorting(false);
        }
        if (!isSorting && isSorted && isAscending === !isSortedAscending) {
            // console.log("hey");
            setIsSorted(false);
        }
        setSelectedElement(null);
    }, [isSorted, isSortedAscending, isAscending]);

    useEffect(() => {
        // console.log("#1 triggered");
        setNewArray();
    }, [sortingAlgorithms, arrayLength]);

    useEffect(() => {
        // console.log("#2 triggered");
        sortingAlgorithms.arr = array;
    }, [array]);

    useEffect(() => {
        sortingAlgorithms.time_ms = delay + 4;
    }, [delay]);

    return (
        <div id="content">
            <Navbar
                arrayLength={ arrayLength } 
                delay={ delay }
                isSorting={ isSorting }
                onChange={ handleChange }
                onStartClick={ handleStartClick }
                onStopClick={ stopSort }
                randomize={ setNewArray }
                onSpeedChange={ (event) => {setDelay(parseInt(event.target.value))} }
                onAlgorithmChange={ (event) => {setSelectedAlgorithm(event.target.value)} }
                onSortChange={ (event) => {setIsAscending(event.target.value === "ascending")} }
            />
            <Visualization 
                array={ array }
                selectedElement={ selectedElement }
                isSorted={ isSorted }
            />
            {/* <Footer /> */}
        </div>
    )
}