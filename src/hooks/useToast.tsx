import { useContext } from 'react';
import { ToastContext } from '@/contexts/toastContext';

function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export default useToast;
