import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub, FaFacebook } from 'react-icons/fa';

type AuthorizeProps = {
  children: React.ReactNode;
  title: string;
};

export function Authorize({ children, title }: AuthorizeProps) {
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
            <Link to="#">
              <FcGoogle />
            </Link>{' '}
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
