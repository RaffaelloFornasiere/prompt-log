
export type Variable = NumberVariable | StringVariable | BooleanVariable | ArrayVariable | ObjectVariable;

export type NumberVariable = {
  name: string;
  type: 'number';
  value: number;
}

export type StringVariable = {
  name: string;
  type: 'string';
  value: string;
}

export type BooleanVariable = {
  name: string;
  type: 'boolean';
  value: boolean;
}

export type ArrayVariable = {
  name: string;
  type: 'array';
  value: Variable[];
}

export type ObjectVariable = {
  name: string;
  type: 'object';
  value: { [key: string]: Variable };
}
