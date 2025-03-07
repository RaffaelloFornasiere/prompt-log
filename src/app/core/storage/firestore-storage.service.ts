import {inject, Injectable} from '@angular/core';
import {StorageService} from './storage.service';
import {
    addDoc,
    collection,
    collectionData,
    deleteDoc,
    doc,
    docData,
    Firestore,
    setDoc,
    updateDoc
} from '@angular/fire/firestore';

import {Observable} from 'rxjs';
import {AuthService} from '../../auth/auth.service';
import {fromPromise} from 'rxjs/internal/observable/innerFrom';

@Injectable({providedIn: 'root'})
export class FirestoreStorageService extends StorageService {
    firestore = inject(Firestore)
    authService = inject(AuthService)

    getDocument(...pathSegments: string[]): Observable<any | null> {
        const user = this.authService.user()
        if (!user) throw new Error('User not authenticated')
        const docRef = doc(this.firestore, 'users', user.uid, ...pathSegments)
        return docData(docRef, {idField: 'id'}) as Observable<any | null>
    }

    getCollection(...pathSegments: string[]): Observable<any[]> {
        const user = this.authService.user()
        if (!user) throw new Error('User not authenticated')
        const collectionRef = collection(this.firestore, 'users', user.uid, ...pathSegments)
        return collectionData(collectionRef, {idField: 'id'}) as Observable<any[]>
    }

    updateDocument(data: any, ...pathSegments: string[]): Observable<any> {
        const user = this.authService.user()
        if (!user) throw new Error('User not authenticated')
        const docRef = doc(this.firestore, 'users', user.uid, ...pathSegments)
        return fromPromise(updateDoc(docRef, data)) as unknown as Observable<any>
    }

    addDocument(data: any, ...pathSegments: string[]): Observable<any> {
        const user = this.authService.user()
        if (!user) throw new Error('User not authenticated')
        const collectionRef = collection(this.firestore, 'users', user.uid, ...pathSegments)
        return fromPromise(addDoc(collectionRef, data)) as unknown as Observable<any>
    }

    setDocument(data: any, id: string, ...pathSegments: string[]): Observable<any> {
        const user = this.authService.user()
        if (!user) throw new Error('User not authenticated')
        const docRef = doc(this.firestore, 'users', user.uid, ...pathSegments, id)
        return fromPromise(setDoc(docRef, data)) as unknown as Observable<any>
    }

    deleteDocument(...pathSegments: string[]): Observable<void> {
        const user = this.authService.user()
        if (!user) throw new Error('User not authenticated')
        const docRef = doc(this.firestore, 'users', user.uid, ...pathSegments)
        return fromPromise(deleteDoc(docRef)) as unknown as Observable<void>
    }

}
