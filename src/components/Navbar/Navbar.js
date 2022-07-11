import "./Navbar.css"

export default function Navbar({ arrayLength, onChange, onClick }) {
    const sorting_algorithms = ["Bubble Sort", "Selection Sort", "Insertion Sort"];

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
                { navbar_options }
            </ul>
        </nav>
    )
}