import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import useAuth from '@/hooks/useAuth';
import useToast from '@/hooks/useToast';

import Loading from '@components/Loading';
import LoginForm from '@components/auth/Login';
import { Toaster } from 'sonner';
import { Authorize } from '@/components/Authorize';

function LoginPage() {
  const { currentUser } = useAuth();
  const { loading } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    currentUser && navigate('/dashboard');
  }, [currentUser, navigate]);

  return (
    <div className="overflow-hidden">
      <Authorize title="Login">
        <LoginForm />
        <hr className="border-[width:1px] my-4" />
        <div className="text-center text-sm text-gray-400">
          Don&apos;t have an account?{' '}
          <Link to="/signup" className="underline text-indigo-600">
            Sign up
          </Link>
        </div>
      </Authorize>
      <Toaster richColors />
      {loading && <Loading />}
    </div>
  );
}

export default LoginPage;
