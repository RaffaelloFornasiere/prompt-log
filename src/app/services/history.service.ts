import {inject, Injectable} from '@angular/core';
import {StorageService} from '../core/storage/storage.service';
import {Prompt, PromptRecord} from '../models/prompt.model';
import {ActivatedRoute} from '@angular/router';
import {map} from 'rxjs';

@Injectable({
   providedIn: 'root'
})
export class HistoryService {
  protected storageService = inject(StorageService);

  getHistory(promptId: string){
      return this.storageService.getCollection('prompts', promptId, 'history').pipe(
         map((history: PromptRecord[]) => {
            return history.reverse();
         })
      )
  }

}
