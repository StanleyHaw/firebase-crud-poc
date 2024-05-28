import useToast from '@/hooks/useToast';
import { Toaster } from 'sonner';

import Loading from '@/components/Loading';
import Navbar from '@/components/header/Navbar';

function HomePage() {
  const { loading } = useToast();

  return (
    <>
      <Navbar />
      <div className="w-screen h-screen flex flex-col text-center items-center gap-4 pt-[15%]">
        <h1 className="text-indigo-600 text-8xl font-black">Home page</h1>
      </div>
      <Toaster richColors />
      {loading && <Loading />}
    </>
  );
}

export default HomePage;
