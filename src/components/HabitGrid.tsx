interface HabitGridProps {
  habitColor: string
  isCompleted: (checkDate: Date) => boolean
  onToggleCompletion: (toggleDate: Date) => void
}

export const HabitGrid = ({ habitColor, isCompleted, onToggleCompletion }: HabitGridProps) => {
  // Get last 52 weeks of dates
  const getWeeksData = () => {
    const weeks: Date[][] = []
    const today = new Date()
    
    // Start from 51 weeks ago (52 weeks total including current week)
    const startDate = new Date(today)
    startDate.setDate(today.getDate() - (51 * 7))
    
    // Find the Sunday of that week
    const dayOfWeek = startDate.getDay()
    startDate.setDate(startDate.getDate() - dayOfWeek)
    
    // Generate 52 weeks of data
    for (let week = 0; week < 52; week++) {
      const weekDates: Date[] = []
      for (let day = 0; day < 7; day++) {
        const date = new Date(startDate)
        date.setDate(startDate.getDate() + (week * 7) + day)
        weekDates.push(date)
      }
      weeks.push(weekDates)
    }
    
    return weeks
  }

  const weeks = getWeeksData()
  const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  const getTooltipText = (date: Date): string => {
    const dateStr = date.toLocaleDateString()
    const completed = isCompleted(date)
    return `${dateStr}: ${completed ? 'Completed' : 'Not completed'}`
  }

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex flex-col gap-2 min-w-fit">
        {/* Month labels */}
        <div className="flex">
          <div className="w-8 sm:w-12 flex-shrink-0"></div> {/* Space for day labels */}
          <div className="flex gap-1">
            {weeks.map((week, weekIndex) => {
              const firstDay = week[0]
              const showMonth = firstDay.getDate() <= 7 || weekIndex === 0
              return (
                <div key={weekIndex} className="w-3 sm:w-4 text-xs text-gruvbox-fg3 text-center">
                  {showMonth ? monthLabels[firstDay.getMonth()] : ''}
                </div>
              )
            })}
          </div>
        </div>

        {/* Grid */}
        <div className="flex gap-1">
          {/* Day labels */}
          <div className="flex flex-col gap-1 w-8 sm:w-12 flex-shrink-0">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
              <div key={day} className="h-3 sm:h-4 text-xs text-gruvbox-fg3 flex items-center">
                {index % 2 === 1 ? day : ''} {/* Only show Mon, Wed, Fri */}
              </div>
            ))}
          </div>

          {/* Contribution squares */}
          <div className="flex gap-1">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-1">
                {week.map((date, dayIndex) => {
                  const isToday = date.toDateString() === new Date().toDateString()
                  const completed = isCompleted(date)
                  const isFuture = date > new Date()
                  
                  return (
                    <button
                      key={dayIndex}
                      onClick={() => !isFuture && onToggleCompletion(date)}
                      disabled={isFuture}
                      className={`
                        w-3 h-3 sm:w-4 sm:h-4 rounded-sm transition-all border
                        ${isFuture 
                          ? 'bg-gruvbox-bg1 border-gruvbox-bg2 cursor-not-allowed' 
                          : completed
                          ? 'hover:ring-1 hover:ring-offset-1 hover:ring-gruvbox-fg4 border-transparent'
                          : 'bg-gruvbox-bg border-gruvbox-bg3 hover:bg-gruvbox-bg1 hover:border-gruvbox-fg4'
                        }
                        ${isToday && !isFuture ? 'ring-1 ring-gruvbox-blue-bright' : ''}
                      `}
                      style={{
                        backgroundColor: completed && !isFuture ? habitColor : undefined,
                      }}
                      title={getTooltipText(date)}
                      aria-label={getTooltipText(date)}
                    />
                  )
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs text-gruvbox-fg3 mt-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-sm bg-gruvbox-bg border border-gruvbox-bg3"></div>
            <span>Not completed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-sm" style={{ backgroundColor: habitColor }}></div>
            <span>Completed</span>
          </div>
        </div>
      </div>
    </div>
  )
}