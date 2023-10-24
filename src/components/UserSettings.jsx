import "./userSettings.css";

export default function UserSettings() {
    return (
        <div className="flex-container">
            <label>Choose an Avatar Image</label>

            <div className="UserImage">
                <img src="images/avatarImage1.png" alt="UserImage" />
            </div>

            <label>Choose User Name</label>

            <input className="userNameInput" />

            <button className="acceptChanges">Submit Changes</button>
        </div>
    );
}
