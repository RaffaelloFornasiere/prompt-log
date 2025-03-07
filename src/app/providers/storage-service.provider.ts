import {Provider} from '@angular/core';
import {StorageService} from '../core/storage/storage.service';
import {DynamicStorageService} from '../core/storage/dynamic-storage.service';

export function provideStorageService(): Provider {
  return {
    provide: StorageService,
    useExisting: DynamicStorageService,
  };
}
