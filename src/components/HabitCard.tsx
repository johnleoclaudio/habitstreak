import { Trash2 } from 'lucide-react'
import { Habit } from '../types'
import { HabitGrid } from './HabitGrid'

interface HabitCardProps {
  habit: Habit
  selectedYear: number
  isCompleted: (checkDate: Date) => boolean
  onToggleCompletion: (toggleDate: Date) => void
  onRemoveHabit: () => void
  onYearChange?: (year: number) => void
}

export const HabitCard = ({ habit, selectedYear, isCompleted, onToggleCompletion, onRemoveHabit, onYearChange }: HabitCardProps) => {
  // Create a normalized today date (start of day)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const currentYear = today.getFullYear()
  const isCompletedToday = isCompleted(today)
  const isTodayVisible = selectedYear === currentYear

  const handleMarkToday = () => {
    onToggleCompletion(today)
    // If marking today but today's year is not currently selected, switch to current year
    if (!isTodayVisible && onYearChange) {
      onYearChange(currentYear)
    }
  }

  return (
    <div className="bg-tokyo-bg0 border border-tokyo-bg2 rounded-lg p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-sm"
            style={{ backgroundColor: habit.color }}
          />
          <h3 className="text-sm font-medium text-tokyo-fg">
            {habit.name}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleMarkToday}
            className={`
              px-3 py-1 rounded text-xs font-medium transition-colors
              ${isCompletedToday
                ? 'bg-tokyo-green/20 text-tokyo-green'
                : 'text-tokyo-bg0 hover:opacity-90'
              }
            `}
            style={!isCompletedToday ? { backgroundColor: habit.color } : {}}
          >
            {isCompletedToday ? '✓ Done' : 'Do it!'}
          </button>

          <button
            onClick={onRemoveHabit}
            className="p-1 text-tokyo-fg4 hover:text-tokyo-red transition-colors"
            aria-label={`Delete ${habit.name} habit`}
          >
            <Trash2 className="h-3 w-3" />
          </button>
        </div>
      </div>

      <HabitGrid
        habitColor={habit.color}
        selectedYear={selectedYear}
        isCompleted={isCompleted}
        onToggleCompletion={onToggleCompletion}
      />
    </div>
  )
}
