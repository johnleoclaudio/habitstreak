import { HabitData } from '../types'

const STORAGE_KEY = 'habitstreak-data'

export const loadHabitData = (): HabitData => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const data = JSON.parse(stored)
      // Migrate old data without order field
      if (data.habits) {
        data.habits = data.habits.map((habit: any, index: number) => ({
          ...habit,
          order: habit.order !== undefined ? habit.order : index
        }))
      }
      return data
    }
  } catch (error) {
    console.error('Failed to load habit data:', error)
  }
  
  return {
    habits: [],
    completions: []
  }
}

export const saveHabitData = (data: HabitData): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (error) {
    console.error('Failed to save habit data:', error)
  }
}

export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0]
}

export const generateId = (): string => {
  return crypto.randomUUID()
}

export const getDateRange = (days: number): Date[] => {
  const dates: Date[] = []
  const today = new Date()
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(today.getDate() - i)
    dates.push(date)
  }
  
  return dates
}