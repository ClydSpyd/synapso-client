declare interface HabitPayload {
  title: string;
  description: string;
  icon: string;
  target: number;
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
}
