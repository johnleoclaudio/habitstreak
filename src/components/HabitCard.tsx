import { Trash2 } from 'lucide-react'
import { Habit } from '../types'
import { HabitGrid } from './HabitGrid'

interface HabitCardProps {
  habit: Habit
  isCompleted: (checkDate: Date) => boolean
  onToggleCompletion: (toggleDate: Date) => void
  onRemoveHabit: () => void
}

export const HabitCard = ({ habit, isCompleted, onToggleCompletion, onRemoveHabit }: HabitCardProps) => {
  const today = new Date()
  const isCompletedToday = isCompleted(today)

  return (
    <div className="bg-gruvbox-bg0 border border-gruvbox-bg2 rounded-lg p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div 
            className="w-3 h-3 rounded-sm"
            style={{ backgroundColor: habit.color }}
          />
          <h3 className="text-sm font-medium text-gruvbox-fg">
            {habit.name}
          </h3>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => onToggleCompletion(today)}
            className={`
              px-3 py-1 rounded text-xs font-medium transition-colors
              ${isCompletedToday 
                ? 'bg-gruvbox-green-dim/20 text-gruvbox-green-bright' 
                : 'bg-gruvbox-bg1 hover:bg-gruvbox-bg2 text-gruvbox-fg3'
              }
            `}
          >
            {isCompletedToday ? '✓' : 'Mark'}
          </button>
          
          <button
            onClick={onRemoveHabit}
            className="p-1 text-gruvbox-fg4 hover:text-gruvbox-red-bright transition-colors"
            aria-label={`Delete ${habit.name} habit`}
          >
            <Trash2 className="h-3 w-3" />
          </button>
        </div>
      </div>
      
      <HabitGrid
        habitColor={habit.color}
        isCompleted={isCompleted}
        onToggleCompletion={onToggleCompletion}
      />
    </div>
  )
}