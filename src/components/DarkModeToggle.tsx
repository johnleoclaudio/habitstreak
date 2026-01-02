import { Moon, Sun } from 'lucide-react'
import { useDarkMode } from '../hooks/useDarkMode'

export const DarkModeToggle = () => {
  const { isDark, toggle } = useDarkMode()

  return (
    <button
      onClick={toggle}
      className="p-2 rounded-lg bg-gruvbox-bg1 hover:bg-gruvbox-bg2 transition-colors"
      aria-label="Toggle dark mode"
    >
      {isDark ? (
        <Sun className="h-5 w-5 text-gruvbox-yellow-bright" />
      ) : (
        <Moon className="h-5 w-5 text-gruvbox-fg3" />
      )}
    </button>
  )
}