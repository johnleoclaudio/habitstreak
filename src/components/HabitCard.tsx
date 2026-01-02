import React, { useState, useRef, useEffect } from 'react'
import { Trash2, GripVertical } from 'lucide-react'
import { Habit } from '../types'
import { HabitGrid } from './HabitGrid'

interface HabitCardProps {
  habit: Habit
  selectedYear: number
  isCompleted: (checkDate: Date) => boolean
  onToggleCompletion: (toggleDate: Date) => void
  onEditHabit: (newName: string) => void
  onRemoveHabit: () => void
  onYearChange?: (year: number) => void
  dragHandleProps?: any
}

export const HabitCard = ({ habit, selectedYear, isCompleted, onToggleCompletion, onEditHabit, onRemoveHabit, onYearChange, dragHandleProps }: HabitCardProps) => {
  const [isInEditMode, setIsInEditMode] = useState(false) // Individual edit mode for this habit
  const [isEditingText, setIsEditingText] = useState(false) // For text editing
  const [editName, setEditName] = useState(habit.name)
  const inputRef = useRef<HTMLInputElement>(null)

  // Focus input when entering edit mode
  useEffect(() => {
    if (isEditingText && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditingText])

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

  const handleEditSave = () => {
    const trimmedName = editName.trim()
    if (trimmedName && trimmedName !== habit.name) {
      onEditHabit(trimmedName)
    }
    setIsEditingText(false)
  }

  const handleEditCancel = () => {
    setIsEditingText(false)
    setEditName(habit.name)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleEditSave()
    } else if (e.key === 'Escape') {
      handleEditCancel()
    }
  }

  // Update local state when habit name changes from parent
  useEffect(() => {
    setEditName(habit.name)
  }, [habit.name])

  return (
    <div 
      className={`bg-tokyo-bg0 border border-tokyo-bg2 rounded-lg p-6 space-y-4 ${
        isInEditMode ? 'cursor-grab active:cursor-grabbing select-none' : ''
      }`}
      {...(isInEditMode ? dragHandleProps : {})}
      style={isInEditMode ? { touchAction: 'none' } : {}}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 flex-1">
          <div
            className="w-3 h-3 rounded-sm flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
            style={{ backgroundColor: habit.color }}
            onClick={(e) => {
              e.stopPropagation()
              setIsInEditMode(!isInEditMode)
            }}
            title="Click to toggle edit mode"
          />
          {isEditingText ? (
            <input
              ref={inputRef}
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={handleEditSave}
              className="flex-1 text-sm font-medium bg-tokyo-bg border border-tokyo-bg3 rounded px-2 py-1 text-tokyo-fg focus:ring-1 focus:ring-tokyo-blue focus:border-transparent"
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <h3 
              className="text-sm font-medium text-tokyo-fg cursor-pointer hover:text-tokyo-blue transition-colors flex-1"
              onClick={(e) => {
                e.stopPropagation()
                setIsEditingText(true)
              }}
              title="Click to edit name"
            >
              {habit.name}
            </h3>
          )}
        </div>

        <div className="flex items-center gap-2">
          {!isInEditMode && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleMarkToday()
              }}
              className={`
                px-3 py-1 rounded text-xs font-medium transition-colors
                ${isCompletedToday
                  ? 'bg-tokyo-green/20 text-tokyo-green'
                  : 'text-gray-900 hover:opacity-90'
                }
              `}
              style={!isCompletedToday ? { backgroundColor: habit.color } : {}}
            >
              {isCompletedToday ? '✓ Done' : 'Do it!'}
            </button>
          )}

          {isInEditMode && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onRemoveHabit()
                }}
                className="p-1 text-tokyo-fg4 hover:text-tokyo-red transition-colors"
                aria-label={`Delete ${habit.name} habit`}
              >
                <Trash2 className="h-3 w-3" />
              </button>

              <div
                className="p-1 text-tokyo-fg4 hover:text-tokyo-fg transition-colors"
                aria-label="Drag handle indicator"
              >
                <GripVertical className="h-4 w-4" />
              </div>
            </>
          )}
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
