import { Routine } from "./typings.d";
export interface Routine {
  id: number;
  name: string;
  goal: string;
  updatedAt: string;
  createdAt: string;
  user: User;
}
export type Routine = {
  id: number;
  name: string;
  goal: string;
  updatedAt: string;
  createdAt: string;
};

export type Routine_Activity = {
  id: number;
  routineId: number;
  activityId: number;
  activity: Activity;
};

export type Activity = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type Routines = Routine[];
export type RoutineActivities = Routine_Activity[];
