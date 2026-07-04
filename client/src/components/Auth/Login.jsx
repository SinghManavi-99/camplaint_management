import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Login = ({ setIsLoggedIn, onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student');
    const [error, setError] = useState('');
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await axios.post('https://campus-complaint-system.onrender.com/api/auth/login', { email, password, role });
            localStorage.setItem('token', response.data.token);
            setIsLoggedIn(true);
            if (onLoginSuccess) {
                onLoginSuccess(response, history);
            }
            history.push('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="login-container" style={{ margin: '0 auto' }}>
                <h2>Welcome Back</h2>
                <p className="auth-subtitle" style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>Sign in to your CampDesk account</p>
                {error && <div className="error">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label>Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label>Role</label>
                        <select value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="student">Student</option>
                            <option value="staff">Staff</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <button type="submit" style={{ marginTop: '1rem' }}>Sign In</button>
                    <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                        <button type="button" style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 500 }} onClick={() => history.push('/register/student')}>
                            Don't have an account? Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;