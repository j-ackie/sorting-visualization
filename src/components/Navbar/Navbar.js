import "./Navbar.css"

export default function Navbar({ arrayLength, onChange, onClick, onSortChange }) {
    const sorting_algorithms = ["Bubble Sort", "Selection Sort", "Insertion Sort", "Merge Sort", "Quick Sort", "Heap Sort", "Bogo Sort"];

    let navbar_options = [];
    for (let i = 0; i < sorting_algorithms.length; i++) {
        navbar_options.push(
            <li className="navbar-options" onClick={ onClick }>
                { sorting_algorithms[i] }
            </li>
        );
    }

    return (
        <nav>
            <ul>
                <li>
                    Sorting Visualization
                </li>
                <li>
                    Change array size
                    <input
                        id="hey"
                        type="range"
                        min="4"
                        max="500"
                        value={ arrayLength }
                        onChange={ onChange }
                    />
                </li>
                <li>
                    Change sort speed
                    <input
                        type="range"
                        min="0"
                        max="100"
                    />
                </li>
                { navbar_options }
                <li id="sort-by-option">
                    Sort by
                    <select onChange={ onSortChange }>
                        <option>ascending</option>
                        <option>descending</option>
                    </select>
                </li>
            </ul>
        </nav>
    )
}