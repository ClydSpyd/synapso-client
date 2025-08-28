declare interface HabitPayload {
  id: string;
  title: string;
  description: string;
  icon: string;
  target: number;
  colorScheme: number;
}

declare interface Habit {
  id: string;
  title: string;
  description: string;
  icon: string;
  target: number;
  createdAt: Date;
  updatedAt: Date;
  user: number;
  colorScheme: number;
}

declare type HabitActivity = Habit & {
  records: string[];
};
