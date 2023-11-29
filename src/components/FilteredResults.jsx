import '../css/components.css';
import { useNavigate } from 'react-router-dom';
export default function FilteredResults({ results }) {
    const navigate = useNavigate();
   
    return (
        <div className="filterResultsList">
            {
                results.map((result, id) => {
                    return <div className="listItem"
                        key={id}
                        onClick={() => navigate('/searchResults')} >
                        {result.name}
                    </div>
                })
            }


        </div>
    )
}