import { Link } from 'react-router-dom';
import './EventCard.css'; // We'll create this

const EventCard = ({ event }) => {
    return (
        <div className="event-card">
            <h3>{event.name}</h3>
            <p className="event-date">{new Date(event.date).toLocaleDateString()}</p>
            <p className="event-location">{event.location}</p>
            <p className="event-category">{event.category}</p>
            <Link to={`/events/${event._id}`} className="btn-details">View Details</Link>
        </div>
    );
};

export default EventCard;
