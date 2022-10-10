import { Link } from "react-router-dom";

export default function LangingPage () {
    return(
        <div>

        <nav>
            <ul>
                <li>info</li>
                <li>info</li>
                <li>info</li>
            </ul>
        </nav>
        <div>landing</div>
        <Link to={'/home'}><button>home</button></Link>
        </div>
    )
}