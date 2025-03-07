
export type Variable = NumberVariable | StringVariable | BooleanVariable | ArrayVariable | ObjectVariable;

export type BaseVariable = {
  name: string;
  description: string;
}

export type NumberVariable = BaseVariable & {
  type: 'number';
  value: number | null;
}

export type StringVariable = BaseVariable & {
  type: 'string';
  value: string | null;
}

export type BooleanVariable =BaseVariable &  {
  type: 'boolean';
  value: boolean | null;
}

export type ArrayVariable = BaseVariable & {
  type: 'array';
  value: Variable[] | null;
}

export type ObjectVariable = BaseVariable & {
  type: 'object';
  value: { [key: string]: Variable } | null;
}
