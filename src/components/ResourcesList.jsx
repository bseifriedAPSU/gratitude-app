import "./resourcesList.css";

export default function ResourcesList() {
    const resources = [
        { label: "calm.com", link: "https://calm.com" },
        { label: "Mesmerize", link: "https://www.mesmerizeapp.com/" },
        { label: "Resource 3", link: "https://example.com/resource3" },
        { label: "Resource 4", link: "https://example.com/resource4" },
        { label: "Resource 5", link: "https://example.com/resource5" },
        { label: "Resource 6", link: "https://example.com/resource6" }
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
