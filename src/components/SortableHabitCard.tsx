import { useSortable } from '@dnd-kit/sortable'
import { CSS as DNDCSS } from '@dnd-kit/utilities'
import { HabitCard } from './HabitCard'
import { Habit } from '../types'

interface SortableHabitCardProps {
  habit: Habit
  selectedYear: number
  isCompleted: (date: Date) => boolean
  onToggleCompletion: (date: Date) => void
  onEditHabit: (newName: string) => void
  onRemoveHabit: () => void
  onYearChange: (year: number) => void
}

export const SortableHabitCard = ({ 
  habit, 
  selectedYear, 
  isCompleted, 
  onToggleCompletion,
  onEditHabit,
  onRemoveHabit, 
  onYearChange
}: SortableHabitCardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: habit.id })

  const style = {
    transform: DNDCSS.Transform.toString(transform),
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
        onEditHabit={onEditHabit}
        onRemoveHabit={onRemoveHabit}
        onYearChange={onYearChange}
        dragHandleProps={listeners}
      />
    </div>
  )
}