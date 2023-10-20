import "./userSettings.css"

export default function UserSettings() {
    return (
        <div className="flex-container">
            <label>Choose an Avatar Image</label>

            <div className="UserImage">
                <img src="images/manAvatar1.png" alt="Dude" />
            </div>

            <label>Choose User Name</label>

            <input className="userNameInput" />

            <button className="acceptChanges">Submit Changes</button>
        </div>
    );
}
