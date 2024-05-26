import { Link } from 'react-router-dom';

import { Authorize } from '@/components/Authorize';
import SignUpForm from '@/components/auth/SignUp';

function SignUpPage() {
  return (
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
  );
}

export default SignUpPage;
