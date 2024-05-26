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
  return await signInWithEmailAndPassword(auth, email, password);
}

type SignUpRequest = z.infer<typeof signUpSchema>;

async function handleSignUp({ email, password }: SignUpRequest) {
  return await createUserWithEmailAndPassword(auth, email, password);
}

async function handleSignInWithGoogle() {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);

  return result;
}

function handleSignOut() {
  return auth.signOut();
}

export { handleLogin, handleSignUp, handleSignInWithGoogle, handleSignOut };
