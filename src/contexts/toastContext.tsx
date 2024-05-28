import { ReactNode, createContext, useState } from 'react';
import { Toaster } from 'sonner';

type ToastContextProps = {
  loading: boolean;
  setLoading: (loading: boolean) => void;
};

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

type ToastProviderProps = {
  children: ReactNode;
};

function ToastProvider({ children }: ToastProviderProps) {
  const [loading, setLoading] = useState(false);

  const value = {
    loading,
    setLoading
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Toaster richColors />
    </ToastContext.Provider>
  );
}

export { ToastContext, ToastProvider };
