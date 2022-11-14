import { Routine } from "./typings.d";
export interface Routine {
  id: number;
  name: string;
  goal: string;
  updatedAt: string;
  createdAt: string;
  user: {
    id: string;
    username: string;
  };
}
export type Routines = Routine[];
