import { Link } from 'react-router-dom';
import { Authorize } from '@/components/Authorize';
import useToast from '@/hooks/useToast';

import Loading from '@/components/Loading';
import SignUpForm from '@/components/auth/SignUp';
import { Toaster } from 'sonner';

function SignUpPage() {
  const { loading } = useToast();
  return (
    <div className="w-screen h-screen">
      <Authorize title="Sign up">
        <SignUpForm />
        <hr className="border-[width:1px] my-4" />
        <div className="text-center text-sm text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="underline text-indigo-600">
            Login
          </Link>
        </div>
      </Authorize>
      <Toaster richColors />
      {loading && <Loading />}
    </div>
  );
}

export default SignUpPage;
