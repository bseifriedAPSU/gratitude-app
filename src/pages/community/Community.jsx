import "./community.css"

export default function Community() {

    return (
        <div className="community">
            <h1>Community Page</h1>
            
            <input className="communitySearchBar"
                placeholder="Community Search Bar..."
                    /*on change HERE*/ />
            <ol>
               
                <li>DATE : USERNAME : HEADLINE </li>
                <li>DATE : USERNAME : HEADLINE </li>
                <li>DATE : USERNAME : HEADLINE </li>
                <li>DATE : USERNAME : HEADLINE </li>
                <li>DATE : USERNAME : HEADLINE </li>

            </ol>
        </div>
  

    )
}