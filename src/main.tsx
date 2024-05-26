import ReactDOM from 'react-dom/client';
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';
import SignUpPage from '@/pages/SignUpPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/signup',
    element: <SignUpPage />
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />);
