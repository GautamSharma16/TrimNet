import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStoreContext } from '../api/ ContextApi';
import { Link, useNavigate } from 'react-router-dom';

// --- SVG Icon Components ---
const Logo = ({ className = 'h-8 w-auto' }) => (
    <svg className={className} viewBox="0 0 44 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 12H12C15.3137 12 18 9.31371 18 6V6" stroke="#818cf8" strokeWidth="5" strokeLinecap="round" />
        <path d="M3 12H12C15.3137 12 18 14.6863 18 18V18" stroke="#818cf8" strokeWidth="5" strokeLinecap="round" />
        <path d="M41 12H32C28.6863 12 26 9.31371 26 6V6" stroke="#4f46e5" strokeWidth="5" strokeLinecap="round" />
        <path d="M41 12H32C28.6863 12 26 14.6863 26 18V18" stroke="#4f46e5" strokeWidth="5" strokeLinecap="round" />
        <title>TrimNet</title>
    </svg>
);

const MenuIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
);

const XIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
);

// --- ADDED: API Endpoints ---
const SHORTEN_URL_API = `${import.meta.env.VITE_BACKEND_URL}/api/urls/shorten`;
const CLIENT_BASE_URL = import.meta.env.VITE_BACKEND_URL;

// --- ADDED: THEME COLORS (Needed for Modal) ---
const THEME = {
    BACKGROUND: '#1e1e1e',
    FOREGROUND: '#ffffff',
    ACCENT: '#4f46e5',     // Indigo 600
    CARD_BG: '#2d2d2d',
    BORDER: '#444444',
};

// --- Data for Features ---
const featuresData = [
    {
        title: 'Simple URL Shortening',
        description: 'Experience the ease of creating short, memorable URLs in just a few clicks. Our intuitive interface and quick setup process.',
        icon: '🔗',
    },
    {
        title: 'Powerful Analytics',
        description: 'Gain insights into your link performance with our comprehensive analytics dashboard. Track clicks, geographical data, and referral sources.',
        icon: '📊',
    },
    {
        title: 'Enhanced Security',
        description: 'Rest assured with our robust security measures. All shortened URLs are protected with advanced encryption, ensuring your data remains safe.',
        icon: '🛡️',
    },
    {
        title: 'Fast and Reliable',
        description: 'Enjoy lightning-fast redirects and high uptime with our reliable infrastructure. Your shortened URLs will always be available and responsive.',
        icon: '⚡',
    },
];

// --- Reusable Feature Card Component ---
const FeatureCard = ({ title, description, icon }) => (
    <motion.div
        className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl border border-slate-700 hover:border-indigo-500 transition-all duration-300 group"
        whileHover={{ y: -8, scale: 1.02 }}
    >
        <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">
            {icon}
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
        <p className="text-slate-400 leading-relaxed">{description}</p>
    </motion.div>
);

