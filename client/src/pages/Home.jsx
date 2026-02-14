import { useState, useEffect } from 'react';
import api from '../services/api';
import EventCard from '../components/EventCard';
import Footer from '../components/Footer';
import './Home.css';

const Home = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [filterCategory, setFilterCategory] = useState('');

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

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        fetchEvents({ search: searchQuery, category: filterCategory });
    };

    const categories = [
        { name: 'Music', icon: '🎵' },
        { name: 'Sports', icon: '⚽' },
        { name: 'Art', icon: '🎨' },
        { name: 'Food', icon: '🍔' },
        { name: 'Business', icon: '💼' },
        { name: 'Technology', icon: '💻' },
        { name: 'Health', icon: '🧘' },
    ];

    return (
        <div className="home-layout">
            <section className="hero-section">
                <div className="hero-overlay"></div>
                <div className="hero-content">
                    <h1>Discover & Manage Your Next Experience</h1>

                    <form className="hero-search-form" onSubmit={handleSearchSubmit}>
                        <div className="search-input-wrapper">
                            <span className="search-icon">🔍</span>
                            <input
                                type="text"
                                placeholder="Search events by name, location or category"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button type="submit" className="search-btn">Search</button>
                        </div>
                    </form>
                </div>
            </section>

            <div className="main-container">
                <section className="categories-section">
                    <h2>Explore Categories</h2>
                    <div className="categories-grid">
                        {categories.map((cat) => (
                            <button
                                key={cat.name}
                                className="category-card"
                                onClick={() => {
                                    setFilterCategory(cat.name);
                                    fetchEvents({ category: cat.name });
                                }}
                            >
                                <div className="category-icon">{cat.icon}</div>
                                <span className="category-name">{cat.name}</span>
                            </button>
                        ))}
                    </div>
                </section>

                <section className="filters-section">
                    <div className="filter-tabs">
                        <button className="filter-tab active">All Events</button>
                        <button className="filter-tab">This Weekend</button>
                        <button className="filter-tab">Free</button>
                    </div>
                </section>

                <section className="events-section">
                    <h2>Upcoming Events</h2>
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
                </section>
            </div>

            <Footer />
        </div>
    );
};

export default Home;
