import "./Footer.css"
import logo from "./icons/GitHub-Mark-64px.png"

export default function Footer() {
    return (
        <footer>
            <ul>
                <li>
                    Created by Jackie Lin
                </li>
                <li>
                    <a 
                        href="https://github.com/j-ackie/sorting-visualization"
                        target="_blank"
                        alt="GitHub logo"
                    >
                        <img src={ logo }/>
                    </a>
                </li>
            </ul>
        </footer>
    )
}