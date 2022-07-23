import "./Visualization.css"

export default function Visualization({ array, selectedElement, isSorted }) {
    let elements = [];
    for (let i = 0; i < array.length; i++) {
        let height = array[i];
        let style = {"height": height}
        let className = "element";
        if (isSorted && i <= selectedElement) {
            className += " sorted";
        }
        else if (i === selectedElement) {
            className += " selected";
        }
        elements.push(
            <div key={ i } className={ className } style={ style } />
        );
    }
    return (
        <div id="visualization">
            { elements }
        </div>
    )
}