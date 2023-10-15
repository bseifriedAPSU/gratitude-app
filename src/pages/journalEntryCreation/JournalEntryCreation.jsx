import "./journalEntryCreation.css"

export default function JournalEntryCreation() {

    return (
        <div className="journalEntryCreation">
            <div className="jeContainer">
                <h1>Create A Journal Entry</h1>
                <div className="inputGp">
                    <label> Title:</label>
                    <input
                        placeholder="Title..."
                    /*on change HERE*/ /> 
                </div>
                <div className="inputGp">
                    <label> Entry:</label>
                    <textarea
                        placeholder="Post..."
                        /*on change HERE*/ />
                </div>
                <button /* On CLick here */> Submit Post</button>
            </div>
        </div>

    )
}

       
   