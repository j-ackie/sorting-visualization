import "./Navbar.css"

export default function Navbar({ arrayLength, delay, isSorting, onChange, onStartClick, onStopClick, randomize, onSpeedChange, onAlgorithmChange, onSortChange }) {
    const sorting_algorithms = new Map([
        ["O(n^2)", ["Bubble Sort", "Selection Sort", "Insertion Sort"]],
        ["O(log n)", ["Merge Sort", "Quick Sort", "Heap Sort"]],
        ["O((n+1)!)", ["Bogo Sort"]]
    ]);

    let options = [];
    let timeComplexities = sorting_algorithms.keys();
    for (const timeComplexity of timeComplexities) {
        let algorithms = [];
        for (const algorithm of sorting_algorithms.get(timeComplexity)) {
            algorithms.push(
                <option>
                    { algorithm }
                </option>
            );
        }
        options.push(
            <optgroup label={ timeComplexity }>
                { algorithms }
            </optgroup>
        );
    }

    let startStopButton;
    if (!isSorting) {
        startStopButton = (
            <button 
                id="start"
                onClick={ onStartClick }
            >
                Start
            </button>
        )
    }
    else {
        startStopButton = (
            <button
                id="stop"
                onClick={ onStopClick }
            >
                Stop
            </button>
        )
    }

    return (
        <nav>
            <ul>
                <li>
                    Sorting Visualization
                </li>
                <li>
                    Size
                    <input
                        type="range"
                        min="4"
                        max="500"
                        value={ arrayLength }
                        onChange={ onChange }
                    />
                </li>
                <li>
                    Speed
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={ delay }
                        onChange={ onSpeedChange }
                    />
                </li>
                <li className="right-align-option">
                    Sorting Algorithm:
                    <select onChange={ onAlgorithmChange }>
                        { options }
                    </select>
                </li>
                <li >
                    { startStopButton }
                </li>
                <li >
                    <button onClick={ randomize }>Randomize</button>
                </li>
                <li id="sort-by-option">
                    Sort by:
                    <select onChange={ onSortChange }>
                        <option>ascending</option>
                        <option>descending</option>
                    </select>
                </li>
            </ul>
        </nav>
    )
}