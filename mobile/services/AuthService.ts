import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";

import { getAuth } from "firebase/auth";
import { firebaseApp } from "./firebase/firebaseConfig";

const auth = getAuth(firebaseApp);

class AuthService {
  async register(
    email: string,
    password: string
  ) {
    return createUserWithEmailAndPassword(
      auth,
      email.trim(),
      password
    );
  }

  async login(
    email: string,
    password: string
  ) {
    return signInWithEmailAndPassword(
      auth,
      email.trim(),
      password
    );
  }

  async resetPassword(email: string) {
    return sendPasswordResetEmail(
      auth,
      email.trim()
    );
  }

  async logout() {
    return signOut(auth);
  }

  getCurrentUser() {
    return auth.currentUser;
  }
}

export default new AuthService();
