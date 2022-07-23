import { useEffect, useState } from 'react';
import Navbar from "./Navbar/Navbar";
import Visualization from "./Visualization/Visualization";
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
    const [isSoundOn, setIsSoundOn] = useState(true);
    
    const handleChange = (event) => {
        setArrayLength(event.target.value);
        setSelectedElement(null);
        sortingAlgorithms.endSort();
    };

    const handleStartClick = () => {
        if (!isSorting) {
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
        setArray(generateUnorderedArray(arrayLength));
        stopSort();
    };

    useEffect(() => {
        setIsGreaterThan(greaterThan(isAscending));
        if (isSorted) {
            setIsSorting(false);
        }
        if (!isSorting && isSorted && isAscending === !isSortedAscending) {
            setIsSorted(false);
        }
        setSelectedElement(null);
    }, [isSorted, isSortedAscending, isAscending]);

    useEffect(() => {
        setNewArray();
    }, [sortingAlgorithms, arrayLength]);

    useEffect(() => {
        sortingAlgorithms.arr = array;
    }, [array]);

    useEffect(() => {
        sortingAlgorithms.time_ms = delay + 4;
    }, [delay]);

    useEffect(() => {
        sortingAlgorithms.isSoundOn = isSoundOn;
    }, [isSoundOn]);

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
                handleSoundButtonClick={ () => {setIsSoundOn(!isSoundOn)} }
                isSoundOn={ isSoundOn }
            />
            <Visualization 
                array={ array }
                selectedElement={ selectedElement }
                isSorted={ isSorted }
            />
        </div>
    )
}