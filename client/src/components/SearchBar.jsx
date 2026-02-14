import { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
    const [text, setText] = useState('');
    const [category, setCategory] = useState('');
    const [location, setLocation] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch({ search: text, category, location });
    };

    return (
        <form className="search-bar" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Search events..."
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <input
                type="text"
                placeholder="Location..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
            />
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">All Categories</option>
                <option value="Technology">Technology</option>
                <option value="Music">Music</option>
                <option value="Art">Art</option>
                <option value="Business">Business</option>
                <option value="Health">Health</option>
                <option value="Food">Food</option>
            </select>
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchBar;
