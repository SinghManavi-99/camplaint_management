import React from 'react';
import { useHistory } from 'react-router-dom';

const CenterPage = () => {
    const history = useHistory();

    return (
        <div className="center-page">
            <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
                <div style={{
                    width: '60px', height: '60px',
                    background: 'linear-gradient(135deg, #3b82f6, #f59e0b)',
                    borderRadius: '16px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 1.25rem',
                    fontSize: '1.5rem', color: 'white'
                }}>
                    <i className="fas fa-clipboard-check"></i>
                </div>
            </div>
            <h1>Welcome to CampDesk</h1>
            <p>Select your role to continue</p>

            <div className="role-buttons">
                <button onClick={() => history.push('/login/student')}>
                    <i className="fas fa-user-graduate" style={{ marginRight: '8px' }}></i>Student Login
                </button>
                <button onClick={() => history.push('/login/staff')}>
                    <i className="fas fa-user-tie" style={{ marginRight: '8px' }}></i>Staff Login
                </button>
                <button onClick={() => history.push('/login/admin')}>
                    <i className="fas fa-user-shield" style={{ marginRight: '8px' }}></i>Admin Login
                </button>
            </div>
            <div className="role-buttons" style={{ marginTop: '0.5rem' }}>
                <button onClick={() => history.push('/register/student')}>
                    <i className="fas fa-user-plus" style={{ marginRight: '8px' }}></i>Student Signup
                </button>
                <button onClick={() => history.push('/register/staff')}>
                    <i className="fas fa-user-plus" style={{ marginRight: '8px' }}></i>Staff Signup
                </button>
                <button onClick={() => history.push('/register/admin')}>
                    <i className="fas fa-user-plus" style={{ marginRight: '8px' }}></i>Admin Signup
                </button>
            </div>
        </div>
    );
};

export default CenterPage;