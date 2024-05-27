import { useAuth } from '@/contexts/authContext';
import { Link } from 'react-router-dom';
import Navbar from '@/components/header/Navbar';

function Dashboard() {
  const { currentUser } = useAuth();

  return (
    <>
      <Navbar />
      <div className="w-screen h-screen flex flex-col text-center items-center gap-4 pt-[15%]">
        <h1 className="text-indigo-600 text-8xl font-black">Dashboard</h1>
        {currentUser ? (
          <h2 className="text-2xl">
            Welcome{' '}
            <span className="text-indigo-600">{currentUser?.email}</span>
          </h2>
        ) : (
          <div>
            Please{' '}
            <Link to="/login" className="underline text-indigo-600">
              login
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

export default Dashboard;
