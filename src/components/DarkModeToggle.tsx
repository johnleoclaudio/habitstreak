import { Moon, Sun } from 'lucide-react'
import { useDarkMode } from '../hooks/useDarkMode'

export const DarkModeToggle = () => {
  const { isDark, toggle } = useDarkMode()

  return (
    <button
      onClick={toggle}
      className="p-2 rounded-lg bg-tokyo-bg1 hover:bg-tokyo-bg2 transition-colors"
      aria-label="Toggle dark mode"
    >
      {isDark ? (
        <Sun className="h-5 w-5 text-tokyo-yellow" />
      ) : (
        <Moon className="h-5 w-5 text-tokyo-fg3" />
      )}
    </button>
  )
}