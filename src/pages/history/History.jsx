import "./history.css"

export default function History() {

    return (
        <div className="history">
            <h1>History Page</h1>

            <input className="historySearchBar"
                placeholder="History Search Bar..."
                    /*on change HERE*/ />
            <ol>

                <li>DATE : HEADLINE </li>
                <li>DATE : HEADLINE </li>
                <li>DATE : HEADLINE </li>
                <li>DATE : HEADLINE </li>
                <li>DATE : HEADLINE </li>

            </ol>
        </div>

    )
}