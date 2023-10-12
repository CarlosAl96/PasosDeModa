import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
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
} from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private auth: any;
  private querydb: any;
  private app: any;

  constructor() {
    this.app = initializeApp(environment.firebase);
    this.auth = getAuth(this.app);
    this.querydb = getFirestore();
  }

  registerUser(user: User) {
    createUserWithEmailAndPassword(
      this.auth,
      user.email ? user.email : '',
      user.password ? user.password : ''
    ).then((userCredential) => {
      const userSaved = userCredential.user;
      this.registerDataUser(user, userSaved.uid);
    });
  }

  async registerDataUser(user: User, id: string) {
    delete user.email;
    delete user.password;
    user.id_user = id;
    await addDoc(collection(this.querydb, 'user'), user);
  }
}
