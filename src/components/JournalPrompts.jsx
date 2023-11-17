import React, { useState, useEffect } from 'react';
import '../css/components.css';

export default function JournalPrompts() {
    const inspiringPrompts = [
        "Write about something or someone you're grateful for today.",
        "Reflect on a recent act of kindness that made you feel thankful.",
        "Describe a small moment that brought you joy.",
        "Write about a person who has positively impacted your life.",
        "List three things in your life that you're grateful for right now.",
        "Recall a challenging situation you've overcome and what it taught you.",
        "Express gratitude for your favorite place and why it's special to you.",
        "Reflect on a lesson you've learned recently that you're thankful for.",
        "Write about the people in your life who make you smile.",
        "Describe something that brings you happiness."
    ];

    const [currentPrompt, setCurrentPrompt] = useState('');

    useEffect(() => {
        // When the component mounts, set a random prompt
        const randomIndex = Math.floor(Math.random() * inspiringPrompts.length);
        setCurrentPrompt(inspiringPrompts[randomIndex]);
    }, []);

    return (
        <div className="promptContainer">
            <h3 className="currentPrompt">{currentPrompt}</h3>
        </div>
    );
}
