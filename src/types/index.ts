export interface Habit {
  id: string
  name: string
  color: string
  createdAt: string
}

export interface HabitCompletion {
  habitId: string
  date: string
}

export interface HabitData {
  habits: Habit[]
  completions: HabitCompletion[]
}