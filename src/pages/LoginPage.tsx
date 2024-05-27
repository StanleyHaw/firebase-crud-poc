import { Link, useNavigate } from 'react-router-dom';

import { Authorize } from '@/components/Authorize';
import { useAuth } from '@/contexts/authContext';
import LoginForm from '@components/auth/Login';
import { useEffect } from 'react';

function LoginPage() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    currentUser && navigate('/dashboard');
  }, [currentUser, navigate]);

  return (
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
  );
}

export default LoginPage;
