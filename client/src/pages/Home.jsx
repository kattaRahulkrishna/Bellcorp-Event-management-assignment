import { useState, useEffect } from 'react';
import api from '../services/api';
import EventCard from '../components/EventCard';
import SearchBar from '../components/SearchBar';
import './Home.css';

const Home = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchEvents = async (query = {}) => {
        setLoading(true);
        try {
            const params = new URLSearchParams(query).toString();
            const { data } = await api.get(`/events?${params}`);
            setEvents(data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch events');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleSearch = (query) => {
        fetchEvents(query);
    };

    return (
        <div className="home-container">
            <header className="hero">
                <h1>Discover Amazing Events</h1>
                <p>Find and register for events happening around you.</p>
            </header>

            <SearchBar onSearch={handleSearch} />

            {loading ? (
                <p className="loading">Loading events...</p>
            ) : error ? (
                <p className="error">{error}</p>
            ) : (
                <div className="event-grid">
                    {events.length > 0 ? (
                        events.map((event) => (
                            <EventCard key={event._id} event={event} />
                        ))
                    ) : (
                        <p>No events found.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Home;
