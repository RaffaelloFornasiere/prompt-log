import {Variable} from './generic-variable.model';


export interface Example {
  title: string;
  description: string;
  content: string;
}

export interface Tool {
  name: string;
  description: string;
  arguments: Variable;
  return: Variable;
}

export interface Prompt {
  title: string;
  description: string;
  variables: Variable[];
  examples: Example[];
  tools: Tool[];
  outputFormat: Variable | null;
}
