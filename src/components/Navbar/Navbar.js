import "./Navbar.css"

export default function Navbar({ arrayLength, delay, onChange, onStartClick, onStopClick, randomize, onSpeedChange, onAlgorithmChange, onSortChange }) {
    const sorting_algorithms = new Map([
        ["O(n^2)", ["Bubble Sort", "Selection Sort", "Insertion Sort"]],
        ["O(log n)", ["Merge Sort", "Quick Sort", "Heap Sort"]],
        ["O((n+1)!)", ["Bogo Sort"]]
    ]);

    let options = [];
    let time_complexities = sorting_algorithms.keys();
    for (const time_complexity of time_complexities) {
        let algorithms = [];
        for (const algorithm of sorting_algorithms.get(time_complexity)) {
            algorithms.push(
                <option>
                    { algorithm }
                </option>
            );
        }
        options.push(
            <optgroup label={ time_complexity }>
                { algorithms }
            </optgroup>
        );
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
                <li>
                    Sorting Algorithm:
                    <select onChange={ onAlgorithmChange }>
                        { options }
                    </select>
                </li>
                <li>
                    <button 
                        id="start"
                        onClick={ onStartClick }
                    >
                        Start
                    </button>
                </li>
                <li>
                    <button 
                        id="stop"
                        onClick={ onStopClick }
                    >
                        Stop
                    </button>
                </li>
                <li>
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