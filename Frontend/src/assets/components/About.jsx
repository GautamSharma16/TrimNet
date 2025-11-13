import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from 'react-router-dom';
import { useStoreContext } from "../api/ ContextApi";

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

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navLinks = [{ name: 'Home', href: '/' }, { name: 'About', href: '/about' }];
    const { token, logout } = useStoreContext();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        setIsOpen(false);
        navigate('/');
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/90 backdrop-blur-xl border-b border-slate-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                <Link to="/" className="flex items-center space-x-3 group">
                    <Logo />
                    <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent group-hover:from-purple-400 group-hover:to-indigo-400 transition-all duration-300">
                        TrimNet
                    </span>
                </Link>
                <nav className="hidden md:flex items-center space-x-8">
                    {navLinks.map(link => (
                        <Link
                            key={link.name}
                            to={link.href}
                            className="text-slate-300 hover:text-indigo-400 transition-colors duration-300 font-medium relative group"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-400 group-hover:w-full transition-all duration-300"></span>
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
                                <Link to="/register" onClick={() => setIsOpen(false)} className="py-3 px-8 rounded-xl font-semibold text-base bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg hover:shadow-indigo-500/25 transition-all">
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

const features = [
    {
        title: "Instant Shortening",
        desc: "Shorten long URLs instantly with our lightning-fast processing engine.",
        icon: "⚡",
        color: "from-yellow-400 to-orange-500"
    },
    {
        title: "Custom Aliases",
        desc: "Create memorable custom URLs that reflect your brand and content.",
        icon: "🎯",
        color: "from-green-400 to-teal-500"
    },
    {
        title: "Advanced Analytics",
        desc: "Track clicks, geographic data, and engagement metrics in real-time.",
        icon: "📊",
        color: "from-blue-400 to-cyan-500"
    },
    {
        title: "Secure & Reliable",
        desc: "Enterprise-grade security with 99.9% uptime guarantee.",
        icon: "🛡️",
        color: "from-purple-400 to-indigo-500"
    },
];

const teamMembers = [
    {
        name: "Gautam Sharma",
        role: "Founder & CEO",
        bio: "Passionate about revolutionizing digital experiences through innovative URL solutions.",
        avatar: "👨‍💼"
    },
    {
        name: "Gaurav Kumar",
        role: "Lead Developer",
        bio: "Full-stack developer with expertise in scalable cloud infrastructure and API design.",
        avatar: "👩‍💻"
    },
    {
        name: "Akshay Kumar",
        role: "Product Designer",
        bio: "Creating intuitive user experiences that make complex technology accessible to everyone.",
        avatar: "🎨"
    },
    {
        name: "Pranob Pandey",
        role: "Data Scientist",
        bio: "Transforming raw data into actionable insights for better user understanding.",
        avatar: "🔬"
    }
];

const CanvasParticles = () => {
    const canvasRef = useRef(null);
    const mouse = useRef({ x: null, y: null });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const handleMouseMove = (event) => {
            mouse.current.x = event.clientX;
            mouse.current.y = event.clientY;
        };

        window.addEventListener('mousemove', handleMouseMove);

        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        let shootingStars = [];
        const createShootingStar = () => {
            if (mouse.current.x !== null) {
                shootingStars.push({
                    x: mouse.current.x,
                    y: mouse.current.y,
                    radius: Math.random() * 1.5 + 1,
                    speed: Math.random() * 3 + 2,
                    trailLength: Math.random() * 20 + 15,
                    angle: Math.random() * Math.PI * 2,
                    ttl: 80,
                    hue: Math.random() * 60 + 200 // Purple/blue hues
                });
            }
        };

        const starInterval = setInterval(createShootingStar, 50);

        const animate = () => {
            ctx.fillStyle = 'rgba(15, 23, 42, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            shootingStars.forEach((star, index) => {
                const vx = Math.cos(star.angle) * star.speed;
                const vy = Math.sin(star.angle) * star.speed;
                const trailStartX = star.x - vx * star.trailLength;
                const trailStartY = star.y - vy * star.trailLength;
                const opacity = (star.ttl / 80);

                const gradient = ctx.createLinearGradient(trailStartX, trailStartY, star.x, star.y);
                gradient.addColorStop(0, `rgba(139, 92, 246, 0)`);
                gradient.addColorStop(1, `rgba(139, 92, 246, ${opacity})`);

                ctx.strokeStyle = gradient;
                ctx.lineWidth = star.radius;
                ctx.beginPath();
                ctx.moveTo(trailStartX, trailStartY);
                ctx.lineTo(star.x, star.y);
                ctx.stroke();

                star.x += vx;
                star.y += vy;
                star.ttl--;

                if (star.ttl <= 0) {
                    shootingStars.splice(index, 1);
                }
            });

            animationFrameId = window.requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            clearInterval(starInterval);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 -z-10 w-full h-full" />;
};

const About = () => {
    return (
        <div className="relative min-h-screen flex flex-col items-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-x-hidden">
            <Header />
            <CanvasParticles />

            {/* Hero Section */}
            <section className="relative w-full pt-32 pb-20 md:pt-40 md:pb-28">
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 to-purple-500/10 blur-3xl"></div>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ y: -80, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="text-center mb-16"
                    >
                        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-indigo-400 via-purple-500 to-indigo-400 bg-clip-text text-transparent drop-shadow-2xl">
                            About TrimNet
                        </h1>
                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5, duration: 1.2 }}
                            className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed"
                        >
                            Revolutionizing digital connectivity through cutting-edge URL shortening technology.
                            We transform complex links into seamless, trackable, and beautiful experiences.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="relative w-full py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-indigo-400/30 p-8 md:p-12 rounded-3xl max-w-6xl mx-auto text-center shadow-2xl hover:shadow-indigo-500/25 transition-all duration-500"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">
                            Our Mission
                        </h2>
                        <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-4xl mx-auto">
                            To democratize link sharing by making it faster, smarter, and more beautiful.
                            We believe every URL should tell a story and every click should provide insights.
                            Through innovative technology and user-centric design, we're building the future of digital connectivity.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="relative w-full py-20 bg-gradient-to-b from-slate-800/50 to-slate-900/50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.h2
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent"
                    >
                        Why Choose TrimNet?
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.05, y: -8 }}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="group relative"
                            >
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl blur opacity-30 group-hover:opacity-100 transition duration-300"></div>
                                <div className="relative bg-slate-900/90 backdrop-blur-md border border-slate-700 p-8 rounded-3xl h-full transform transition-all duration-300 group-hover:border-indigo-400/50">
                                    <div className={`text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300`}>
                                        {feature.icon}
                                    </div>
                                    <h3 className={`text-2xl font-bold mb-4 bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}>
                                        {feature.title}
                                    </h3>
                                    <p className="text-slate-300 leading-relaxed">{feature.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="relative w-full py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.h2
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"
                    >
                        Meet Our Team
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                        {teamMembers.map((member, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.03, y: -5 }}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="group"
                            >
                                <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-8 rounded-3xl text-center transform transition-all duration-300 group-hover:border-indigo-400/50 group-hover:shadow-2xl group-hover:shadow-indigo-500/20 h-full">
                                    <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                                        {member.avatar}
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                                    <div className="text-indigo-300 font-semibold mb-4">{member.role}</div>
                                    <p className="text-slate-400 text-sm leading-relaxed">{member.bio}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="relative w-full py-20 bg-gradient-to-br from-slate-900 to-slate-800">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
                        {[
                            { number: '10M+', label: 'Links Shortened' },
                            { number: '500K+', label: 'Active Users' },
                            { number: '99.9%', label: 'Uptime' },
                            { number: '150+', label: 'Countries' }
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
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

            {/* CTA Section */}
            <section className="relative w-full py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 md:p-12 text-center max-w-4xl mx-auto shadow-2xl"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Ready to Transform Your Links?
                        </h2>
                        <p className="text-indigo-100 text-lg mb-8 max-w-2xl mx-auto">
                            Join thousands of users who trust TrimNet for their URL shortening needs. Start for free today!
                        </p>
                        <Link
                            to="/register"
                            className="inline-block py-4 px-8 rounded-xl font-bold text-lg bg-white text-indigo-600 hover:bg-slate-100 transition-all transform hover:-translate-y-1 shadow-2xl"
                        >
                            Get Started Free
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="w-full bg-slate-900/80 backdrop-blur-xl border-t border-slate-800 mt-auto">
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
        </div>
    );
};

export default About;