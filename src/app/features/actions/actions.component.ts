import { Component, effect, inject, OnDestroy } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { InputComponent } from "../../shared/input/input.component";
import { KeyValuePipe } from "@angular/common";
import { SelectComponent } from "../../shared/select/select.component";
import { PromptService } from "../service/prompt.service";

export type PropertyType =
  | "object"
  | "array"
  | "string"
  | "number"
  | "boolean"
  | null;

export type ToolType = {
  name: string;
  description: string;
  input_schema: {
    type: PropertyType;
    properties: {
      [key: string]: {
        type: PropertyType;
        enum?: string[];
        description: string;
      };
    };
    required: string[];
  };
  output: {
    type: PropertyType;
    properties: {
      [key: string]: {
        type: PropertyType;
        enum?: string[];
        description: string;
      };
    };
  };
};

export type ViewToolType = Omit<ToolType, "input_schema" | "output"> & {
  input_schema: {
    type: PropertyType;
    properties: {
      name: string;
      type: PropertyType;
      enum?: string[];
      description: string;
    }[];
    required: string[];
  };
  output: {
    type: PropertyType;
    properties: {
      name: string;
      type: PropertyType;
      enum?: string[];
      description: string;
    }[];
  };
};

@Component({
  selector: "app-actions",
  standalone: true,
  imports: [FormsModule, InputComponent, KeyValuePipe, SelectComponent],
  templateUrl: "./actions.component.html",
  styleUrl: "./actions.component.scss",
})
export class ActionsComponent implements OnDestroy {
  protected promptService = inject(PromptService);

  ngOnDestroy() {
    this.promptService.actions.set(
      this.actions.map(this.viewToolTypeToToolType.bind(this)),
    );
  }

  actions: ViewToolType[] = [
    {
      name: "action1erw",
      description: "action1 description",
      input_schema: {
        type: "object",
        properties: [
          {
            name: "prop1",
            type: "string",
            description: "prop1 description",
          },
        ],
        required: ["prop1"],
      },
      output: {
        type: "object",
        properties: [
          {
            name: "prop1",
            type: "string",
            description: "prop1 description",
          },
        ],
      },
    },
  ];

  inputTypes = ["string", "object", "number", "boolean"];

  arrayToDict(array: any[]) {
    const res: any = {};
    array.forEach((i) => {
      const iName = i.name;
      delete i.name;
      res[iName] = i;
    });
    return res;
  }

  dictToArray(dict: any) {
    const res: any = [];
    Object.entries(dict).forEach(([key, value]: [string, any]) => {
      res.push({ name: key, ...value });
    });
    return res;
  }

  viewToolTypeToToolType(action: ViewToolType): ToolType {
    return {
      ...action,
      input_schema: {
        ...action.input_schema,
        properties: this.arrayToDict(action.input_schema.properties),
      },
      output: {
        ...action.output,
        properties: this.arrayToDict(action.output.properties),
      }
    };
  }

  toolTypeToViewToolType(action: ToolType) {
    return {
      ...action,
      input_schema: {
        ...action.input_schema,
        properties: this.dictToArray(action.input_schema.properties),
      },
      output: {
        ...action.output,
        properties: this.dictToArray(action.output.properties),
      }
    };
  }

  constructor() {
    effect(() => {
      this.actions = this.promptService
        .actions()
        .map((a) => this.toolTypeToViewToolType(a));
    });
  }

  deleteAction(index: number) {
    this.actions.splice(index, 1);
  }

  addInput(action: ViewToolType) {
    action.input_schema.properties.push({
      name: "New Input",
      type: null,
      description: "",
    });
  }

  addOutput(action: ViewToolType) {
    action.output.properties.push({
      name: "New Output",
      type: null,
      description: "",
    });
  }
  updateActions(){
    this.promptService.actions.set(
      [...this.actions.map(this.viewToolTypeToToolType.bind(this))],
    );
  }

  addAction() {
    this.actions.push({
      name: "",
      description: "",
      input_schema: {
        type: "object",
        properties: [],
        required: [],
      },
      output: {
        type: "object",
        properties: [],
      },
    });
  }
}
