declare interface ActivityEntry {
  id?: number;
  title: string;
  type: ActivityType;
  time: string; // 24-hour format, e.g. "14:30"
  duration: number; // in minutes
  icon: string; // icon
  colorConfig: number; // index for colorCombos
  location: string;
  distance?: number; // in kilometers, for cardio/sport activities
  kcals?: number;
  date?: string; // ISO date string, e.g. "2024-06-01"
  description?: string; // optional description of the activity
}

declare type ActivityType =
  | "cardio"
  | "strength"
  | "sport"
  | "mobility"
  | "recovery"
  | "conditioning"
  | "mind_body";