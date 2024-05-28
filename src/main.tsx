import ReactDOM from 'react-dom/client';
import { AuthProvider } from '@/contexts/authContext';
import { ToastProvider } from '@/contexts/toastContext';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import HomePage from '@/pages/HomePage';
import Dashboard from '@/pages/Dashboard';
import LoginPage from '@/pages/LoginPage';
import SignUpPage from '@/pages/SignUpPage';
import ErrorPage from '@/pages/ErrorPage';

import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <ErrorPage />
  },
  {
    path: '/dashboard',
    element: <Dashboard />
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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <ToastProvider>
      <RouterProvider router={router} />
    </ToastProvider>
  </AuthProvider>
);
