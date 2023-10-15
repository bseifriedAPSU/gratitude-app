import Header from "../../header/Header"
import "./home.css"
import Wordcloud from "../../components/Wordcloud"






export default function Home() {
 

    return (
        <div className="home">
            <Header />
            <Wordcloud />

            <button /* On CLick HERE*/>
                Create New Journal Entry Button 
            </button>
            <ul >
                
                <li><input></input></li>
                <li><div>User Recent Articles</div></li>
            </ul>
        </div>

    )
}