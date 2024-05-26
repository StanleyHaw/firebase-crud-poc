import { useAuth } from '@/contexts/authContext';
import { handleSignOut } from '@/config/auth';
import { Link } from 'react-router-dom';

function Dashboard() {
  const { currentUser } = useAuth();

  const handleLogout = () => {
    console.log('logout');
    handleSignOut();
  };

  return (
    <>
      <div>Dashboard</div>
      {currentUser ? (
        <>
          <div>Welcome {currentUser?.email}</div>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <div>
          Please <Link to="/login">login</Link>
        </div>
      )}
    </>
  );
}

export default Dashboard;
