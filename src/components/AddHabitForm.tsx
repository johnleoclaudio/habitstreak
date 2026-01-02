import { useState, FormEvent } from 'react'
import { Plus } from 'lucide-react'

interface AddHabitFormProps {
  onAddHabit: (habitName: string, habitColor: string) => void
  isMobile?: boolean
}

const HABIT_COLORS = [
  '#f7768e', // tokyo red
  '#ff9e64', // tokyo orange
  '#e0af68', // tokyo yellow  
  '#9ece6a', // tokyo green
  '#73daca', // tokyo teal
  '#7aa2f7', // tokyo blue
  '#bb9af7', // tokyo purple
  '#c0caf5', // tokyo fg
]

export const AddHabitForm = ({ onAddHabit, isMobile = false }: AddHabitFormProps) => {
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
        className={`flex items-center gap-2 px-3 py-2 bg-tokyo-blue hover:bg-tokyo-blue/80 text-tokyo-bg rounded text-sm transition-colors ${
          isMobile 
            ? 'w-14 h-14 rounded-full shadow-lg hover:shadow-xl justify-center' 
            : ''
        }`}
      >
        <Plus className={isMobile ? 'h-6 w-6' : 'h-3 w-3'} />
        {!isMobile && 'Add Habit'}
      </button>
    )
  }

  return (
    <form 
      onSubmit={handleSubmit} 
      className={`bg-tokyo-bg0 p-4 rounded-lg border border-tokyo-bg2 ${
        isMobile 
          ? 'fixed bottom-24 right-6 left-6 z-40 shadow-xl max-w-sm ml-auto' 
          : ''
      }`}
    >
      <div className="space-y-3">
        <div>
          <label htmlFor="habit-name" className="block text-xs font-medium text-tokyo-fg2 mb-1">
            Habit Name
          </label>
          <input
            id="habit-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Drink 8 glasses of water"
            className="w-full px-2 py-1 text-sm border border-tokyo-bg3 rounded bg-tokyo-bg text-tokyo-fg placeholder-tokyo-fg4 focus:ring-1 focus:ring-tokyo-blue focus:border-transparent"
            autoFocus
          />
        </div>
        
        <div>
          <label className="block text-xs font-medium text-tokyo-fg2 mb-1">
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
                    ? 'border-tokyo-fg' 
                    : 'border-tokyo-bg3'
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
            className="px-4 py-1 bg-tokyo-blue hover:bg-tokyo-blue/80 disabled:bg-tokyo-bg3 disabled:cursor-not-allowed text-tokyo-bg rounded text-sm transition-colors"
          >
            Add
          </button>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="px-2 py-1 text-tokyo-fg3 hover:text-tokyo-fg text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  )
}