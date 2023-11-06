import "./resourcesList.css";

export default function ResourcesList() {
    const resources = [
        { label: "Calm", link: "https://calm.com" },
        { label: "Mesmerize", link: "https://www.mesmerizeapp.com/" },
        { label: "Pzizz", link: "https://pzizz.com/" },
        { label: "Headspace", link: "https://www.headspace.com/" },
        { label: "Buddhify", link: "https://buddhify.com/" },
        { label: "Sleep Cycle", link: "https://www.sleepcycle.com/" }
    ];

    return (
        <div className="buttons-container">
            {resources.map((resource, index) => (
                <a key={index} href={resource.link} target="_blank" rel="noopener noreferrer">
                    <button className="resource-button">
                        {resource.label}
                    </button>
                </a>
            ))}
        </div>
    )
}
