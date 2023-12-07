import '../css/components.css';
export default function Header() {

    return (
        //Header Component currently only used to hold main logo for login page
        <div className="header">
            <div className="headerImage">
                <img className="headerImage" src="./images/gratitudeLogoLarge.svg" alt="GratitudeLog"></img>
            </div>  
        </div>
    )
}