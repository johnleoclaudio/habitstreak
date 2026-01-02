import { useState, useEffect } from 'react'
import { Habit, HabitCompletion, HabitData } from '../types'
import { loadHabitData, saveHabitData, generateId, formatDate } from '../utils/storage'

export const useHabits = () => {
  const [data, setData] = useState<HabitData>(() => loadHabitData())

  useEffect(() => {
    saveHabitData(data)
  }, [data])

  const addHabit = (name: string, color: string): void => {
    const newHabit: Habit = {
      id: generateId(),
      name,
      color,
      createdAt: formatDate(new Date()),
      order: data.habits.length
    }
    
    setData(prev => ({
      ...prev,
      habits: [...prev.habits, newHabit]
    }))
  }

  const reorderHabits = (newOrder: Habit[]): void => {
    const habitsWithUpdatedOrder = newOrder.map((habit, index) => ({
      ...habit,
      order: index
    }))
    
    setData(prev => ({
      ...prev,
      habits: habitsWithUpdatedOrder
    }))
  }

  const removeHabit = (habitId: string): void => {
    setData(prev => ({
      habits: prev.habits.filter(h => h.id !== habitId),
      completions: prev.completions.filter(c => c.habitId !== habitId)
    }))
  }

  const toggleCompletion = (habitId: string, date: Date): void => {
    const dateStr = formatDate(date)
    const existingCompletion = data.completions.find(
      c => c.habitId === habitId && c.date === dateStr
    )

    if (existingCompletion) {
      setData(prev => ({
        ...prev,
        completions: prev.completions.filter(
          c => !(c.habitId === habitId && c.date === dateStr)
        )
      }))
    } else {
      const newCompletion: HabitCompletion = {
        habitId,
        date: dateStr
      }
      setData(prev => ({
        ...prev,
        completions: [...prev.completions, newCompletion]
      }))
    }
  }

  const isCompleted = (habitId: string, date: Date): boolean => {
    const dateStr = formatDate(date)
    return data.completions.some(
      c => c.habitId === habitId && c.date === dateStr
    )
  }

  return {
    habits: data.habits.sort((a, b) => (a.order || 0) - (b.order || 0)),
    completions: data.completions,
    addHabit,
    removeHabit,
    toggleCompletion,
    isCompleted,
    reorderHabits
  }
}