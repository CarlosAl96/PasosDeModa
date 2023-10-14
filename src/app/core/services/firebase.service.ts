import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

import {
  collection,
  getFirestore,
  addDoc,
  query,
  where,
  getDocs,
  getDoc,
  doc,
} from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private auth: any;
  private querydb: any;
  private app: any;

  private user = new BehaviorSubject<User>(new User());

  constructor() {
    this.app = initializeApp(environment.firebase);
    this.auth = getAuth(this.app);
    this.querydb = getFirestore();
  }

  registerUser(user: User) {
    return createUserWithEmailAndPassword(
      this.auth,
      user.email ? user.email : '',
      user.password ? user.password : ''
    );
  }

  registerDataUser(user: User, id: string) {
    delete user.email;
    delete user.password;
    user.id_user = id;
    return addDoc(collection(this.querydb, 'user'), user);
  }

  login({ email, password }: any) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    this.user.next(new User());
    return signOut(this.auth);
  }

  setUser(uid: string) {
    const idRef = collection(this.querydb, 'user');
    const q = query(idRef, where('id_user', '==', uid));
    getDocs(q).then((resp) => {
      resp.forEach((doc) => {
        const userData = doc.data();
        let user: User = new User();
        user.address = userData['address'];
        user.id_user = uid;
        user.name = userData['name'];
        user.surname = userData['surname'];
        user.phone = userData['address'];
        this.user.next(user);
      });
    });
  }

  getUser() {
    return this.user.asObservable();
  }

  forgotPassword(email: string) {
    return sendPasswordResetEmail(this.auth, email);
  }
}
