import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const ComplaintForm = () => {
    const history = useHistory();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [dueInDays, setDueInDays] = useState(1);
    const [image, setImage] = useState(null);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess('');
        setError('');
        setIsSubmitting(true);
        
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('You are not logged in. Please log in again.');
                setIsSubmitting(false);
                return;
            }
            
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('category', category);
            formData.append('dueInDays', dueInDays);
            if (image) formData.append('image', image);
            
            await axios.post('https://campus-complaint-system.onrender.com/api/complaints', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            
            setSuccess('Complaint submitted successfully! We will look into it right away.');
            setTitle('');
            setDescription('');
            setCategory('');
            setDueInDays(1);
            setImage(null);
            
            // Redirect to My Complaints after 2 seconds
            setTimeout(() => history.push('/my-complaints'), 2000);
            
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError('Failed to submit complaint. Please try again.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
            padding: '4rem 1rem'
        }}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        {/* Header Section */}
                        <div className="text-center mb-5">
                            <div style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                background: 'rgba(59, 130, 246, 0.1)',
                                color: 'var(--primary-light)',
                                padding: '0.5rem 1.25rem',
                                borderRadius: '100px',
                                fontWeight: '600',
                                fontSize: '0.85rem',
                                marginBottom: '1rem'
                            }}>
                                <i className="fas fa-bullhorn"></i> Speak Up
                            </div>
                            <h2 style={{ 
                                fontWeight: '900', 
                                fontSize: '2.5rem', 
                                color: 'var(--text-primary)',
                                letterSpacing: '-0.5px'
                            }}>
                                Submit a <span style={{
                                    background: 'linear-gradient(135deg, var(--primary-light), var(--accent))',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent'
                                }}>Complaint</span>
                            </h2>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '500px', margin: '0 auto' }}>
                                Help us improve the campus experience by reporting issues. We ensure quick and transparent resolutions.
                            </p>
                        </div>

                        {/* Glassmorphic Form Card */}
                        <div style={{
                            background: 'rgba(255, 255, 255, 0.7)',
                            backdropFilter: 'blur(20px)',
                            WebkitBackdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255, 255, 255, 0.5)',
                            borderRadius: 'var(--radius-xl)',
                            boxShadow: 'var(--shadow-lg)',
                            padding: '3rem',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            {/* Decorative Blur Orbs */}
                            <div style={{
                                position: 'absolute', top: '-50px', left: '-50px', width: '200px', height: '200px',
                                background: 'rgba(59, 130, 246, 0.15)', borderRadius: '50%', filter: 'blur(40px)', zIndex: 0
                            }}></div>
                            <div style={{
                                position: 'absolute', bottom: '-50px', right: '-50px', width: '200px', height: '200px',
                                background: 'rgba(245, 158, 11, 0.15)', borderRadius: '50%', filter: 'blur(40px)', zIndex: 0
                            }}></div>

                            <div style={{ position: 'relative', zIndex: 1 }}>
                                {error && (
                                    <div style={{
                                        background: 'rgba(239, 68, 68, 0.1)', borderLeft: '4px solid var(--danger)',
                                        color: 'var(--danger)', padding: '1rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem',
                                        display: 'flex', alignItems: 'center', gap: '10px'
                                    }}>
                                        <i className="fas fa-exclamation-circle"></i> {error}
                                    </div>
                                )}
                                {success && (
                                    <div style={{
                                        background: 'rgba(16, 185, 129, 0.1)', borderLeft: '4px solid var(--success)',
                                        color: 'var(--success)', padding: '1rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem',
                                        display: 'flex', alignItems: 'center', gap: '10px'
                                    }}>
                                        <i className="fas fa-check-circle"></i> {success}
                                    </div>
                                )}

                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-12 mb-4">
                                            <label style={{ fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.5rem', display: 'block' }}>Complaint Title</label>
                                            <input
                                                type="text"
                                                value={title}
                                                onChange={e => setTitle(e.target.value)}
                                                placeholder="Briefly describe the issue..."
                                                required
                                                style={{
                                                    width: '100%', padding: '0.9rem 1.2rem', borderRadius: 'var(--radius-md)',
                                                    border: '1px solid var(--border)', background: 'rgba(255, 255, 255, 0.9)',
                                                    fontSize: '0.95rem', transition: 'var(--transition)', outline: 'none'
                                                }}
                                                onFocus={(e) => { e.target.style.borderColor = 'var(--primary-light)'; e.target.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.1)'; }}
                                                onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
                                            />
                                        </div>

                                        <div className="col-md-6 mb-4">
                                            <label style={{ fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.5rem', display: 'block' }}>Category</label>
                                            <div style={{ position: 'relative' }}>
                                                <select
                                                    value={category}
                                                    onChange={e => setCategory(e.target.value)}
                                                    required
                                                    style={{
                                                        width: '100%', padding: '0.9rem 1.2rem', borderRadius: 'var(--radius-md)',
                                                        border: '1px solid var(--border)', background: 'rgba(255, 255, 255, 0.9)',
                                                        fontSize: '0.95rem', transition: 'var(--transition)', outline: 'none',
                                                        appearance: 'none', cursor: 'pointer'
                                                    }}
                                                    onFocus={(e) => { e.target.style.borderColor = 'var(--primary-light)'; e.target.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.1)'; }}
                                                    onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
                                                >
                                                    <option value="" disabled>Select a category</option>
                                                    <option value="Hostel">Hostel</option>
                                                    <option value="Transport">Transport</option>
                                                    <option value="Mess">Mess</option>
                                                    <option value="Maintenance">Maintenance</option>
                                                    <option value="Classroom">Classroom</option>
                                                    <option value="Lab">Lab</option>
                                                    <option value="Canteen">Canteen</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                                <i className="fas fa-chevron-down" style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }}></i>
                                            </div>
                                        </div>

                                        <div className="col-md-6 mb-4">
                                            <label style={{ fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.5rem', display: 'block' }}>Urgency (Due In)</label>
                                            <div style={{ position: 'relative' }}>
                                                <select
                                                    value={dueInDays}
                                                    onChange={e => setDueInDays(Number(e.target.value))}
                                                    style={{
                                                        width: '100%', padding: '0.9rem 1.2rem', borderRadius: 'var(--radius-md)',
                                                        border: '1px solid var(--border)', background: 'rgba(255, 255, 255, 0.9)',
                                                        fontSize: '0.95rem', transition: 'var(--transition)', outline: 'none',
                                                        appearance: 'none', cursor: 'pointer'
                                                    }}
                                                    onFocus={(e) => { e.target.style.borderColor = 'var(--primary-light)'; e.target.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.1)'; }}
                                                    onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
                                                >
                                                    <option value={1}>High (Within 1 day)</option>
                                                    <option value={2}>Medium (Within 2 days)</option>
                                                    <option value={3}>Low (More than 2 days)</option>
                                                </select>
                                                <i className="fas fa-chevron-down" style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }}></i>
                                            </div>
                                        </div>

                                        <div className="col-md-12 mb-4">
                                            <label style={{ fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.5rem', display: 'block' }}>Detailed Description</label>
                                            <textarea
                                                value={description}
                                                onChange={e => setDescription(e.target.value)}
                                                placeholder="Provide all necessary details to help us understand the issue..."
                                                required
                                                rows="5"
                                                style={{
                                                    width: '100%', padding: '0.9rem 1.2rem', borderRadius: 'var(--radius-md)',
                                                    border: '1px solid var(--border)', background: 'rgba(255, 255, 255, 0.9)',
                                                    fontSize: '0.95rem', transition: 'var(--transition)', outline: 'none',
                                                    resize: 'none'
                                                }}
                                                onFocus={(e) => { e.target.style.borderColor = 'var(--primary-light)'; e.target.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.1)'; }}
                                                onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
                                            />
                                        </div>

                                        <div className="col-md-12 mb-5">
                                            <label style={{ fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.5rem', display: 'block' }}>Attach Evidence (Optional Image)</label>
                                            <div style={{
                                                border: '2px dashed var(--border)',
                                                borderRadius: 'var(--radius-md)',
                                                padding: '2rem',
                                                textAlign: 'center',
                                                background: 'rgba(255, 255, 255, 0.5)',
                                                transition: 'var(--transition)',
                                                cursor: 'pointer',
                                                position: 'relative'
                                            }}
                                            onMouseOver={(e) => { e.currentTarget.style.borderColor = 'var(--primary-light)'; e.currentTarget.style.background = 'rgba(59, 130, 246, 0.05)'; }}
                                            onMouseOut={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'rgba(255, 255, 255, 0.5)'; }}
                                            >
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={e => setImage(e.target.files[0])}
                                                    style={{
                                                        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                                                        opacity: 0, cursor: 'pointer'
                                                    }}
                                                />
                                                <div style={{ pointerEvents: 'none' }}>
                                                    {image ? (
                                                        <>
                                                            <i className="fas fa-image" style={{ fontSize: '2rem', color: 'var(--success)', marginBottom: '0.5rem' }}></i>
                                                            <p style={{ margin: 0, fontWeight: '600', color: 'var(--text-primary)' }}>{image.name}</p>
                                                            <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Click to change</p>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <i className="fas fa-cloud-upload-alt" style={{ fontSize: '2rem', color: 'var(--primary-light)', marginBottom: '0.5rem' }}></i>
                                                            <p style={{ margin: 0, fontWeight: '600', color: 'var(--text-primary)' }}>Drag & drop or click to upload</p>
                                                            <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Supports JPG, PNG (Max 5MB)</p>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-12 text-center">
                                            <button 
                                                type="submit" 
                                                className="btn-hero-primary" 
                                                style={{ width: '100%', padding: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}
                                                disabled={isSubmitting}
                                            >
                                                {isSubmitting ? (
                                                    <><i className="fas fa-spinner fa-spin"></i> Submitting...</>
                                                ) : (
                                                    <><i className="fas fa-paper-plane"></i> Submit Complaint</>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ComplaintForm;