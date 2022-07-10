import "./Navbar.css"

export default function Navbar({ arrayLength, onChange }) {
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
            </ul>
        </nav>
    )
}