import {Injectable, OnDestroy} from '@angular/core';
import {StorageService} from './storage.service';
import {Observable, Subscription} from 'rxjs';
import {FirestoreStorageService} from './firestore-storage.service';
import {LocalStorageService} from './local-storage.service';
import {AuthService} from '../../auth/auth.service';



@Injectable({providedIn: 'root'})
export class DynamicStorageService implements StorageService, OnDestroy{
  private currentService: StorageService;
  private authSub: Subscription;

  constructor(
    private firestore: FirestoreStorageService,
    private localStorage: LocalStorageService,
    private authService: AuthService
  ) {
    this.currentService = this.localStorage; // Default to LocalStorage
    this.authSub = this.authService.user$.subscribe(user => {
      this.currentService = user ? this.firestore : this.localStorage;
    });
  }

  getDocument(...path: string[]) { return this.currentService.getDocument(...path); }
  updateDocument(data: any, ...path: string[] ) { return this.currentService.updateDocument(data, ...path); }
  addDocument( data: any, ...path: string[]) { return this.currentService.addDocument(data, ...path); }
  getCollection(...path: string[]) { return this.currentService.getCollection(...path); }
  deleteDocument(...path: string[]) { return this.currentService.deleteDocument(...path); }
  setDocument(data: any, id: string, ...path:string[]) { return this.currentService.setDocument(data, id, ...path); }


  ngOnDestroy() {
    this.authSub.unsubscribe();
  }


}
