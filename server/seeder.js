const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Event = require('./models/Event');
const User = require('./models/User');

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await Event.deleteMany();
        // await User.deleteMany(); // Optional: Clear users too if needed, but maybe keep admin

        const events = [
            {
                name: 'Tech Conference 2024',
                description: 'A gathering of tech enthusiasts to discuss the latest trends.',
                date: new Date('2024-12-15'),
                location: 'San Francisco, CA',
                category: 'Technology',
                capacity: 500,
                organizer: 'TechWorld',
                availableSeats: 500,
            },
            {
                name: 'Music Festival',
                description: 'Live music from top artists across various genres.',
                date: new Date('2024-11-20'),
                location: 'Austin, TX',
                category: 'Music',
                capacity: 2000,
                organizer: 'LiveNation',
                availableSeats: 2000,
            },
            {
                name: 'Art Exhibition',
                description: 'Showcasing modern art from local artists.',
                date: new Date('2024-10-05'),
                location: 'New York, NY',
                category: 'Art',
                capacity: 100,
                organizer: 'ArtGallery',
                availableSeats: 100,
            },
            {
                name: 'Startup Pitch Night',
                description: 'Watch startups pitch their ideas to investors.',
                date: new Date('2025-01-10'),
                location: 'Boston, MA',
                category: 'Business',
                capacity: 200,
                organizer: 'StartupHub',
                availableSeats: 200,
            },
            {
                name: 'Yoga Retreat',
                description: 'A weekend of relaxation and yoga.',
                date: new Date('2024-09-12'),
                location: 'Bali, Indonesia',
                category: 'Health',
                capacity: 50,
                organizer: 'YogaLife',
                availableSeats: 50,
            },
            {
                name: 'AI Summit',
                description: 'Deep dive into Artificial Intelligence.',
                date: new Date('2025-03-20'),
                location: 'Seattle, WA',
                category: 'Technology',
                capacity: 300,
                organizer: 'AI Future',
                availableSeats: 300,
            },
            {
                name: 'Food Carnival',
                description: 'Taste dishes from around the world.',
                date: new Date('2024-08-25'),
                location: 'Chicago, IL',
                category: 'Food',
                capacity: 1000,
                organizer: 'Foodies Inc',
                availableSeats: 1000,
            }
        ];

        await Event.insertMany(events);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

importData();
