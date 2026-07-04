import React from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';

const Navbar = ({ isLoggedIn, onLogout, userRole, userEmail, userInfo }) => {
    const history = useHistory();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="navbar navbar-expand-lg navbar-dark">
            <div className="container">
                <Link className="navbar-brand d-flex align-items-center" to="/">
                    <div className="brand-icon">
                        <i className="fas fa-clipboard-check" style={{ color: 'white' }}></i>
                    </div>
                    <span className="brand-text">Camp<span>Desk</span></span>
                </Link>

                <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    {isLoggedIn ? (
                        <ul className="navbar-nav mb-2 mb-lg-0 align-items-center gap-1">
                            <li className="nav-item">
                                <Link className={`nav-link ${isActive('/') ? 'active' : ''}`} to="/">Home</Link>
                            </li>

                            {userRole === 'admin' && (
                                <li className="nav-item">
                                    <Link className={`nav-link ${isActive('/admin/dashboard') ? 'active' : ''}`} to="/admin/dashboard">
                                        <i className="fas fa-chart-bar me-1"></i>Dashboard
                                    </Link>
                                </li>
                            )}

                            {userRole === 'staff' && (
                                <li className="nav-item">
                                    <Link className={`nav-link ${isActive('/staff/dashboard') ? 'active' : ''}`} to="/staff/dashboard">
                                        <i className="fas fa-tasks me-1"></i>Dashboard
                                    </Link>
                                </li>
                            )}

                            {userRole === 'student' && (
                                <>
                                    <li className="nav-item">
                                        <Link className={`nav-link ${isActive('/my-complaints') ? 'active' : ''}`} to="/my-complaints">
                                            <i className="fas fa-list me-1"></i>My Complaints
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className={`nav-link ${isActive('/complaints/new') ? 'active' : ''}`} to="/complaints/new">
                                            <i className="fas fa-plus-circle me-1"></i>Submit
                                        </Link>
                                    </li>
                                </>
                            )}

                            {/* User badge */}
                            <li className="nav-item ms-2">
                                <div className="user-badge">
                                    <div className="user-avatar">
                                        {(userInfo?.name || userEmail || 'U')[0].toUpperCase()}
                                    </div>
                                    <div>
                                        <div className="user-name">{userInfo?.name || userEmail?.split('@')[0]}</div>
                                        <div className="user-role">{userRole}</div>
                                    </div>
                                </div>
                            </li>

                            <li className="nav-item ms-1">
                                <button className="nav-link btn-logout" onClick={onLogout}>
                                    <i className="fas fa-sign-out-alt me-1"></i>Logout
                                </button>
                            </li>
                        </ul>
                    ) : (
                        <ul className="navbar-nav mb-2 mb-lg-0 align-items-center gap-2">
                            <li className="nav-item">
                                <button
                                    className="nav-link"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => history.push('/login/student')}
                                >
                                    Login
                                </button>
                            </li>
                            <li className="nav-item">
                                <button
                                    className="btn-hero-primary"
                                    style={{ padding: '0.45rem 1.25rem', fontSize: '0.88rem' }}
                                    onClick={() => history.push('/register/student')}
                                >
                                    Get Started
                                </button>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;