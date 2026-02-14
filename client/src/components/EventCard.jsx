import { Link } from 'react-router-dom';
import './EventCard.css'; // We'll create this

const EventCard = ({ event }) => {
    const eventDate = new Date(event.date);
    const dateString = eventDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
    });
    const timeString = eventDate.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit'
    });

    return (
        <div className="event-card">
            <div className="card-image">
                <div className="card-date-badge">
                    <span className="date-month">{eventDate.toLocaleDateString('en-US', { month: 'short' })}</span>
                    <span className="date-day">{eventDate.getDate()}</span>
                </div>
                {/* Placeholder gradient if no image */}
                <div className="image-placeholder" style={{ background: `linear-gradient(135deg, ${stringToColor(event.name)} 0%, #3b82f6 100%)` }}>
                    <span className="category-tag">{event.category}</span>
                </div>
            </div>
            <div className="card-content">
                <h3 className="card-title">{event.name}</h3>
                <div className="card-meta">
                    <span className="meta-item">📍 {event.location}</span>
                    <span className="meta-item">🕒 {timeString}</span>
                </div>
                <div className="card-footer">
                    <span className="price-tag">Free</span>
                    <Link to={`/events/${event._id}`} className="btn-card-action">View Details</Link>
                </div>
            </div>
        </div>
    );
};

// Helper to generate consistent colors based on string
function stringToColor(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const c = (hash & 0x00FFFFFF).toString(16).toUpperCase();
    return '#' + '00000'.substring(0, 6 - c.length) + c;
}

export default EventCard;
