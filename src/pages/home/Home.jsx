import Header from "../../header/Header"
import "./home.css"

export default function Home() {

    return (
        <div className="home">
            <Header />
            <ul >
                <li> <div>WORD CLOUD HERE</div></li>
                <li><button>Create Post</button></li>
                <li><input></input></li>
                <li><div>User Recent Articles</div></li>
            </ul>
        </div>

    )
}