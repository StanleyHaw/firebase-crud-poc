import { auth } from '@config/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth';
import { z } from 'zod';
import { authSchema, signUpSchema } from '@utils/constant';
import { NavigateFunction } from 'react-router-dom';

type AuthRequest = z.infer<typeof authSchema>;

async function handleLogin({ email, password }: AuthRequest) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return true;
  } catch (error) {
    console.error('failed to Login', error);
    return false;
  }
}

type SignUpRequest = z.infer<typeof signUpSchema>;

async function handleSignUp({ email, password }: SignUpRequest) {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    return true;
  } catch (error) {
    console.error('failed to Login', error);
    return false;
  }
}

async function handleSignInWithGoogle(navigate: NavigateFunction) {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  navigate('/dashboard');

  return result;
}

function handleSignOut() {
  return auth.signOut();
}

export { handleLogin, handleSignUp, handleSignInWithGoogle, handleSignOut };
