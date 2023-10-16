import Header from "../../components/Header"
import Wordcloud from "../../components/Wordcloud"
import { useNavigate } from 'react-router-dom'
import "./home.css"


export default function Home() {
 const navigate = useNavigate()

    return (
        <div className="home">
            <Header />
            <Wordcloud />

            <button onClick={() => navigate('/journalEntryCreation')}>Create New Journal Entry Button</button>

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