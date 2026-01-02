const secondWords = [
  'Streak', 'Victory', 'Champion', 'Progress', 'Success', 'Achievement', 'Milestone', 'Journey', 'Growth', 'Win',
  'Momentum', 'Evolution', 'Power', 'Force', 'Strength', 'Mastery', 'Builder', 'Forge', 'Machine', 'Engine',
  'Flow', 'Chain', 'Loop', 'Rhythm', 'Pulse', 'Cycle', 'Path', 'Route', 'Hero', 'Legend',
  'Quest', 'Mission', 'Adventure', 'Challenge', 'Goal', 'Dream', 'Daily', 'Calendar', 'Timeline', 'Clock',
  'Counter', 'Log', 'Record', 'Journal', 'Garden', 'Bloom', 'Seed', 'Root', 'Sprout', 'Hub',
  'Zone', 'Lab', 'Station', 'Dashboard', 'Monitor', 'Life', 'Mind', 'Soul', 'Way', 'Edge',
  'Core', 'Plus', 'Pro', 'Max'
]

const thirdWords = [
  'Tracker', 'Monitor', 'Logger', 'Counter', 'Recorder', 'Journal', 'Diary', 'Log', 'Builder', 'Maker',
  'Creator', 'Forge', 'Factory', 'Workshop', 'Studio', 'Lab', 'Manager', 'Keeper', 'Organizer', 'Planner',
  'System', 'Dashboard', 'Hub', 'Station', 'Progress', 'Journey', 'Path', 'Quest', 'Mission', 'Adventure',
  'Challenge', 'Champion', 'Master', 'Hero', 'Legend', 'Winner', 'Achiever', 'App', 'Tool', 'Companion',
  'Buddy', 'Pal', 'Guide', 'Coach', 'Mentor'
]

const getRandomWord = (words: string[]): string => {
  return words[Math.floor(Math.random() * words.length)]
}

export const getRandomSecondWord = (): string => {
  return getRandomWord(secondWords)
}

export const getRandomThirdWord = (): string => {
  return getRandomWord(thirdWords)
}

export const generateRandomTitle = (): string => {
  const secondWord = getRandomSecondWord()
  const thirdWord = getRandomThirdWord()
  return `Habit ${secondWord} ${thirdWord}`
}