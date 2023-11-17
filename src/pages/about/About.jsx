import TopBar from "../../components/TopBar";
import { useNavigate } from 'react-router-dom';
import "./about.css";

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
                <h3>Sub-headers h3 tag</h3>
                <p>Here are some words</p>
               
                <h3>Sub-headers h3 tag</h3>
                <p>Here are some words</p>
                
                <h3>Sub-headers h3 tag</h3>
                <p>Here are some words</p>
                
                <h3>Sub-headers h3 tag</h3>
                <p>Here are some words</p>
                
                <h3>Sub-headers h3 tag</h3>
                <p>Here are some words</p>
            </div>
            <div className="bottomPageContainer">
                <button className="backButton" onClick={goBack}>Previous Page</button>
            </div>
        </>
    )
}