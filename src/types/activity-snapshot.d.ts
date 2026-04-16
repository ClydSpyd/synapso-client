declare interface ActivityEntry {
  title: string;
  type: ActivityType;
  time: string; // 24-hour format, e.g. "14:30"
  duration: number; // in minutes
  icon: string; // icon
  colorConfig: number; // index for colorCombos
  distance?: number; // in kilometers, for cardio/sport activities
  location?: string;
  kcals?: number;
}

declare type ActivityType =
  | "cardio"
  | "strength"
  | "sport"
  | "mobility"
  | "recovery"
  | "conditioning"
  | "mind_body";