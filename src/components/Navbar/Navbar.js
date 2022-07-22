import "./Navbar.css"
import soundOn from "./icons/sound-on.svg";
import soundOff from "./icons/sound-off.svg"

export default function Navbar(props) {
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
    if (!props.isSorting) {
        startStopButton = (
            <button 
                id="start"
                onClick={ props.onStartClick }
            >
                Start
            </button>
        )
    }
    else {
        startStopButton = (
            <button
                id="stop"
                onClick={ props.onStopClick }
            >
                Stop
            </button>
        )
    }

    let soundButton;
    if (props.isSoundOn) {
        soundButton = soundOn;
    }
    else {
        soundButton = soundOff;
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
                        value={ props.arrayLength }
                        onChange={ props.onChange }
                    />
                </li>
                <li>
                    Speed
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={ props.delay }
                        onChange={ props.onSpeedChange }
                    />
                </li>
                <li className="right-align-option">
                    Sorting Algorithm:
                    <select onChange={ props.onAlgorithmChange }>
                        { options }
                    </select>
                </li>
                <li >
                    { startStopButton }
                </li>
                <li >
                    <button onClick={ props.randomize }>Randomize</button>
                </li>
                <li id="sort-by-option">
                    Sort by:
                    <select onChange={ props.onSortChange }>
                        <option>ascending</option>
                        <option>descending</option>
                    </select>
                </li>
                <li>
                    <img onClick={ props.handleSoundButtonClick } src={ soundButton }/>
                </li>
            </ul>
        </nav>
    )
}