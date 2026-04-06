import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

const Signup = () => {
    const { signup } = useAuth();
    const { t } = useLanguage();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const result = signup(name, email, password);
        if (result.success) {
            navigate('/myhomepage');
        } else {
            setError(result.error || 'Sign up failed.');
        }
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
                maxWidth: '500px',
                width: '100%',
                background: 'rgba(30,30,30,0.4)',
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
                    SIGN U<span style={{ color: '#ffffff' }}>P</span>
                </h1>
                <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '35px' }}>
                    {t.signupWelcome}
                </p>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                   <div style={{ textAlign: 'left' }}>
                        <label style={{ color: '#40e0d0', fontSize: '0.85rem', fontWeight: '600', marginLeft: '15px', marginBottom: '8px', display: 'block' }}>{t.fullName.toUpperCase()}</label>
                        <input 
                            type="text" 
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder={t.fullNamePlaceholder}
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
                    <label style={{ color: '#40e0d0', fontSize: '0.85rem', fontWeight: '600', marginLeft: '15px', marginBottom: '8px', display: 'block' }}>{t.email.toUpperCase()}</label>
                    <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t.emailPlaceholder}
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
                    <label style={{ color: '#40e0d0', fontSize: '0.85rem', fontWeight: '600', marginLeft: '15px', marginBottom: '8px', display: 'block' }}>{t.password.toUpperCase()}</label>
                    <input 
                        type="password" 
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={t.passwordPlaceholder}
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
                        {t.signUp}
                    </button>
                    {error && (
                        <div style={{ color: '#ff6b6b', fontSize: '0.9rem', textAlign: 'center', padding: '8px 15px', background: 'rgba(255,107,107,0.1)', borderRadius: '12px' }}>
                            {error}
                        </div>
                    )}
                </form>

                <div style={{ marginTop: '30px', color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>
                    {t.alreadyHaveAccount} <Link to="/login" style={{ color: '#40e0d0', textDecoration: 'none', fontWeight: '600' }}>{t.logIn}</Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;
