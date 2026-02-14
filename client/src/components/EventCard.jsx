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
                {/* Valid Unsplash IDs based on category */}
                <img
                    src={`https://images.unsplash.com/${getCategoryImage(event.category)}?auto=format&fit=crop&w=600&q=80`}
                    alt={event.name}
                    className="card-img-cover"
                />
                <span className="category-tag">{event.category}</span>
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
        </div >
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

function getCategoryImage(category) {
    const images = {
        'Technology': 'photo-1540575467063-178a50c2df87',
        'Music': 'photo-1501281668745-f7f57925c3b4',
        'Art': 'photo-1460661419201-fd4cecdf8a8b',
        'Business': 'photo-1515187029135-18ee286d815b',
        'Health': 'photo-1544367563-12123d8966cd',
        'Food': 'photo-1555939594-58d7cb561ad1',
        'Sports': 'photo-1461896836934-ffe607ba8211'
    };
    return images[category] || 'photo-1492684223066-81342ee5ff30';
}

export default EventCard;
