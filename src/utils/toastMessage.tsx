import { toast } from 'sonner';

type AuthToastMessage = {
  type: 'signUp' | 'login' | 'logout';
};

function handleAuthErrorMessage({ type }: AuthToastMessage) {
  const message = {
    signUp:
      'Invalid sign up, please check whether your email has been registered.',
    login: 'Invalid login, please check whether your email is correct.',
    logout: 'Failed to log out.'
  }[type];

  return toast.error(message);
}

function handleAuthSuccessMessage({ type }: AuthToastMessage) {
  const message = {
    signUp:
      'Your account has been successfully created, and already logged in.',
    login: 'You have successfully logged in.',
    logout: 'You have successfully logged out.'
  }[type];

  return toast.success(message);
}

export { handleAuthSuccessMessage, handleAuthErrorMessage };
