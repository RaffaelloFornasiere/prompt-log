import {Injectable} from '@angular/core';
import {StorageService} from './storage.service';
import {Observable, of} from 'rxjs';

@Injectable({providedIn: 'root'})
export class LocalStorageService extends StorageService {
    private storage = localStorage;
    readonly stateName = 'state';

    constructor() {
        super();
        this.storage.setItem(this.stateName, JSON.stringify({}));
    }

    getState(){
        return JSON.parse(this.storage.getItem(this.stateName) ?? '{}');
    }

    getSync(...pathSegments: string[]): any | null {
        return pathSegments.reduce((acc, pathSegment) => {
            return acc[pathSegment];
        }, this.getState());
    }

    getDocument(...pathSegments: string[]): Observable<any | null> {
        return of(this.getSync(...pathSegments));
    }

    setSync(data: any, ...pathSegments: string[]): any {
        const path = pathSegments.slice(0, -1);
        const state = this.getState();
        path.reduce((acc, pathSegment, index) => {
            if (!acc[pathSegment])
                acc[pathSegment] = {};
            if (index === path.length - 1)
                acc[pathSegment] = data;
            return acc[pathSegment];
        }, state);
        this.storage.setItem(this.stateName, JSON.stringify(state));
        return data
    }

    updateDocument(data: any, ...pathSegments: string[]): Observable<any> {
        return of(this.setSync(data, ...pathSegments));
    }

    addDocument(data: any, ...pathSegments: string[]): Observable<any> {
        return of(this.setSync(data, ...pathSegments));
    }

    override setDocument(data: any, id: string, ...pathSegments: string[]): Observable<any> {
        return of(this.setSync(data, ...pathSegments, id));
    }

    deleteSync(...pathSegments: string[]): void {
        const path = pathSegments.slice(0, -1);
        const state = this.getState();
        path.reduce((acc, pathSegment, index) => {
            if (!acc[pathSegment])
                acc[pathSegment] = {};
            if (index === path.length - 1)
                delete acc[pathSegment];
            return acc[pathSegment];
        }, state);
        this.storage.setItem(this.stateName, JSON.stringify(state));
    }
    deleteDocument(...pathSegments: string[]): Observable<void> {
        this.deleteSync(...pathSegments);
        return of(undefined);
    }

    getCollection(...pathSegments: string[]): Observable<any[]> {
        return of(this.getSync(...pathSegments) ?? []);
    }

}
