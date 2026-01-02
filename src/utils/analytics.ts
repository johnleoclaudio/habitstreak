declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

// Google Analytics tracking functions
export const GA_TRACKING_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || '' // Get from environment variable

export const pageview = (url: string) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    })
  }
}

export const sendEvent = ({ action, category, label, value }: {
  action: string
  category: string
  label?: string
  value?: number
}) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Habit-specific tracking events
export const trackHabitEvent = {
  habitAdded: (habitName: string) => sendEvent({
    action: 'habit_added',
    category: 'habits',
    label: habitName,
  }),
  
  habitEdited: (oldName: string, newName: string) => sendEvent({
    action: 'habit_edited',
    category: 'habits',
    label: `${oldName} → ${newName}`,
  }),
  
  habitCompleted: (habitName: string) => sendEvent({
    action: 'habit_completed',
    category: 'habits',
    label: habitName,
  }),
  
  habitUncompleted: (habitName: string) => sendEvent({
    action: 'habit_uncompleted',
    category: 'habits',
    label: habitName,
  }),
  
  habitDeleted: (habitName: string) => sendEvent({
    action: 'habit_deleted',
    category: 'habits',
    label: habitName,
  }),
  
  yearChanged: (year: number) => sendEvent({
    action: 'year_changed',
    category: 'navigation',
    value: year,
  }),
  
  darkModeToggled: (enabled: boolean) => sendEvent({
    action: 'dark_mode_toggled',
    category: 'ui',
    label: enabled ? 'enabled' : 'disabled',
  }),
}