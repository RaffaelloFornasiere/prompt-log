import {Component, effect, ElementRef, inject, signal, ViewChild} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ToastService} from '../../shared/toast/toast.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Prompt, PromptRecord} from '../../models/prompt.model';
import {UserSettings} from '../../models/user-settings.model';
import {StorageService} from '../../core/storage/storage.service';
import {ExpansionComponent} from '../../shared/expansion/expansion.component';
import {ShineEffectDirective} from '../../shared/directives/shine.directive';
import {HistoryComponent} from '../history/history.component';
import {HistoryService} from '../../services/history.service';
import DiffMatchPatch, {Diff} from 'diff-match-patch';


function rebuildOriginalString(finalString: string, diffs: Diff[]) {
  let result = finalString;

  // Iterate diffs in reverse order
  for (let i = diffs.length - 1; i >= 0; i--) {
    const [op, text] = diffs[i];

    if (op === 1) { // INSERT
      // Remove the inserted text
      const index = result.lastIndexOf(text);
      if (index !== -1) {
        result = result.slice(0, index) + result.slice(index + text.length);
      }
    } else if (op === -1) { // DELETE
      // Reinsert the deleted text at the correct position
      result = text + result;
    }
    // EQUAL (0) remains unchanged
  }

  return result;
}


@Component({
  selector: 'app-prompt',
  standalone: true,
  imports: [
    FormsModule,
    ExpansionComponent,
    ShineEffectDirective,
    HistoryComponent
  ],
  templateUrl: './prompt.component.html',
  styleUrl: './prompt.component.scss',
})
export class PromptComponent {
  @ViewChild('_prompt') _prompt !: ElementRef<HTMLDivElement>
  protected toastService = inject(ToastService);
  protected activatedRoute = inject(ActivatedRoute);
  protected storageService = inject(StorageService);
  protected historyService = inject(HistoryService);
  protected router = inject(Router);

  historyVisible = signal(true)
  promptHistory = signal<PromptRecord[]>([])
  activeRecord = signal<number>(0)
  prompt: Prompt | undefined = undefined;
  settings: UserSettings | undefined = undefined;


  constructor() {
    const dmp = new DiffMatchPatch();

// Example versions for demonstration.
    const original = "A quick yellow fox jumps over the lazy dog.";
    const version1 = "A quick brown fox leaps over the lazy dog.";
    const version2 = "The quick brown fox leaps over the energetic dog.";

// Create patch from original to version1.
    const diffs1 = dmp.diff_main(original, version1);
    dmp.diff_cleanupSemantic(diffs1);
    const patch1 = dmp.patch_make(original, version1, diffs1);

// Create patch from version1 to version2.
    const diffs2 = dmp.diff_main(version1, version2);
    dmp.diff_cleanupSemantic(diffs2);
    const patch2 = dmp.patch_make(version1, version2, diffs2);
    console.log("Patch 1:", patch1);
    console.log("Patch 2:", patch2);
// Combine patches into one flat array.
    const patchesHistory = [...patch1, ...patch2];

// Latest version stored separately.
    let currentVersion = version2;
    console.log("Latest version:", currentVersion);

// Function to invert a patch: flips insertions and deletions and swaps metadata.
    function invertPatch(patch: any): any {
      return {
        diffs: patch.diffs.map(([op, text]: [number, string]) => {
          if (op === 1) return [-1, text];
          if (op === -1) return [1, text];
          return [0, text];
        }),
        start1: patch.start2,
        start2: patch.start1,
        length1: patch.length2,
        length2: patch.length1
      };
    }

// Invert each patch in the history.
    const invertedPatches = patchesHistory.map(invertPatch);
    console.log("Inverted patches:", invertedPatches);

// Apply inverted patches in reverse order to reconstruct the original version.
    const reversedInvertedPatches = invertedPatches.reverse();
    for (const patch of reversedInvertedPatches) {
      const [newVersion, results] = dmp.patch_apply([patch], currentVersion);
      currentVersion = newVersion;
    }

    console.log("Reconstructed original version:", currentVersion);


    effect(() => {
      if (this.promptHistory().length == 0 || !this.prompt) return;
      console.log(this.activeRecord())
      if (this.activeRecord() == 0) {
        this.router.navigateByUrl(`/prompt/${this.prompt.id}`).then()
        return;
      }
      const record = this.promptHistory()[this.activeRecord()]
      this.router.navigateByUrl(`/prompt/${this.prompt.id}@${record.id}`).then()
    });


    this.activatedRoute.data.subscribe(({prompt}) => {
      this.prompt = prompt;
      this.historyService.getHistory(prompt.id).subscribe((history: PromptRecord[]) => {
        this.promptHistory.set(history);
      });
    });
    this.storageService.getDocument().subscribe((userSettings) => {
      this.settings = userSettings.settings;
    });


  }

  buildDelimiterStart(sectionName: string) {
    return this.settings?.delimiter.start.replace('{sectionName}', sectionName) || '';
  }

  buildDelimiterEnd(sectionName: string) {
    return this.settings?.delimiter.end.replace('{sectionName}', sectionName) || '';
  }


  copyText() {
    const clone = this._prompt.nativeElement.cloneNode(true) as HTMLElement;
    clone.querySelectorAll('[data-no-copy="true"]').forEach((el) => el.remove());
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = clone.innerText;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  protected readonly JSON = JSON;
}
