

export type PropertyType =
  | "object"
  | "array"
  | "string"
  | "number"
  | "boolean"
  | null;


export type Variable = BaseVariable | NumberVariable | StringVariable | BooleanVariable | ArrayVariable | ObjectVariable | EnumVariable ;

export type BaseVariable = {
  name: string;
  description: string;
  type: null;
}

export type NumberVariable = Omit<BaseVariable, 'type'> & {
  type: 'number';
  value: number | null;
}

export type StringVariable = Omit<BaseVariable, 'type'>  & {
  type: 'string';
  value: string | null;
}

export type BooleanVariable =Omit<BaseVariable, 'type'>  &  {
  type: 'boolean';
  value: boolean | null;
}

export type ArrayVariable = Omit<BaseVariable, 'type'>  & {
  type: 'array';
  value: Variable[] | null;
}

export type ObjectVariable = Omit<BaseVariable, 'type'>  & {
  type: 'object';
  value: { [key: string]: Variable } | null;
}

export type EnumVariable = Omit<BaseVariable, 'type'>  & {
  type: 'enum';
  value: string | null;
  enum: string[];
}
