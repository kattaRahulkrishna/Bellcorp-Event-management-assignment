import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import AuthContext from '../context/AuthContext';
import './EventDetails.css'; // Create this

const EventDetails = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const { data } = await api.get(`/events/${id}`);
                setEvent(data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch event details');
                setLoading(false);
            }
        };

        fetchEvent();
    }, [id]);

    const handleRegister = async () => {
        if (!user) {
            navigate('/login');
            return;
        }

        try {
            await api.post(`/events/${id}/register`);
            alert('Registration Successful!');
            // Refresh event data to update available seats
            const { data } = await api.get(`/events/${id}`);
            setEvent(data);
        } catch (err) {
            alert(err.response?.data?.message || 'Registration failed');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="error">{error}</p>;
    if (!event) return <p>Event not found</p>;

    return (
        <div className="event-details-container">
            <h2>{event.name}</h2>
            <div className="event-meta">
                <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                <p><strong>Location:</strong> {event.location}</p>
                <p><strong>Category:</strong> {event.category}</p>
                <p><strong>Organizer:</strong> {event.organizer}</p>
                <p><strong>Available Seats:</strong> {event.availableSeats} / {event.capacity}</p>
            </div>
            <p className="event-description">{event.description}</p>

            <div className="action-area">
                {event.availableSeats > 0 ? (
                    <button onClick={handleRegister} className="btn-register">
                        {user ? 'Register Now' : 'Login to Register'}
                    </button>
                ) : (
                    <button disabled className="btn-sold-out">Sold Out</button>
                )}
            </div>
        </div>
    );
};

export default EventDetails;
