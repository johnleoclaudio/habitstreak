import { useState, useEffect } from 'react'

export const useDarkMode = () => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('dark-mode')
      if (stored) {
        return JSON.parse(stored)
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    return false
  })

  useEffect(() => {
    const root = window.document.documentElement
    if (isDark) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem('dark-mode', JSON.stringify(isDark))
  }, [isDark])

  const toggle = () => setIsDark(!isDark)

  return { isDark, toggle }
}