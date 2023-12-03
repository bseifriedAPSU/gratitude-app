import TopBar from "../components/TopBar";
import { useNavigate } from 'react-router-dom';
import "../css/pages.css";

export default function About() {

    //Back Button function
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    }

    return (
        <>
            <TopBar />
            <div className="aboutContainer">
                <h2>About</h2>
               
                <p>The Gratitude++ Journal has been created to provide you with a
                    great place to document and keep track of all of the great things in your life!
                    Let's apporach everday with an " attitude of gratitude"</p>
               
                <h3>Home</h3>
                <p>Your personal home page will allow you to see a collection of your thoughts and ideas
                    manifested into a colorful word cloud. Click on any term to see all of the entries you have created
                    using the selected term.</p>
                
                <h3>Community</h3>
                <p>Your Community page allows to to see all of the articles that other users have chosen to share
                    and remain open for public viewing! Follow any links to see what others are writing about</p>
                
                <h3>Settings</h3>
                <p>Go ahead and choose a new avatar image for you account of delete your account entirely. New features comming</p>
                
                <h3>Resources</h3>
                <p>Follow any of the links here to discover useful resources that are all fosed on positivity and mental well-being.</p>
            </div>
            <div className="bottomPageContainer">
                <button className="backButton" onClick={goBack}>Previous Page</button>
            </div>
        </>
    )
}