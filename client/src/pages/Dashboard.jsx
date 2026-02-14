import { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import AuthContext from '../context/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchMyEvents = async () => {
            try {
                const { data } = await api.get('/events/myevents');
                setRegistrations(data);
                setLoading(false);
            } catch (err) {
                console.error('Failed to fetch my events', err);
                setLoading(false);
            }
        };

        if (user) {
            fetchMyEvents();
        }
    }, [user]);

    const handleCancel = async (eventId) => {
        if (window.confirm('Are you sure you want to cancel this registration?')) {
            try {
                await api.delete(`/events/${eventId}/register`);
                setRegistrations(registrations.filter(reg => reg.event._id !== eventId));
            } catch (err) {
                alert('Failed to cancel registration');
            }
        }
    };

    if (loading) return <p>Loading dashboard...</p>;

    const upcomingEvents = registrations.filter(reg => new Date(reg.event.date) >= new Date());
    const pastEvents = registrations.filter(reg => new Date(reg.event.date) < new Date());

    return (
        <div className="dashboard-container">
            <h1>Welcome, {user?.username}</h1>

            <section>
                <h2>Upcoming Events</h2>
                {upcomingEvents.length > 0 ? (
                    <ul className="event-list">
                        {upcomingEvents.map((reg) => (
                            <li key={reg._id} className="event-list-item">
                                <div>
                                    <h3>{reg.event.name}</h3>
                                    <p>{new Date(reg.event.date).toLocaleDateString()} - {reg.event.location}</p>
                                </div>
                                <button className="btn-cancel" onClick={() => handleCancel(reg.event._id)}>Cancel</button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No upcoming events.</p>
                )}
            </section>

            <section>
                <h2>Past Events</h2>
                {pastEvents.length > 0 ? (
                    <ul className="event-list">
                        {pastEvents.map((reg) => (
                            <li key={reg._id} className="event-list-item past">
                                <div>
                                    <h3>{reg.event.name}</h3>
                                    <p>{new Date(reg.event.date).toLocaleDateString()}</p>
                                </div>
                                <span className="status-badge">Completed</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No past events.</p>
                )}
            </section>
        </div>
    );
};

export default Dashboard;
