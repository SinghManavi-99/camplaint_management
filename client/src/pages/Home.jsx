import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Home = ({ userEmail, userRole }) => {
    const history = useHistory();
    const [feedbacks, setFeedbacks] = useState([]);
    const [stats, setStats] = useState({ total: 0, resolved: 0, users: 0, responseTime: 0 });

    useEffect(() => {
        let isMounted = true;

        const fetchFeedbacks = async () => {
            try {
                const res = await axios.get('https://campus-complaint-system.onrender.com/api/feedback');
                if (isMounted) setFeedbacks(res.data.slice(-6));
            } catch (error) {
                if (isMounted) console.error('Error fetching feedbacks:', error);
            }
        };

        const fetchStats = async () => {
            try {
                const [complaintsRes, usersRes] = await Promise.all([
                    axios.get('https://campus-complaint-system.onrender.com/api/stats/complaints'),
                    axios.get('https://campus-complaint-system.onrender.com/api/stats/users')
                ]);
                const complaintStats = complaintsRes.data;
                const userStats = usersRes.data;
                if (isMounted) setStats({
                    resolved: complaintStats.resolved || 0,
                    users: userStats.total || 0,
                    responseTime: complaintStats.avgResponseTime || 24
                });
            } catch (error) {
                if (isMounted) setStats({ total: 0, resolved: 0, users: 0, responseTime: 24 });
            }
        };

        fetchFeedbacks();
        fetchStats();
        return () => { isMounted = false; };
    }, []);

    return (
        <div>
            {/* ===== HERO SECTION ===== */}
            <div className="hero-section">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 mb-5 mb-lg-0">
                            <div className="hero-badge">
                                <span className="badge-dot"></span>
                                Smart Complaint Management
                            </div>

                            <h1>
                                Resolve Campus <span className="highlight">Issues Faster</span>
                            </h1>

                            <p className="hero-desc">
                                A unified platform for students, staff, and administrators to submit, track, and resolve campus complaints — transparently and efficiently.
                            </p>

                            {!userEmail && (
                                <div className="hero-cta-group">
                                    <button className="btn-hero-primary" onClick={() => history.push('/register/student')}>
                                        <i className="fas fa-user-plus me-2"></i>Get Started Free
                                    </button>
                                    <button className="btn-hero-secondary" onClick={() => history.push('/login/student')}>
                                        <i className="fas fa-sign-in-alt me-2"></i>Sign In
                                    </button>
                                </div>
                            )}

                            {userEmail && (
                                <div className="hero-cta-group">
                                    {userRole === 'student' && (
                                        <>
                                            <button className="btn-hero-primary" onClick={() => history.push('/complaints/new')}>
                                                <i className="fas fa-plus me-2"></i>Submit Complaint
                                            </button>
                                            <button className="btn-hero-secondary" onClick={() => history.push('/my-complaints')}>
                                                <i className="fas fa-list me-2"></i>My Complaints
                                            </button>
                                        </>
                                    )}
                                    {userRole === 'staff' && (
                                        <button className="btn-hero-primary" onClick={() => history.push('/staff/dashboard')}>
                                            <i className="fas fa-tasks me-2"></i>Go to Dashboard
                                        </button>
                                    )}
                                    {userRole === 'admin' && (
                                        <button className="btn-hero-primary" onClick={() => history.push('/admin/dashboard')}>
                                            <i className="fas fa-chart-bar me-2"></i>Admin Dashboard
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Hero visual cards */}
                        <div className="col-lg-6">
                            <div className="hero-visual">
                                <div className="hero-card-stack">
                                    <div className="hero-card">
                                        <div className="complaint-status">
                                            <span className="complaint-title">Hostel water supply issue</span>
                                            <span className="status-pill resolved">Resolved</span>
                                        </div>
                                        <div className="complaint-meta">
                                            <i className="fas fa-clock me-1"></i>Resolved in 2 hours · Room 204
                                        </div>
                                    </div>
                                    <div className="hero-card">
                                        <div className="complaint-status">
                                            <span className="complaint-title">Library AC not working</span>
                                            <span className="status-pill progress">In Progress</span>
                                        </div>
                                        <div className="complaint-meta">
                                            <i className="fas fa-user-tie me-1"></i>Assigned to maintenance staff
                                        </div>
                                    </div>
                                    <div className="hero-card">
                                        <div className="complaint-status">
                                            <span className="complaint-title">Projector issue - Lab 3</span>
                                            <span className="status-pill pending">Pending</span>
                                        </div>
                                        <div className="complaint-meta">
                                            <i className="fas fa-calendar me-1"></i>Submitted 10 minutes ago
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ===== QUICK ACTIONS (logged in) ===== */}
            {userEmail && (
                <div className="container" style={{ marginTop: '-2rem', position: 'relative', zIndex: 10 }}>
                    <div className="quick-actions">
                        <h4><i className="fas fa-bolt me-2" style={{ color: 'var(--accent)' }}></i>Quick Actions</h4>
                        <div className="d-flex flex-wrap gap-2">
                            {userRole === 'student' && (
                                <>
                                    <button className="action-btn primary" onClick={() => history.push('/complaints/new')}>
                                        <i className="fas fa-plus-circle"></i> Submit New Complaint
                                    </button>
                                    <button className="action-btn secondary" onClick={() => history.push('/my-complaints')}>
                                        <i className="fas fa-list"></i> View My Complaints
                                    </button>
                                </>
                            )}
                            {userRole === 'staff' && (
                                <button className="action-btn primary" onClick={() => history.push('/staff/dashboard')}>
                                    <i className="fas fa-tasks"></i> Staff Dashboard
                                </button>
                            )}
                            {userRole === 'admin' && (
                                <button className="action-btn primary" onClick={() => history.push('/admin/dashboard')}>
                                    <i className="fas fa-cog"></i> Admin Dashboard
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* ===== FEATURES SECTION ===== */}
            <div className="features-section">
                <div className="container">
                    <div className="section-header">
                        <div className="section-tag">Features</div>
                        <h2 className="section-title">Everything you need to manage complaints</h2>
                        <p className="section-subtitle">A complete system built for transparency, speed, and accountability on campus.</p>
                    </div>
                    <div className="row g-4">
                        <div className="col-md-4">
                            <div className="feature-card">
                                <div className="feature-icon blue">
                                    <i className="fas fa-paper-plane"></i>
                                </div>
                                <h5>Easy Submission</h5>
                                <p>Submit complaints in under a minute with a simple, guided form. Attach photos as evidence.</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="feature-card">
                                <div className="feature-icon green">
                                    <i className="fas fa-search"></i>
                                </div>
                                <h5>Real-Time Tracking</h5>
                                <p>Track every step of your complaint — from submission to resolution — in real time.</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="feature-card">
                                <div className="feature-icon amber">
                                    <i className="fas fa-user-tie"></i>
                                </div>
                                <h5>Role-Based Access</h5>
                                <p>Separate dashboards for students, staff, and admins — everyone sees exactly what they need.</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="feature-card">
                                <div className="feature-icon purple">
                                    <i className="fas fa-shield-alt"></i>
                                </div>
                                <h5>Secure & Private</h5>
                                <p>JWT-based authentication ensures your complaints and data are always protected.</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="feature-card">
                                <div className="feature-icon teal">
                                    <i className="fas fa-chart-bar"></i>
                                </div>
                                <h5>Admin Analytics</h5>
                                <p>Administrators get live stats and insights on complaint volumes, categories, and resolution rates.</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="feature-card">
                                <div className="feature-icon red">
                                    <i className="fas fa-star"></i>
                                </div>
                                <h5>Feedback System</h5>
                                <p>After resolution, students can rate and review the process — keeping the system accountable.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ===== HOW IT WORKS ===== */}
            <div className="how-section">
                <div className="container">
                    <div className="section-header">
                        <div className="section-tag">How It Works</div>
                        <h2 className="section-title">Simple. Fast. Transparent.</h2>
                        <p className="section-subtitle">From complaint to resolution in just a few simple steps.</p>
                    </div>
                    <div className="row g-4">
                        <div className="col-md-3">
                            <div className="step-card">
                                <div className="step-number">1</div>
                                <h5>Register & Login</h5>
                                <p>Create your account as a student, staff, or admin to access the platform.</p>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="step-card">
                                <div className="step-number">2</div>
                                <h5>Submit Complaint</h5>
                                <p>Fill out the complaint form with details and optionally attach images.</p>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="step-card">
                                <div className="step-number">3</div>
                                <h5>Staff Reviews</h5>
                                <p>Assigned staff reviews the complaint and updates the status in real time.</p>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="step-card">
                                <div className="step-number">4</div>
                                <h5>Issue Resolved</h5>
                                <p>You get notified when your complaint is resolved. Rate your experience!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ===== STATS SECTION ===== */}
            <div className="stats-section">
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <div className="section-header">
                        <div className="section-tag" style={{ background: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.7)' }}>By The Numbers</div>
                        <h2 className="section-title" style={{ color: 'white' }}>Making an impact on campus</h2>
                        <p className="section-subtitle" style={{ color: 'rgba(255,255,255,0.5)' }}>Real data from our growing community of campus users.</p>
                    </div>
                    <div className="row g-4">
                        <div className="col-md-4">
                            <div className="stat-card">
                                <div className="stat-icon" style={{ background: 'rgba(16,185,129,0.15)' }}>
                                    <i className="fas fa-check-circle" style={{ color: '#10b981' }}></i>
                                </div>
                                <div className="stat-number">{stats.resolved}+</div>
                                <div className="stat-label">Complaints Resolved</div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="stat-card">
                                <div className="stat-icon" style={{ background: 'rgba(59,130,246,0.15)' }}>
                                    <i className="fas fa-users" style={{ color: '#3b82f6' }}></i>
                                </div>
                                <div className="stat-number">{stats.users}+</div>
                                <div className="stat-label">Active Users</div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="stat-card">
                                <div className="stat-icon" style={{ background: 'rgba(245,158,11,0.15)' }}>
                                    <i className="fas fa-clock" style={{ color: '#f59e0b' }}></i>
                                </div>
                                <div className="stat-number">{stats.responseTime}h</div>
                                <div className="stat-label">Avg. Response Time</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ===== TESTIMONIALS ===== */}
            <div className="testimonials-section">
                <div className="container">
                    <div className="section-header">
                        <div className="section-tag">Reviews</div>
                        <h2 className="section-title">What our users say</h2>
                        <p className="section-subtitle">Real feedback from students and staff who use CampDesk every day.</p>
                    </div>
                    <div className="row g-4">
                        {feedbacks.length > 0 ? (
                            feedbacks.map((feedback) => (
                                <div className="col-md-6 col-lg-4" key={feedback._id}>
                                    <div className="testimonial-card">
                                        <div className="testimonial-stars">
                                            {[...Array(5)].map((_, i) => (
                                                <i key={i} className={`fas fa-star ${i < feedback.rating ? '' : 'text-muted'}`}
                                                   style={{ color: i < feedback.rating ? 'var(--accent)' : '#cbd5e1' }}></i>
                                            ))}
                                        </div>
                                        <p className="testimonial-text">"{feedback.comment || 'Great service and quick resolution!'}"</p>
                                        <div className="testimonial-author">
                                            <div className="author-avatar">
                                                {(feedback.userId?.name || 'A')[0].toUpperCase()}
                                            </div>
                                            <div>
                                                <div className="author-name">{feedback.userId?.name || 'Anonymous'}</div>
                                                <div className="author-role">
                                                    <i className="fas fa-calendar-alt me-1"></i>
                                                    {new Date(feedback.submittedAt).toLocaleDateString()}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-12 text-center py-5">
                                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💬</div>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                                    No feedback yet. Be the first to share your experience!
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ===== FOOTER ===== */}
            <footer>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 mb-4">
                            <div className="footer-brand">Camp<span>Desk</span></div>
                            <p className="footer-desc">
                                A smart, transparent complaint management platform built for modern campuses.
                            </p>
                        </div>
                        <div className="col-lg-4 col-md-6 mb-4">
                            <h6>Quick Links</h6>
                            <button className="footer-link">About</button>
                            <button className="footer-link">Help Center</button>
                            <button className="footer-link">Privacy Policy</button>
                            <button className="footer-link">Terms of Service</button>
                        </div>
                        <div className="col-lg-4 col-md-6 mb-4">
                            <h6>For Users</h6>
                            <button className="footer-link" onClick={() => history.push('/login/student')}>Student Login</button>
                            <button className="footer-link" onClick={() => history.push('/login/staff')}>Staff Login</button>
                            <button className="footer-link" onClick={() => history.push('/login/admin')}>Admin Login</button>
                            <button className="footer-link" onClick={() => history.push('/register/student')}>Register</button>
                        </div>
                    </div>
                    <hr className="footer-divider" />
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <p className="footer-bottom mb-0">
                                &copy; 2025 <span>CampDesk</span>. All rights reserved.
                            </p>
                        </div>
                        <div className="col-md-6 text-md-end">
                            <p className="footer-bottom mb-0">Built with <span>♥</span> for better campuses</p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;