import { useNavigate, Navigate } from 'react-router-dom';
import { 
    useGetTicketsQuery, 
    useUpdateTicketMutation, 
    useDeleteTicketMutation 
} from '../features/tickets/ticketApiSlice'; 

const Dashboard = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    
    const { data: tickets, isLoading, isError } = useGetTicketsQuery(undefined, {
        skip: !user,
    });

    const [updateTicket] = useUpdateTicketMutation();
    const [deleteTicket] = useDeleteTicketMutation();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const handleDelete = async (id) => {
        // Kjo është tabela confirm e browser-it për siguri gjatë fshirjes.
        // Nëse nuk e dëshiron fare as këtë, mund ta heqësh kushtin 'if' dhe të mbash vetëm bllokun try/catch.
        if (window.confirm("Are you sure you want to delete this ticket?")) {
            try {
                await deleteTicket(id).unwrap();
            } catch (err) {
                console.error("Failed to delete ticket:", err);
            }
        }
    };

    const handleStatusChange = async (id, currentStatus) => {
        const nextStatus = currentStatus === 'Closed' ? 'Open' : 'Closed';
        try {
            await updateTicket({ id, status: nextStatus }).unwrap();
        } catch (err) {
            console.error("Failed to update status:", err);
        }
    };

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // 🛠️ NDRYSHIMI: Kthejmë rolin në shkronja të vogla për të shmangur gabimet e krahasimit
    const userRole = user.role?.toLowerCase();

    return (
        <div style={styles.container}>
            {/* Dashboard Header */}
            <div style={styles.header}>
                <div>
                    <h2 style={{ margin: 0 }}>Dashboard - IT Support System</h2>
                    <p style={{ margin: '5px 0 0 0' }}>Welcome, <strong>{user.name || 'User'}</strong> ({user.role?.toUpperCase() || 'CLIENT'})</p>
                </div>
                <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
            </div>

            {/* Main Content */}
            <div style={styles.mainContent}>
                <div style={styles.actionRow}>
                    <h3 style={{ margin: 0 }}>IT Support Tickets</h3>
                    
                    {/* 🛠️ NDRYSHIMI: Tani kontrolli pranon çdo lloj formati (client, Client, CLIENT) */}
                    {userRole === 'client' && (
                        <button onClick={() => navigate('/create-ticket')} style={styles.createBtn}>
                            + Create Ticket
                        </button>
                    )}
                </div>

                {isLoading && <p>Loading tickets...</p>}
                {isError && <p style={{ color: 'red' }}>Error loading tickets from server.</p>}

                {/* Tickets Table */}
                {!tickets || tickets.length === 0 ? (
                    <div style={styles.noTickets}>
                        <p>No tickets found in the system at the moment.</p>
                    </div>
                ) : (
                    <table style={styles.table}>
                        <thead>
                            <tr style={styles.thRow}>
                                <th style={styles.th}>Title</th>
                                <th style={styles.th}>Category</th>
                                <th style={styles.th}>Priority</th>
                                <th style={styles.th}>Status</th>
                                <th style={styles.th}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tickets.map((ticket) => (
                                <tr key={ticket._id} style={styles.tr}>
                                    <td style={styles.td}><strong>{ticket.title}</strong></td>
                                    <td style={styles.td}>{ticket.category}</td>
                                    <td style={styles.td}>{ticket.priority}</td>
                                    <td style={styles.td}>
                                        <span style={{
                                            padding: '4px 8px',
                                            borderRadius: '4px',
                                            backgroundColor: ticket.status === 'Closed' ? '#e2e3e5' : '#cce5ff',
                                            color: ticket.status === 'Closed' ? '#383d41' : '#004085',
                                            fontWeight: 'bold',
                                            fontSize: '13px'
                                        }}>
                                            {ticket.status}
                                        </span>
                                    </td>
                                    <td style={styles.td}>
                                        <button 
                                            onClick={() => handleStatusChange(ticket._id, ticket.status)}
                                            style={styles.statusBtn}
                                        >
                                            {ticket.status === 'Closed' ? 'Reopen' : 'Close'}
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(ticket._id)}
                                            style={styles.deleteBtn}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

const styles = {
    container: { padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f6f9', minHeight: '100vh' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#0056b3', color: 'white', padding: '15px 30px', borderRadius: '8px', marginBottom: '20px' },
    logoutBtn: { backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' },
    mainContent: { backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' },
    actionRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '10px' },
    createBtn: { backgroundColor: '#28a745', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' },
    table: { width: '100%', borderCollapse: 'collapse' },
    thRow: { backgroundColor: '#f8f9fa', textAlign: 'left' },
    th: { padding: '12px', borderBottom: '2px solid #dee2e6' },
    tr: { borderBottom: '1px solid #dee2e6' },
    td: { padding: '12px' },
    noTickets: { textAlign: 'center', color: '#777', padding: '30px', fontSize: '16px' },
    statusBtn: { backgroundColor: '#007bff', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', marginRight: '8px', fontWeight: 'bold', fontSize: '12px' },
    deleteBtn: { backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px' }
};

export default Dashboard;