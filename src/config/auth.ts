import { auth } from '@config/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth';
import { z } from 'zod';
import { authSchema, signUpSchema } from '@utils/constant';

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

async function handleSignInWithGoogle() {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);

  return result;
}

async function handleSignOut() {
  await auth.signOut();
}

export { handleLogin, handleSignUp, handleSignInWithGoogle, handleSignOut };
