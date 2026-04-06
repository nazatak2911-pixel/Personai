import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

const Login = () => {
    const { login } = useAuth();
    const { t } = useLanguage();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulating logic
        login(email, "Murat"); // Placeholder name
        navigate('/myhomepage');
    };

    return (
        <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            background: 'transparent'
        }}>
            <div style={{
                maxWidth: '450px',
                width: '100%',
                background: 'rgba(30, 30, 30, 0.4)',
                border: '1px solid rgba(64, 224, 208, 0.2)',
                backdropFilter: 'blur(15px)',
                WebkitBackdropFilter: 'blur(15px)',
                borderRadius: '32px',
                padding: '50px 40px',
                boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
                textAlign: 'center'
            }}>
                <h1 style={{
                    fontSize: '2.5rem',
                    fontWeight: '800',
                    color: '#40e0d0',
                    marginBottom: '10px',
                    textTransform: 'uppercase',
                    letterSpacing: '-1px'
                }}>
                    LOG I<span style={{ color: '#ffffff' }}>N</span>
                </h1>
                <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '35px' }}>
                    Welcome back to the future of career mentoring.
                </p>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ textAlign: 'left' }}>
                        <label style={{ color: '#40e0d0', fontSize: '0.85rem', fontWeight: '600', marginLeft: '15px', marginBottom: '8px', display: 'block' }}>EMAIL</label>
                        <input 
                            type="email" 
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your@email.com"
                            style={{
                                width: '100%',
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(64, 224, 208, 0.1)',
                                borderRadius: '16px',
                                padding: '16px 20px',
                                color: '#ffffff',
                                fontSize: '1rem',
                                outline: 'none',
                                transition: 'all 0.3s ease'
                            }}
                        />
                    </div>
                    <div style={{ textAlign: 'left' }}>
                        <label style={{ color: '#40e0d0', fontSize: '0.85rem', fontWeight: '600', marginLeft: '15px', marginBottom: '8px', display: 'block' }}>PASSWORD</label>
                        <input 
                            type="password" 
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            style={{
                                width: '100%',
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(64, 224, 208, 0.1)',
                                borderRadius: '16px',
                                padding: '16px 20px',
                                color: '#ffffff',
                                fontSize: '1rem',
                                outline: 'none',
                                transition: 'all 0.3s ease'
                            }}
                        />
                    </div>
                    
                    <button type="submit" style={{
                        marginTop: '10px',
                        padding: '18px',
                        background: '#40e0d0',
                        color: '#000000',
                        border: 'none',
                        borderRadius: '16px',
                        fontSize: '1.1rem',
                        fontWeight: '800',
                        cursor: 'pointer',
                        boxShadow: '0 10px 20px rgba(64, 224, 208, 0.3)',
                        transition: 'all 0.3s ease'
                    }}>
                        {t.logIn}
                    </button>
                </form>

                <div style={{ marginTop: '30px', color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>
                    Don't have an account? <Link to="/signup" style={{ color: '#40e0d0', textDecoration: 'none', fontWeight: '600' }}>{t.signUp}</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
