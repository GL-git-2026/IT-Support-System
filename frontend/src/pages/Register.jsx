import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../features/auth/authApiSlice';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [register, { isLoading, error }] = useRegisterMutation();
    const navigate = useNavigate();

    const { name, email, password } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await register({ name, email, password }).unwrap();
            navigate('/login'); 
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2>Krijo Llogari të Re</h2>
                <form onSubmit={onSubmit} style={styles.form}>
                    {error && <p style={styles.error}>{error.data?.message || 'Regjistrimi dështoi. Provo përsëri!'}</p>}
                    
                    <div style={styles.inputGroup}>
                        <label>Emri i Plotë</label>
                        <input type="text" name="name" value={name} onChange={onChange} required style={styles.input} />
                    </div>

                    <div style={styles.inputGroup}>
                        <label>Email Adresa</label>
                        <input type="email" name="email" value={email} onChange={onChange} required style={styles.input} />
                    </div>

                    <div style={styles.inputGroup}>
                        <label>Fjalëkalimi</label>
                        <input type="password" name="password" value={password} onChange={onChange} required style={styles.input} />
                    </div>

                    <button type="submit" disabled={isLoading} style={styles.button}>
                        {isLoading ? 'Duke u regjistruar...' : 'Regjistrohu'}
                    </button>
                </form>
                <p style={styles.text}>
                    Keni një llogari? <Link to="/login">Hyni këtu</Link>
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
    button: { padding: '12px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' },
    text: { marginTop: '20px', fontSize: '14px', color: '#666' },
    error: { color: 'red', fontSize: '14px', marginBottom: '10px', textAlign: 'center' }
};

export default Register;