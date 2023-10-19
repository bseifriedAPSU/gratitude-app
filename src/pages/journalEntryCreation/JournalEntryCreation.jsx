import "./journalEntryCreation.css";
import { createNewEntry } from "./../../firebase/database.js";
import ToggleSwitch from "../../components/ToggleSwitch";
export default function JournalEntryCreation() {

    return (
        <div className="journalEntryCreation">
            <div className="journalEntryContainer">
                <h1>Create A Journal Entry</h1>
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
                <button onClick={createNewEntry("jscott72", "Headline", "Content", true)}>Submit Post</button>
                <div classname="toggleSwitch">
                <ToggleSwitch />
                </div>
            </div>
        </div>

    )
}

       
   