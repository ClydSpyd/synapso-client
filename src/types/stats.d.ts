declare interface HabitCompletionStats {
  title: string;
  target: number;
  completions: string[];
}

declare interface CheckinStats {
    number_of_checkins: number;
    mood_per_day: (number | null)[];
    average_mood: number;
    average_energy_level: number;
    energy_per_day: (number | null)[];
    average_focus_level: number;
    focus_per_day: (number | null)[];
    average_stress_level: number;
    stress_per_day: (number | null)[];
}
declare interface WeekGlanceStats {
    habits: HabitCompletionStats[];
    checkins: CheckinStats;
}