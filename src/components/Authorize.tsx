import { Link } from 'react-router-dom';
import useToast from '@/hooks/useToast';
import { handleSignInWithGoogle } from '@/config/auth';
import { handleAuthSuccessMessage } from '@/utils/toastMessage';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/Card';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub, FaFacebook } from 'react-icons/fa';

type AuthorizeProps = {
  children: React.ReactNode;
  title: string;
};

export function Authorize({ children, title }: AuthorizeProps) {
  const { setLoading } = useToast();

  async function signInWithGoogle() {
    setLoading(true);
    await handleSignInWithGoogle();
    setTimeout(() => {
      setLoading(false);
      handleAuthSuccessMessage({ type: 'login' });
    }, 1000);
  }

  return (
    <Card className="mx-auto px-4 py-8 w-[500px] h-screen border-0 shadow-none">
      <CardHeader>
        <CardTitle className="text-5xl text-indigo-600">{title}</CardTitle>
        <CardDescription>Please enter your details below.</CardDescription>
      </CardHeader>
      <CardContent>
        {children}
        <div className="mt-3 text-center text-sm text-gray-400">
          or you can sign in with
          <div className="flex flex-row justify-center gap-4 mt-2">
            <button onClick={signInWithGoogle}>
              <FcGoogle />
            </button>
            <Link to="#">
              <FaGithub className="text-black" />
            </Link>{' '}
            <Link to="#">
              <FaFacebook className="text-[color:#1877f2]" />
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
