import { useState, FormEvent } from 'react'
import { Plus } from 'lucide-react'

interface AddHabitFormProps {
  onAddHabit: (habitName: string, habitColor: string) => void
}

const HABIT_COLORS = [
  '#fb4934', // gruvbox red bright
  '#fe8019', // gruvbox orange bright
  '#fabd2f', // gruvbox yellow bright  
  '#b8bb26', // gruvbox green bright
  '#8ec07c', // gruvbox aqua bright
  '#83a598', // gruvbox blue bright
  '#d3869b', // gruvbox purple bright
  '#cc241d', // gruvbox red dim
]

export const AddHabitForm = ({ onAddHabit }: AddHabitFormProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState('')
  const [selectedColor, setSelectedColor] = useState(HABIT_COLORS[0])

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault()
    if (name.trim()) {
      onAddHabit(name.trim(), selectedColor)
      setName('')
      setSelectedColor(HABIT_COLORS[0])
      setIsOpen(false)
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-2 bg-gruvbox-blue-bright hover:bg-gruvbox-blue-dim text-gruvbox-bg rounded text-sm transition-colors"
      >
        <Plus className="h-3 w-3" />
        Add Habit
      </button>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gruvbox-bg0 p-4 rounded-lg border border-gruvbox-bg2">
      <div className="space-y-3">
        <div>
          <label htmlFor="habit-name" className="block text-xs font-medium text-gruvbox-fg2 mb-1">
            Habit Name
          </label>
          <input
            id="habit-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Drink 8 glasses of water"
            className="w-full px-2 py-1 text-sm border border-gruvbox-bg3 rounded bg-gruvbox-bg text-gruvbox-fg placeholder-gruvbox-fg4 focus:ring-1 focus:ring-gruvbox-blue-bright focus:border-transparent"
            autoFocus
          />
        </div>
        
        <div>
          <label className="block text-xs font-medium text-gruvbox-fg2 mb-1">
            Color
          </label>
          <div className="flex gap-1">
            {HABIT_COLORS.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => setSelectedColor(color)}
                className={`w-6 h-6 rounded border-2 ${
                  selectedColor === color 
                    ? 'border-gruvbox-fg' 
                    : 'border-gruvbox-bg3'
                }`}
                style={{ backgroundColor: color }}
                aria-label={`Select ${color} color`}
              />
            ))}
          </div>
        </div>
        
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={!name.trim()}
            className="flex-1 bg-gruvbox-blue-bright hover:bg-gruvbox-blue-dim disabled:bg-gruvbox-bg3 disabled:cursor-not-allowed text-gruvbox-bg py-1 px-2 rounded text-sm transition-colors"
          >
            Add
          </button>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="px-2 py-1 text-gruvbox-fg3 hover:text-gruvbox-fg text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  )
}