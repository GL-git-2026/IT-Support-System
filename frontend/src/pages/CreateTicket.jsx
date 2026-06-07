import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useCreateTicketMutation } from '../features/tickets/ticketApiSlice';

const CreateTicket = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'Hardware',
        priority: 'Low'
    });

    const [createTicket, { isLoading, error }] = useCreateTicketMutation();

    const { title, description, category, priority } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await createTicket({ title, description, category, priority }).unwrap();
            
            // 🛠️ NDRYSHIMI: U hoq alert-i bllokues. Faqja kalon fluturimthi direkt te Dashboard!
            navigate('/dashboard'); 
        } catch (err) {
            console.error('Failed to create ticket:', err);
            alert('An error occurred: ' + (err.data?.message || 'Please try again'));
        }
    };

    // Nëse nuk është i loguar, kalon automatikisht te Login
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Sigurohemi që kontrolli i rolit të jetë imun ndaj shkronjave të mëdha/vogla
    const userRole = user.role?.toLowerCase();

    // Nëse është Admin/IT Staff, kalon automatikisht te Dashboard pa shfaqur mesazh bllokues
    if (userRole === 'admin' || userRole === 'it_support') {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Create New Support Ticket</h2>
                <p style={styles.subtitle}>Please fill in the details of your technical issue.</p>
                
                <form onSubmit={onSubmit}>
                    {error && <p style={styles.error}>Error: {error.data?.message || 'Something went wrong!'}</p>}

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Issue Title</label>
                        <input type="text" name="title" value={title} onChange={onChange} placeholder="e.g., Server is refusing connections" required style={styles.input} />
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Category</label>
                        <select name="category" value={category} onChange={onChange} style={styles.input}>
                            <option value="Hardware">Hardware (Server, PC, Printer)</option>
                            <option value="Software">Software (Systems, POS, Web)</option>
                            <option value="Network">Network (Routing, IP Phone, Wi-Fi)</option>
                            <option value="Account/Access">Account / Access (Password, Login)</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Priority</label>
                        <select name="priority" value={priority} onChange={onChange} style={styles.input}>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Detailed Description</label>
                        <textarea name="description" value={description} onChange={onChange} rows="4" placeholder="Provide more details about the issue..." required style={{...styles.input, resize: 'none'}}></textarea>
                    </div>

                    <div style={styles.btnRow}>
                        <button type="button" onClick={() => navigate('/dashboard')} style={styles.cancelBtn}>Cancel</button>
                        <button type="submit" disabled={isLoading} style={styles.submitBtn}>
                            {isLoading ? 'Sending...' : 'Submit Ticket'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const styles = {
    container: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f4f6f9', fontFamily: 'Arial, sans-serif', padding: '20px' },
    card: { backgroundColor: '#fff', padding: '35px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', width: '100%', maxWidth: '500px' },
    title: { margin: '0 0 5px 0', color: '#333', textAlign: 'center' },
    subtitle: { margin: '0 0 20px 0', color: '#777', textAlign: 'center', fontSize: '14px' },
    inputGroup: { marginBottom: '15px', display: 'flex', flexDirection: 'column' },
    label: { fontWeight: 'bold', marginBottom: '5px', color: '#555', fontSize: '14px' },
    input: { width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box', fontSize: '14px' },
    btnRow: { display: 'flex', justifyContent: 'space-between', marginTop: '20px' },
    cancelBtn: { padding: '10px 20px', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' },
    submitBtn: { padding: '10px 20px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' },
    error: { color: 'red', fontWeight: 'bold', marginBottom: '10px', fontSize: '14px' }
};

export default CreateTicket;