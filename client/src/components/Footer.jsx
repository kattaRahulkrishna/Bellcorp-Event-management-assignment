import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-links">
                    <Link to="/about">About Bellcorp</Link>
                    <Link to="/contact">Contact Us</Link>
                    <Link to="/privacy">Privacy Policy</Link>
                    <Link to="/terms">Terms of Service</Link>
                </div>
                <div className="footer-social">
                    <a href="#" aria-label="Twitter">Twitter</a>
                    <a href="#" aria-label="Instagram">Instagram</a>
                </div>
                <div className="footer-copy">
                    &copy; {new Date().getFullYear()} Bellcorp Events. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
