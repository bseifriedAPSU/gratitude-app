import "./journalEntryCreation.css";
import ToggleSwitch from "../../components/ToggleSwitch";
import EntryPrompt from "../../components/EntryPrompt";
export default function JournalEntryCreation() {

    return (
        <div className="journalEntryCreation">
            <div className="journalEntryContainer">
                <h1>Create A Journal Entry</h1>
                <EntryPrompt />
                <div className="entryInput">
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
                <button /* On CLick here */>Submit Post</button>
                <div classname="toggleSwitch">
                <ToggleSwitch />
                </div>
            </div>
        </div>

    )
}

       
   