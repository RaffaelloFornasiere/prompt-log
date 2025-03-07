import {Observable} from 'rxjs';
import {InjectionToken} from '@angular/core';

export abstract class StorageService {
  abstract getDocument(...pathSegments: string[]): Observable<any | null>;
  abstract updateDocument(data: any, ...pathSegments: string[]): Observable<any>;
  abstract addDocument(data: any, ...pathSegments: string[]): Observable<any>;
  abstract setDocument(data: any, id:string, ...pathSegments: string[]): Observable<any>;
  abstract deleteDocument(...pathSegments: string[]): Observable<void>;
  abstract getCollection(...pathSegments: string[]): Observable<any[]>;

  // abstract setCollection(data: any[], ...pathSegments: string[]): Observable<any[]>;
  // abstract deleteCollection(...pathSegments: string[]): Observable<void>;
}
