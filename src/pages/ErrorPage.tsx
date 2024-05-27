import { Button } from '@/components/ui/Button';
import { Link, isRouteErrorResponse, useRouteError } from 'react-router-dom';

type ErrorResponse = {
  status?: number;
  statusText?: string;
};

function ErrorPage() {
  const error = useRouteError() as ErrorResponse;
  const errorMessage = error?.statusText;

  if (isRouteErrorResponse(error)) {
    console.error(error);
  }

  return (
    <div className="w-screen h-screen flex flex-col text-center items-center gap-4 pt-[15%]">
      <h1 className="text-indigo-600 text-8xl font-black">Oops!</h1>
      <h2 className="text-2xl">
        {error?.status} - PAGE {errorMessage?.toUpperCase()}
      </h2>
      <p>{}</p>
      <Button className="w-[200px] text-white bg-indigo-600 hover:text-white hover:bg-indigo-700">
        <Link to="/">Back to Home</Link>
      </Button>
    </div>
  );
}

export default ErrorPage;
