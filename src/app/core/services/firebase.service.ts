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
  collectionGroup,
  getFirestore,
  addDoc,
  query,
  where,
  getDocs,
  CollectionReference,
  getDoc,
  doc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';
import {
  Category,
  Gender,
  Model,
  Product,
  ProductOrder,
} from '../models/product';

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

  /**
   * products
   */

  async getCategories(getModel: boolean = false) {
    const response = await getDocs(collection(this.querydb, 'categories'));

    const categories = await Promise.all(
      response.docs.map(async (item) => {
        const category: Category = {
          id: item.id,
          value: item.data()['code'] as string,
          label: item.data()['name'] as string,
        };

        return category;
      })
    );

    return categories as unknown as Category[];
  }

  async getModels() {
    const response = await getDocs(collectionGroup(this.querydb, 'models'));

    const models = await Promise.all(
      response.docs.map(async (model) => {
        const data: Model = {
          id: model.id,
          category_id: model.ref.parent?.parent?.id as string,
          value: model.data()['code'] as string,
          label: model.data()['name'] as string,
        };

        return data;
      })
    );

    return models;
  }

  async getGenders() {
    const response = await getDocs(collection(this.querydb, 'gender'));

    const genders = await Promise.all(
      response.docs.map(async (gender) => {
        const data: Gender = {
          id: gender.id,

          value: gender.data()['code'] as string,
          label: gender.data()['name'] as string,
        };

        return data;
      })
    );

    return genders;
  }

  async getProducts() {
    const response = await getDocs(collection(this.querydb, 'products'));

    const products = await Promise.all(
      response.docs.map(async (product) => {
        return {
          ...product.data(),
          id: product.id,
        };
      })
    );

    return products as Product[];
  }

  async getProduct(productId: string) {
    const docRef = doc(this.querydb, 'products', productId);
    const docSnap = await getDoc(docRef);

    return docSnap?.data() as Product;
  }

  async AddProduct(data: Product) {
    const productsRef: CollectionReference = collection(
      this.querydb,
      'products'
    );
    return addDoc(productsRef, data);
  }

  /**
   * orders
   */
  async AddProductOrder(data: ProductOrder) {
    const orderRef: CollectionReference = collection(this.querydb, 'orders');
    return addDoc(orderRef, data);
  }

  async getProductOrder(userId: string) {
    const q = query(
      collection(this.querydb, 'orders'),
      where('status', '==', 'in_proccess'),
      where('userId', '==', userId)
    );
    const querySnapshot = await getDocs(q);

    const productOrders = await Promise.all(
      querySnapshot.docs.map(async (order) => {
        const docRef = doc(this.querydb, 'products', order.data()['productId']);
        const docSnap = await getDoc(docRef);

        const qtyList = Array.from(
          { length: parseInt(docSnap?.data()?.['quantity'] as string) },
          (item, i) => ({
            name: i + 1,
            code: i + 1,
          })
        );

        return {
          ...order.data(),
          id: order.id,
          product: docSnap?.data(),
          quantityList: qtyList,
        };
      })
    );

    return productOrders;
  }

  async editOrder(orderId: string, data: any) {
    const orderRef = doc(collection(this.querydb, 'orders'), orderId);

    updateDoc(orderRef, {
      status: 'pending',
      ...data,
    })
      .then(() => {
        console.log('Documento actualizado correctamente');
      })
      .catch((error) => {
        console.error('Error al actualizar el documento:', error);
      });
  }
}
