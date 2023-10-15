import "./journalEntryCreation.css"

export default function JournalEntryCreation() {

    return (
        <div className="journalEntryCreation">
            <div className="journalEntryContainer">
                <h1>Create A Journal Entry</h1>
                <div className="titleInput">
                    <label> Title:</label>
                    <input
                        placeholder="Title..."
                    /*on change HERE*/ /> 
                </div>
                <div className="entryInput">
                    <label> Entry:</label>
                    <textarea
                        placeholder="Entry..."
                        /*on change HERE*/ />
                </div>
                <button /* On CLick here */> Submit Post</button>
            </div>
        </div>

    )
}

       
   