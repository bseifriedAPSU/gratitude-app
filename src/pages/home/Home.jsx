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
            <input className="homeSearchBar"
                placeholder="Home Page Search Bar..."
                    /*on change HERE*/ />
            <ul>

                <li>DATE : HEADLINE </li>
                <li>DATE : HEADLINE </li>
                <li>DATE : HEADLINE </li>
                <li>DATE : HEADLINE </li>
                <li>DATE : HEADLINE </li>

            </ul>
        </div>

    )
}