// --- Header Component ---
const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { token, logout } = useStoreContext();
    const navigate = useNavigate();

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
    ];

    const handleLogout = () => {
        logout();
        setIsOpen(false);
        navigate('/');
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/90 backdrop-blur-xl border-b border-slate-800">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <div className="flex items-center space-x-3">
                    <Logo />
                    <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
                        TrimNet
                    </span>
                </div>

                <nav className="hidden md:flex items-center space-x-8">
                    {navLinks.map(link => (
                        <Link
                            key={link.name}
                            to={link.href}
                            className="text-slate-300 hover:text-indigo-400 transition-colors duration-300 font-medium"
                        >
                            {link.name}
                        </Link>
                    ))}
                    {token ? (
                        <button
                            onClick={handleLogout}
                            className="py-2.5 px-6 rounded-xl font-semibold text-base bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg hover:shadow-red-500/25 transition-all transform hover:-translate-y-0.5"
                        >
                            Sign Out
                        </button>
                    ) : (
                        <Link to="/register" className="py-2.5 px-6 rounded-xl font-semibold text-base bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg hover:shadow-indigo-500/25 transition-all transform hover:-translate-y-0.5">
                            Sign Up
                        </Link>
                    )}
                </nav>

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden text-indigo-400 z-50 p-2 hover:bg-slate-800 rounded-lg transition-colors"
                >
                    {isOpen ? <XIcon /> : <MenuIcon />}
                </button>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden absolute top-full left-0 w-full bg-slate-900/95 backdrop-blur-xl border-b border-slate-800"
                    >
                        <nav className="flex flex-col items-center space-y-6 py-8">
                            {navLinks.map(link => (
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-slate-300 text-lg hover:text-indigo-400 transition-colors font-medium"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            {token ? (
                                <button
                                    onClick={handleLogout}
                                    className="py-3 px-8 rounded-xl font-semibold text-base bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg hover:shadow-red-500/25 transition-all"
                                >
                                    Sign Out
                                </button>
                            ) : (
                                <Link
                                    to="/register"
                                    onClick={() => setIsOpen(false)}
                                    className="py-3 px-8 rounded-xl font-semibold text-base bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg hover:shadow-indigo-500/25 transition-all"
                                >
                                    Sign Up
                                </Link>
                            )}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

// --- ADDED: Shorten URL Modal (Copied from Dashboard) ---
const ShortenUrlModal = ({ isOpen, onClose }) => {
    const [originalUrl, setOriginalUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        setShortUrl('');

        try {
            // 1. Get JWT token from localStorage
            const token = localStorage.getItem('JWT_TOKEN');
            if (!token) throw new Error("You must be logged in to shorten a URL.");

            // 2. Send POST request with Authorization header
            const response = await fetch(SHORTEN_URL_API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ originalUrl }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to shorten URL.');
            }

            const result = await response.json();
            const fullUrl = CLIENT_BASE_URL + result.shortUrl;
            setShortUrl(fullUrl);

            // Close modal and refresh after a short delay
            setTimeout(() => onClose(true), 10000);

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => onClose(false)}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
                style={{ backgroundColor: THEME.CARD_BG, color: THEME.FOREGROUND }}
                className="w-full max-w-lg p-8 rounded-2xl border border-slate-700 relative shadow-2xl"
            >
                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
                    Create Short URL
                </h2>

                <button
                    onClick={() => onClose(false)}
                    className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-slate-700"
                >
                    <XIcon />
                </button>

                {!shortUrl ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="originalUrl" className="block text-slate-300 font-medium mb-3">
                                Enter Long URL:
                            </label>
                            <input
                                id="originalUrl"
                                type="url"
                                value={originalUrl}
                                onChange={(e) => setOriginalUrl(e.target.value)}
                                placeholder="https://www.example.com/very-long-url-path"
                                required
                                style={{
                                    backgroundColor: THEME.BACKGROUND,
                                    color: THEME.FOREGROUND,
                                    border: `1px solid ${THEME.BORDER}`
                                }}
                                className="w-full p-4 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 rounded-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-indigo-500/25"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Shortening...
                                </span>
                            ) : (
                                'Shorten URL'
                            )}
                        </button>

                        {error && (
                            <div className="p-4 bg-red-900/40 border border-red-700 rounded-xl">
                                <p className="text-red-300 font-medium">{error}</p>
                            </div>
                        )}
                    </form>
                ) : (
                    <div className="mt-4 p-6 bg-gradient-to-r from-green-900/40 to-emerald-900/40 border border-green-700 rounded-2xl">
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </div>
                            <p className="text-green-300 font-bold text-lg">URL Shortened Successfully!</p>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-slate-300 font-medium mb-2">Original URL:</p>
                                <p className="text-sm break-all bg-slate-800/50 p-3 rounded-lg">{originalUrl}</p>
                            </div>

                            <div>
                                <p className="text-sm text-slate-300 font-medium mb-2">Short URL:</p>
                                <div className="flex items-center space-x-3">
                                    <input
                                        type="text"
                                        readOnly
                                        value={shortUrl}
                                        className="w-full p-3 rounded-lg bg-slate-800/50 text-indigo-300 font-mono break-all border border-slate-700"
                                    />
                                    <button
                                        onClick={() => navigator.clipboard.writeText(shortUrl)}
                                        className="bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2 whitespace-nowrap"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                                        </svg>
                                        <span>Copy</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => onClose(false)}
                            className="w-full py-3 mt-6 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors border border-slate-600 font-medium"
                        >
                            Close
                        </button>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

// --- Stats Component ---
const Stats = () => {
    const stats = [
        { number: '10M+', label: 'Links Shortened' },
        { number: '500K+', label: 'Active Users' },
        { number: '99.9%', label: 'Uptime' },
        { number: '50+', label: 'Countries' },
    ];

    return (
        <section className="py-16 bg-gradient-to-br from-slate-900 to-slate-800">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="text-center"
                        >
                            <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent mb-2">
                                {stat.number}
                            </div>
                            <div className="text-slate-400 font-medium">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// --- Landing Page Component ---
const LandingPage = () => {
    const { token } = useStoreContext();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalClose = (refetchNeeded) => {
        setIsModalOpen(false);
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    return (
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-300 font-sans antialiased min-h-screen">
            <Header />

            <main>
                {/* --- Hero Section --- */}
                <section className="pt-32 pb-20 md:pt-40 md:pb-28 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 blur-3xl"></div>
                    <div className="container mx-auto px-6 relative z-10">
                        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                            <motion.div
                                className="flex-1 text-center lg:text-left"
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.7 }}
                            >
                                <motion.h1
                                    className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.7, delay: 0.2 }}
                                >
                                    <span className="bg-gradient-to-r from-indigo-400 via-purple-500 to-indigo-400 bg-clip-text text-transparent">
                                        Shorten Links,
                                    </span>
                                    <br />
                                    <span className="text-white">Amplify Reach</span>
                                </motion.h1>

                                <motion.p
                                    className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto lg:mx-0 mb-8 leading-relaxed"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.7, delay: 0.4 }}
                                >
                                    Transform long, messy URLs into clean, shareable links with powerful analytics to track your audience engagement.
                                </motion.p>

                                <motion.div
                                    className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.7, delay: 0.6 }}
                                >
                                    <Link
                                        to={token ? "/dashboard" : "/register"}
                                        className="py-4 px-8 rounded-xl font-bold text-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-2xl hover:shadow-indigo-500/25 transition-all transform hover:-translate-y-1 hover:scale-105"
                                    >
                                        {token ? 'Go to Dashboard' : 'Get Started Free'}
                                    </Link>

                                    {token ? (
                                        <button
                                            onClick={handleOpenModal}
                                            className="py-4 px-8 rounded-xl font-bold text-lg border-2 border-slate-600 text-indigo-400 hover:bg-slate-800/50 hover:border-indigo-500 transition-all transform hover:-translate-y-1"
                                        >
                                            Create Short Link
                                        </button>
                                    ) : (
                                        <Link
                                            to="/register"
                                            className="py-4 px-8 rounded-xl font-bold text-lg border-2 border-slate-600 text-indigo-400 hover:bg-slate-800/50 hover:border-indigo-500 transition-all transform hover:-translate-y-1 text-center"
                                        >
                                            Create Short Link
                                        </Link>
                                    )}
                                </motion.div>
                            </motion.div>

                            <motion.div
                                className="flex-1 flex justify-center"
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.7, delay: 0.3 }}
                            >
                                <div className="relative">
                                    <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur-lg opacity-20"></div>
                                    <img
                                        src="https://d19fbfhz0hcvd2.cloudfront.net/PR/wp-content/uploads/2016/09/10_UsingURLShorteners.jpg"
                                        alt="URL Shortener Analytics Dashboard"
                                        className="relative rounded-2xl shadow-2xl max-w-full h-auto"
                                    />
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* --- Stats Section --- */}
                <Stats />

                {/* --- Features Section --- */}
                <section className="py-20 relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-800 to-slate-900"></div>
                    <div className="container mx-auto px-6 relative z-10">
                        <motion.div
                            className="text-center mb-16"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                Powerful Features for <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">Modern Needs</span>
                            </h2>
                            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                                Everything you need to manage, track, and optimize your links in one place
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {featuresData.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <FeatureCard
                                        title={feature.title}
                                        description={feature.description}
                                        icon={feature.icon}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* --- CTA Section --- */}
                <section className="py-20">
                    <div className="container mx-auto px-6">
                        <motion.div
                            className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 md:p-12 text-center"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                Ready to Transform Your Links?
                            </h2>
                            <p className="text-indigo-100 text-lg mb-8 max-w-2xl mx-auto">
                                Join thousands of users who trust TrimNet for their URL shortening needs. Start for free today!
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    to={token ? "/dashboard" : "/register"}
                                    className="py-4 px-8 rounded-xl font-bold text-lg bg-white text-indigo-600 hover:bg-slate-100 transition-all transform hover:-translate-y-1 shadow-2xl"
                                >
                                    {token ? 'Go to Dashboard' : 'Start Free Trial'}
                                </Link>
                                <button
                                    onClick={handleOpenModal}
                                    className="py-4 px-8 rounded-xl font-bold text-lg border-2 border-white text-white hover:bg-white/10 transition-all transform hover:-translate-y-1"
                                >
                                    Try Demo
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </main>

            {/* --- Footer --- */}
            <footer className="bg-slate-900 border-t border-slate-800">
                <div className="container mx-auto px-6 py-12">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center space-x-3 mb-6 md:mb-0">
                            <Logo className="h-8 w-auto" />
                            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
                                TrimNet
                            </span>
                        </div>
                        <div className="flex flex-wrap justify-center gap-8 mb-6 md:mb-0">
                            <Link to="/about" className="text-slate-400 hover:text-indigo-400 transition-colors font-medium">
                                About
                            </Link>
                            <Link to="/privacy" className="text-slate-400 hover:text-indigo-400 transition-colors font-medium">
                                Privacy
                            </Link>
                            <Link to="/terms" className="text-slate-400 hover:text-indigo-400 transition-colors font-medium">
                                Terms
                            </Link>
                            <Link to="/contact" className="text-slate-400 hover:text-indigo-400 transition-colors font-medium">
                                Contact
                            </Link>
                        </div>
                        <p className="text-slate-500 text-sm">
                            &copy; {new Date().getFullYear()} TrimNet. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>

            {/* --- Modal Integration --- */}
            <AnimatePresence>
                {isModalOpen && (
                    <ShortenUrlModal isOpen={isModalOpen} onClose={handleModalClose} />
                )}
            </AnimatePresence>
        </div>
    )
}

export default LandingPage;