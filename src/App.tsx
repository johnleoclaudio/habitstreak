import { useState, useEffect, useRef } from 'react'
import { ChevronDown } from 'lucide-react'
import { useHabits } from './hooks/useHabits'
import { DarkModeToggle } from './components/DarkModeToggle'
import { AddHabitForm } from './components/AddHabitForm'
import { HabitCard } from './components/HabitCard'

export const App = () => {
  const { habits, addHabit, removeHabit, toggleCompletion, isCompleted } = useHabits()
  
  // Year selector state
  const currentYear = new Date().getFullYear()
  const [selectedYear, setSelectedYear] = useState(currentYear)
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsYearDropdownOpen(false)
      }
    }

    if (isYearDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isYearDropdownOpen])
  
  // Generate available years (last 5 years + current year + next year)
  const getAvailableYears = (): number[] => {
    const years: number[] = []
    for (let i = currentYear - 5; i <= currentYear + 1; i++) {
      years.push(i)
    }
    return years.reverse() // Most recent first
  }
  
  const availableYears = getAvailableYears()

  return (
    <div className="min-h-screen bg-tokyo-bg transition-colors">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-tokyo-fg">
              Habit Streak Tracker
            </h1>
            <p className="text-tokyo-fg3 text-sm mt-1">
              Track your daily habits and build lasting streaks
            </p>
          </div>
          <DarkModeToggle />
        </header>

        {/* Global Year Selector */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-sm text-tokyo-fg3">Year:</span>
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsYearDropdownOpen(!isYearDropdownOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-tokyo-bg1 hover:bg-tokyo-bg2 border border-tokyo-bg3 rounded-md text-tokyo-fg transition-colors"
            >
              <span className="font-medium">{selectedYear}</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${isYearDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isYearDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 bg-tokyo-bg1 border border-tokyo-bg3 rounded-md shadow-lg z-10 min-w-full">
                {availableYears.map((year) => (
                  <button
                    key={year}
                    onClick={() => {
                      setSelectedYear(year)
                      setIsYearDropdownOpen(false)
                    }}
                    className={`
                      w-full px-4 py-2 text-left hover:bg-tokyo-bg2 transition-colors
                      ${year === selectedYear ? 'bg-tokyo-bg2 text-tokyo-blue' : 'text-tokyo-fg'}
                      ${year === availableYears[0] ? 'rounded-t-md' : ''}
                      ${year === availableYears[availableYears.length - 1] ? 'rounded-b-md' : ''}
                    `}
                  >
                    {year}
                    {year === currentYear && (
                      <span className="ml-2 text-xs text-tokyo-fg3">(current)</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <AddHabitForm onAddHabit={addHabit} />
          
          {habits.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-tokyo-fg4 mb-2">
                No habits yet
              </div>
              <p className="text-tokyo-fg3 text-sm">
                Add your first habit to start tracking your progress
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {habits.map((habit) => (
                <HabitCard
                  key={habit.id}
                  habit={habit}
                  selectedYear={selectedYear}
                  isCompleted={(date: Date) => isCompleted(habit.id, date)}
                  onToggleCompletion={(date: Date) => toggleCompletion(habit.id, date)}
                  onRemoveHabit={() => removeHabit(habit.id)}
                  onYearChange={setSelectedYear}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}