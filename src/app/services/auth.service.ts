import { Injectable } from '@angular/core';
import { Auth, signOut } from '@angular/fire/auth';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly _auth: Auth) {}

  async signUp(user: { email: string; password: string }) {
    try {
      return await createUserWithEmailAndPassword(
        this._auth,
        user.email,
        user.password
      );
    } catch (e) {
      return null;
    }
  }

  async signIn(user: { email: string; password: string }) {
    try {
      return await signInWithEmailAndPassword(
        this._auth,
        user.email,
        user.password
      );
    } catch (e) {
      return null;
    }
  }

  logOut() {
    return signOut(this._auth);
  }
}
