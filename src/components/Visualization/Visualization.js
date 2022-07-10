import "./Visualization.css"

export default function Visualization({ array }) {
    let elements = [];
    for (let i = 0; i < array.length; i++) {
        let height = (500 / array.length) * array[i];
        let style = {"height": height}
        elements.push(
            <div className="element" style={ style }>
                {/* { array[i] } */}
            </div>
        );
    }
    return (
        <div id="visualization">
            { elements }
        </div>
    )
}