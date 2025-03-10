import {Component, effect, inject, OnDestroy, signal} from "@angular/core";
import {FormArray, FormControl, FormGroup, FormsModule, Validators} from "@angular/forms";
import {InputComponent} from "../../shared/input/input.component";
import {KeyValuePipe} from "@angular/common";
import {SelectComponent} from "../../shared/select/select.component";
import {ShineEffectDirective} from '../../shared/directives/shine.directive';
import {NewPrompt, Prompt, Tool} from '../../models/prompt.model';
import {ActivatedRoute} from '@angular/router';
import {PropertyType, Variable} from '../../models/generic-variable.model';
import {StorageService} from '../../core/storage/storage.service';

type ViewToolType = Omit<Tool, "inputSchema" | "output"> & {
  inputSchema: {
    type: PropertyType;
    properties: Variable[];
    required: string[];
  };
  output: {
    type: PropertyType;
    properties: Variable[];
  };
}

@Component({
  selector: "app-tools",
  standalone: true,
  imports: [FormsModule, InputComponent, ShineEffectDirective, SelectComponent],
  templateUrl: "./tools.component.html",
  styleUrl: "./tools.component.scss",
})
export class ToolsComponent implements OnDestroy {
  activatedRoute = inject(ActivatedRoute);
  prompt: Prompt | undefined = undefined;
  inputTypes = ["string", "number", "boolean", "array", "object"];
  storageService = inject(StorageService);

  tools = signal<ViewToolType[]>([]);

  constructor() {
    this.activatedRoute.data.subscribe(({prompt}) => {
      this.prompt = prompt;
      if (this.prompt) {
        this.tools.set(this.prompt.tools.map(this.toViewToolType.bind(this)));
      }
    });
  }

  ngOnDestroy() {
    this.prompt!.tools = this.tools().map(this.toTool.bind(this));
    this.storageService.updateDocument(this.prompt!, 'prompts', this.prompt!.id);
  }


  dictToArray(dict: { [key: string]: {} }): { name: string }[] {
    return Object.entries(dict).map(([key, value]) => {
      return {name: key, ...value};
    });
  }

  arrayToDict(array: { name: string }[]): { [key: string]: {} } {
    return array.reduce((acc, {name, ...rest}) => {
      (acc as any)[name] = rest;
      return acc;
    }, {});
  }

  toViewToolType(tool: Tool): ViewToolType {
    return {
      ...tool,
      inputSchema: {
        ...tool.inputSchema,
        properties: this.dictToArray(tool.inputSchema.properties) as Variable[],
      },
      output: {
        ...tool.output,
        properties: this.dictToArray(tool.output.properties) as Variable[],
      },
    }
  }

  toTool(tool: ViewToolType): Tool {
    return {
      ...tool,
      inputSchema: {
        ...tool.inputSchema,
        properties: this.arrayToDict(tool.inputSchema.properties) as { [key: string]: Variable },
      },
      output: {
        ...tool.output,
        properties: this.arrayToDict(tool.output.properties) as { [key: string]: Variable },
      },
    }
  }


  addTool() {
    this.tools.update((tools) => {
      tools.push({
        name: "",
        description: "",
        inputSchema: {
          type: "object",
          properties: [],
          required: [],
        },
        output: {
          type: "object",
          properties: [
            {
              name: "",
              description: "",
              type: null,
            },
          ],
        }
      });
      return tools;
    })
  }

  deleteTool(index: number) {

    this.tools.update((tools) => {
      tools.splice(index, 1);
      return tools;
    })
  }

  addInput(tool: ViewToolType) {
    this.tools.update((tools) => {
      tools.find(t => t === tool)!.inputSchema.properties.push({
        name: "",
        description: "",
        type: null,
      });
      return tools;
    })
  }

  deleteInputProperty(toolIndex: number, $index: number) {
    this.tools.update((tools) => {
      tools[toolIndex].inputSchema.properties.splice($index, 1);
      return tools;
    })
  }


  deleteOutputProperty(toolIndex: number, $index: number) {
    this.tools.update((tools) => {
      tools[toolIndex].output.properties.splice($index, 1);
      return tools;
    })
  }
}
