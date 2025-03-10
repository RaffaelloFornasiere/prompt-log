import {PropertyType, Variable} from './generic-variable.model';


export interface Example {
  title: string; // the title of the example
  description: string; // the description of the example
  content: string; // the content of example showcasing what the llm should do
}


export interface Tool {
  name: string;
  description: string;
  inputSchema: {
    type: PropertyType;
    properties: {
      [key: string]: Variable;
    };
    required: string[];
  };
  output: {
    type: PropertyType;
    properties: {
      [key: string]: Variable;
    };
  };
}

export interface Prompt {
  id: string ;
  title: string;
  description: string;
  taskDescription: string;
  variables: Variable[];
  examples: Example[];
  tools: Tool[];
  outputFormat: Variable | null;
}

export type NewPrompt = Omit<Prompt, 'id'>;
