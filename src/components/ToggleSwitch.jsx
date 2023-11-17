import '../css/components.css';
import React, { useState } from 'react';
import ReactSwitch from 'react-switch';

function ToggleSwitch({ onToggle }) {
    const [checked, setChecked] = useState(false);

    const handleToggle = () => {
        setChecked(!checked)
    };

    onToggle(checked);

    return (
        <div className="toggleSwitch" style={{ textAlign: "right" }}>
            <h4>Public?</h4>
            <ReactSwitch
                type="checkbox"
                checked={checked}
                onChange={handleToggle}
            />
        </div>
    );
}

export default ToggleSwitch;