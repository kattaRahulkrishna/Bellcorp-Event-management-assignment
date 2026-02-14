const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const API_URL = process.env.VITE_API_URL || 'https://bellcorp-backend.onrender.com/api';

const newEvents = [
    {
        name: 'Global Tech Innovators Summit 2026',
        description: 'Join the world\'s leading tech minds for 3 days of innovation, networking, and future-gazing keynotes. Topics include AI, Quantum Computing, and Green Tech.',
        date: '2026-09-15',
        location: 'San Francisco, CA',
        category: 'Technology',
        capacity: 5000,
        organizer: 'TechWorld Inc.',
        availableSeats: 5000
    },
    {
        name: 'International Culinary & Food Festival',
        description: 'A weekend of taste exploration featuring top chefs from around the globe, street food markets, and live cooking demonstrations.',
        date: '2026-07-20',
        location: 'Paris, France',
        category: 'Food',
        capacity: 3000,
        organizer: 'Gourmet Events',
        availableSeats: 3000
    }
];

const seed = async () => {
    try {
        // We will interact via the API just like the other seeder to ensure clean data entry
        // First, we need to login/register to get a token.
        // We'll use a temporary admin user for this purpose.

        console.log('Authenticating...');
        let token;
        const loginRes = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'admin@bellcorp.com', password: 'adminpassword' })
        });

        if (loginRes.ok) {
            const data = await loginRes.json();
            token = data.token;
        } else {
            console.log('Login failed, trying to register admin...');
            const regRes = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: 'DetailsAdmin', email: 'admin@bellcorp.com', password: 'adminpassword' })
            });
            const data = await regRes.json();
            token = data.token;
        }

        console.log(`Adding ${newEvents.length} new events...`);

        for (const event of newEvents) {
            const res = await fetch(`${API_URL}/events`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(event)
            });

            if (res.ok) {
                console.log(`Created: ${event.name}`);
            } else {
                const errorText = await res.text();
                console.error(`Failed to create ${event.name}: ${res.status} ${errorText}`);
            }
        }

        console.log('Done!');

    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

seed();
