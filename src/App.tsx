import { useState, useEffect, useRef, lazy, Suspense } from 'react'
import { ChevronDown } from 'lucide-react'
import { useHabits } from './hooks/useHabits'
import { DarkModeToggle } from './components/DarkModeToggle'
import { AddHabitForm } from './components/AddHabitForm'
import { HabitCard } from './components/HabitCard'
import { GoogleAnalytics } from './components/GoogleAnalytics'
import { trackHabitEvent } from './utils/analytics'

const DragDropComponents = lazy(() => 
  import('./components/DragDropComponents').then(module => ({
    default: module.DragDropComponents
  }))
)

export const App = () => {
  const { habits, addHabit, editHabit, removeHabit, toggleCompletion, isCompleted, reorderHabits } = useHabits()
  
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
      <GoogleAnalytics />
      <div className="max-w-5xl mx-auto px-4 py-6 pb-24 md:pb-6">
        <header className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-tokyo-fg">
                Habit Streak Tracker
              </h1>
              <p className="text-tokyo-fg3 text-sm mt-1">
                Track your daily habits and build lasting streaks
              </p>
            </div>
            {/* Desktop controls */}
            <div className="hidden md:flex items-center gap-3">
              <AddHabitForm onAddHabit={addHabit} />
              
              {/* Year Selector */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsYearDropdownOpen(!isYearDropdownOpen)}
                  className="flex items-center gap-1 px-2 py-1 text-sm text-tokyo-fg3 hover:text-tokyo-fg transition-colors"
                >
                  <span>{selectedYear}</span>
                  <ChevronDown className={`h-3 w-3 transition-transform ${isYearDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isYearDropdownOpen && (
                  <div className="absolute top-full right-0 mt-1 bg-tokyo-bg1 border border-tokyo-bg3 rounded-md shadow-lg z-10 min-w-full">
                    {availableYears.map((year) => (
                      <button
                        key={year}
                        onClick={() => {
                          setSelectedYear(year)
                          setIsYearDropdownOpen(false)
                          trackHabitEvent.yearChanged(year)
                        }}
                        className={`
                          w-full px-3 py-1 text-sm text-left hover:bg-tokyo-bg2 transition-colors
                          ${year === selectedYear ? 'bg-tokyo-bg2 text-tokyo-blue' : 'text-tokyo-fg'}
                          ${year === availableYears[0] ? 'rounded-t-md' : ''}
                          ${year === availableYears[availableYears.length - 1] ? 'rounded-b-md' : ''}
                        `}
                      >
                        {year}
                        {year === currentYear && (
                          <span className="ml-1 text-xs text-tokyo-fg4">(current)</span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <DarkModeToggle />
            </div>
          </div>
        </header>

        <div className="space-y-4">
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
            <Suspense fallback={
              <div className="space-y-3">
                {habits.map((habit) => (
                  <HabitCard
                    key={habit.id}
                    habit={habit}
                    selectedYear={selectedYear}
                    isCompleted={(date: Date) => isCompleted(habit.id, date)}
                    onToggleCompletion={(date: Date) => toggleCompletion(habit.id, date)}
                    onEditHabit={(newName: string) => editHabit(habit.id, newName)}
                    onRemoveHabit={() => removeHabit(habit.id)}
                    onYearChange={setSelectedYear}
                  />
                ))}
              </div>
            }>
              <DragDropComponents
                habits={habits}
                selectedYear={selectedYear}
                isCompleted={isCompleted}
                toggleCompletion={toggleCompletion}
                editHabit={editHabit}
                removeHabit={removeHabit}
                reorderHabits={reorderHabits}
                setSelectedYear={setSelectedYear}
              />
            </Suspense>
          )}
        </div>
        
        {/* Floating Add Habit Button - Mobile only */}
        <div className="md:hidden fixed bottom-20 right-6 z-50">
          <AddHabitForm onAddHabit={addHabit} isMobile={true} />
        </div>
        
        {/* Mobile Footer with Year Picker and Dark Mode Toggle */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-tokyo-bg1 border-t border-tokyo-bg3 px-4 py-3 z-40">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            {/* Year Selector */}
            <div className="relative">
              <button
                onClick={() => setIsYearDropdownOpen(!isYearDropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 text-sm text-tokyo-fg3 hover:text-tokyo-fg transition-colors bg-tokyo-bg2 rounded-md"
              >
                <span>Year: {selectedYear}</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${isYearDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isYearDropdownOpen && (
                <div className="absolute bottom-full left-0 mb-2 bg-tokyo-bg1 border border-tokyo-bg3 rounded-md shadow-lg z-50 min-w-full max-h-48 overflow-y-auto">
                  {availableYears.map((year) => (
                    <button
                      key={year}
                      onClick={() => {
                        setSelectedYear(year)
                        setIsYearDropdownOpen(false)
                        trackHabitEvent.yearChanged(year)
                      }}
                      className={`
                        w-full px-3 py-2 text-sm text-left hover:bg-tokyo-bg2 transition-colors
                        ${year === selectedYear ? 'bg-tokyo-bg2 text-tokyo-blue' : 'text-tokyo-fg'}
                        ${year === availableYears[0] ? 'rounded-t-md' : ''}
                        ${year === availableYears[availableYears.length - 1] ? 'rounded-b-md' : ''}
                      `}
                    >
                      {year}
                      {year === currentYear && (
                        <span className="ml-2 text-xs text-tokyo-fg4">(current)</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <DarkModeToggle />
          </div>
        </div>
      </div>
    </div>
  )
}