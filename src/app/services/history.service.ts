import {inject, Injectable} from '@angular/core';
import {StorageService} from '../core/storage/storage.service';
import {Prompt} from '../models/prompt.model';
import {ActivatedRoute} from '@angular/router';

@Injectable({
   providedIn: 'root'
})
export class HistoryService {
  protected storageService = inject(StorageService)

  constructor() {
  }


  getHistory(promptId: string){
      return this.storageService.getCollection('prompts', promptId, 'history')
  }

}
