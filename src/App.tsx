import { useHabits } from './hooks/useHabits'
import { DarkModeToggle } from './components/DarkModeToggle'
import { AddHabitForm } from './components/AddHabitForm'
import { HabitCard } from './components/HabitCard'

export const App = () => {
  const { habits, addHabit, removeHabit, toggleCompletion, isCompleted } = useHabits()

  return (
    <div className="min-h-screen bg-gruvbox-bg transition-colors">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gruvbox-fg">
              Habit Streak Tracker
            </h1>
            <p className="text-gruvbox-fg3 text-sm mt-1">
              Track your daily habits and build lasting streaks
            </p>
          </div>
          <DarkModeToggle />
        </header>

        <div className="space-y-4">
          <AddHabitForm onAddHabit={addHabit} />
          
          {habits.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gruvbox-fg4 mb-2">
                No habits yet
              </div>
              <p className="text-gruvbox-fg3 text-sm">
                Add your first habit to start tracking your progress
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {habits.map((habit) => (
                <HabitCard
                  key={habit.id}
                  habit={habit}
                  isCompleted={(date: Date) => isCompleted(habit.id, date)}
                  onToggleCompletion={(date: Date) => toggleCompletion(habit.id, date)}
                  onRemoveHabit={() => removeHabit(habit.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}