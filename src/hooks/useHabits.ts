import { useState, useEffect } from 'react'
import { Habit, HabitCompletion, HabitData } from '../types'
import { loadHabitData, saveHabitData, generateId, formatDate } from '../utils/storage'
import { trackHabitEvent } from '../utils/analytics'

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
    
    // Track habit creation
    trackHabitEvent.habitAdded(name)
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
    const habit = data.habits.find(h => h.id === habitId)
    
    setData(prev => ({
      habits: prev.habits.filter(h => h.id !== habitId),
      completions: prev.completions.filter(c => c.habitId !== habitId)
    }))
    
    // Track habit deletion
    if (habit) {
      trackHabitEvent.habitDeleted(habit.name)
    }
  }

  const toggleCompletion = (habitId: string, date: Date): void => {
    const dateStr = formatDate(date)
    const existingCompletion = data.completions.find(
      c => c.habitId === habitId && c.date === dateStr
    )
    const habit = data.habits.find(h => h.id === habitId)

    if (existingCompletion) {
      setData(prev => ({
        ...prev,
        completions: prev.completions.filter(
          c => !(c.habitId === habitId && c.date === dateStr)
        )
      }))
      
      // Track habit uncompleted
      if (habit) {
        trackHabitEvent.habitUncompleted(habit.name)
      }
    } else {
      const newCompletion: HabitCompletion = {
        habitId,
        date: dateStr
      }
      setData(prev => ({
        ...prev,
        completions: [...prev.completions, newCompletion]
      }))
      
      // Track habit completed
      if (habit) {
        trackHabitEvent.habitCompleted(habit.name)
      }
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