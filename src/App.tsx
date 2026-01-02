import { useState, useEffect, useRef } from 'react'
import { ChevronDown } from 'lucide-react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import {
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useHabits } from './hooks/useHabits'
import { DarkModeToggle } from './components/DarkModeToggle'
import { AddHabitForm } from './components/AddHabitForm'
import { HabitCard } from './components/HabitCard'
import { Habit } from './types'

// Sortable Habit Card wrapper
const SortableHabitCard = ({ 
  habit, 
  selectedYear, 
  isCompleted, 
  onToggleCompletion, 
  onRemoveHabit, 
  onYearChange 
}: {
  habit: Habit
  selectedYear: number
  isCompleted: (date: Date) => boolean
  onToggleCompletion: (date: Date) => void
  onRemoveHabit: () => void
  onYearChange: (year: number) => void
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: habit.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.8 : 1,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <HabitCard
        habit={habit}
        selectedYear={selectedYear}
        isCompleted={isCompleted}
        onToggleCompletion={onToggleCompletion}
        onRemoveHabit={onRemoveHabit}
        onYearChange={onYearChange}
        dragHandleProps={listeners}
      />
    </div>
  )
}

export const App = () => {
  const { habits, addHabit, removeHabit, toggleCompletion, isCompleted, reorderHabits } = useHabits()
  
  // Drag and drop sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )
  
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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (active.id !== over?.id) {
      const oldIndex = habits.findIndex((habit) => habit.id === active.id)
      const newIndex = habits.findIndex((habit) => habit.id === over?.id)
      
      reorderHabits(arrayMove(habits, oldIndex, newIndex))
    }
  }

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
          <div className="flex items-center gap-3">
            {/* Add Habit - Desktop only */}
            <div className="hidden md:block">
              <AddHabitForm onAddHabit={addHabit} />
            </div>
            
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
            <DndContext 
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext items={habits.map(h => h.id)} strategy={verticalListSortingStrategy}>
                <div className="space-y-3">
                  {habits.map((habit) => (
                    <SortableHabitCard
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
              </SortableContext>
            </DndContext>          )}
        </div>
        
        {/* Floating Add Habit Button - Mobile only */}
        <div className="md:hidden fixed bottom-6 right-6 z-50">
          <AddHabitForm onAddHabit={addHabit} isMobile={true} />
        </div>
      </div>
    </div>
  )
}