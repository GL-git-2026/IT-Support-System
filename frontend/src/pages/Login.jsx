import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../features/auth/authApiSlice';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [login, { isLoading, error }] = useLoginMutation();
    const navigate = useNavigate();

    const { email, password } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            // Dërgojmë të dhënat në Backend përmes Redux Toolkit
            const userData = await login({ email, password }).unwrap();
            
            // Ruajmë token-in dhe të dhënat e përdoruesit në LocalStorage
            localStorage.setItem('token', userData.token);
            localStorage.setItem('user', JSON.stringify(userData));
            
            // 🛠️ NDRYSHIMI: U hoq alert-i bllokues dhe u aktivizua ridrejtimi automatik i menjëhershëm
            navigate('/dashboard');
        } catch (err) {
            console.error('Gabim gjatë login-it:', err);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2>Sistemi i Suportit IT - Login</h2>
                <form onSubmit={onSubmit} style={styles.form}>
                    {error && <p style={styles.error}>{error.data?.message || 'Email ose Password i gabuar!'}</p>}
                    
                    <div style={styles.inputGroup}>
                        <label>Email</label>
                        <input type="email" name="email" value={email} onChange={onChange} required style={styles.input} />
                    </div>

                    <div style={styles.inputGroup}>
                        <label>Fjalëkalimi</label>
                        <input type="password" name="password" value={password} onChange={onChange} required style={styles.input} />
                    </div>

                    <button type="submit" disabled={isLoading} style={styles.button}>
                        {isLoading ? 'Duke u ngarkuar...' : 'Hyr'}
                    </button>
                </form>
                <p style={styles.text}>
                    Nuk keni një llogari? <Link to="/register">Regjistrohuni këtu</Link>
                </p>
            </div>
        </div>
    );
};

const styles = {
    container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f5f7fb', fontFamily: 'Arial, sans-serif' },
    card: { backgroundColor: '#fff', padding: '40px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px', textAlign: 'center' },
    form: { display: 'flex', flexDirection: 'column', textAlign: 'left', marginTop: '20px' },
    inputGroup: { marginBottom: '15px' },
    input: { width: '100%', padding: '10px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' },
    button: { padding: '12px', backgroundColor: '#0056b3', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px', marginTop: '10px' },
    error: { color: 'red', fontSize: '14px', marginBottom: '10px', fontWeight: 'bold' },
    text: { marginTop: '20px', fontSize: '14px' }
};

export default Login;