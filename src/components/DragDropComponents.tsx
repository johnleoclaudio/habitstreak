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
import { SortableHabitCard } from './SortableHabitCard'
import { Habit } from '../types'

interface DragDropComponentsProps {
  habits: Habit[]
  selectedYear: number
  isCompleted: (habitId: string, date: Date) => boolean
  toggleCompletion: (habitId: string, date: Date) => void
  editHabit: (habitId: string, newName: string) => void
  removeHabit: (habitId: string) => void
  reorderHabits: (habits: Habit[]) => void
  setSelectedYear: (year: number) => void
}

export const DragDropComponents = ({
  habits,
  selectedYear,
  isCompleted,
  toggleCompletion,
  editHabit,
  removeHabit,
  reorderHabits,
  setSelectedYear
}: DragDropComponentsProps) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (active.id !== over?.id) {
      const oldIndex = habits.findIndex((habit) => habit.id === active.id)
      const newIndex = habits.findIndex((habit) => habit.id === over?.id)
      
      reorderHabits(arrayMove(habits, oldIndex, newIndex))
    }
  }

  return (
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
              onEditHabit={(newName: string) => editHabit(habit.id, newName)}
              onRemoveHabit={() => removeHabit(habit.id)}
              onYearChange={setSelectedYear}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  )
}