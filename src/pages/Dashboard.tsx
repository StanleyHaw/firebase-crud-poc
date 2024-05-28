import { Link } from 'react-router-dom';
import { Toaster } from 'sonner';
import useAuth from '@/hooks/useAuth';
import useToast from '@/hooks/useToast';

import Loading from '@/components/Loading';
import Navbar from '@/components/header/Navbar';

function Dashboard() {
  const { currentUser } = useAuth();
  const { loading } = useToast();

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
      <Toaster richColors />
      {loading && <Loading />}
    </>
  );
}

export default Dashboard;
