
export interface Server {
  name: string;
  baseUrl: string;
  modelName: string;
  apiKey: string;
  active: boolean;
}

export type Block = "task-description" | "examples" | "tools"

export interface UserSettings{
  delimiter: {
    start: string;
    end: string;
    name: string;
  };
  impersonate: string | null;
  servers: Server[];
  blocksOrder?: [Block, Block, Block];
}
