import { FaTwitter, FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-gray-100 text-gray-600 py-8 px-4">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h2 className="text-xl font-bold text-purple-600 flex items-center">
                        🌙 DreamWeave
                    </h2>
                    <p className="mt-2">
                        Empowering dreamers to explore their subconscious mind and unlock deeper self-understanding through innovative dream journaling.
                    </p>
                    <div className="flex space-x-4 mt-4">
                        <FaTwitter />
                        <FaFacebookF />
                        <FaInstagram />
                        <FaLinkedinIn />
                    </div>
                </div>
                <div>
                    <h3 className="font-semibold">Company</h3>
                    <ul className="mt-2 space-y-1">
                        <Link to="/about" className="hover:underline">About Us</Link>
                        <li>Careers</li>
                        <li>Press Kit</li>
                        <li>Partners</li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold">Resources</h3>
                    <ul className="mt-2 space-y-1">
                        <li>Blog</li>
                        <li>Dream Dictionary</li>
                        <li>Research</li>
                        <li>Help Center</li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold">Contact</h3>
                    <ul className="mt-2 space-y-1">
                        <li>📧 support@dreamjournal.com</li>
                        <li>📞 +1 (555) 123-4567</li>
                        <li>🏠 123 Dream Street, Suite 456, San Francisco, CA 94105</li>
                    </ul>
                </div>
            </div>
            <div className="text-center text-sm mt-8 border-t pt-4">
                &copy; 2025 Dream Journal. All rights reserved. | Privacy Policy | Terms of Service | Cookie Policy
            </div>
        </footer>
    );
};

export default Footer;
