interface HabitGridProps {
  habitColor: string
  selectedYear: number
  isCompleted: (checkDate: Date) => boolean
  onToggleCompletion: (toggleDate: Date) => void
}

export const HabitGrid = ({ habitColor, selectedYear, isCompleted, onToggleCompletion }: HabitGridProps) => {
  
  // Get weeks data for the selected year only
  const getYearWeeksData = (year: number): Date[][] => {
    const weeks: Date[][] = []
    const yearStart = new Date(year, 0, 1) // January 1st
    const yearEnd = new Date(year, 11, 31) // December 31st
    
    // Find the Sunday before or on the year start
    const firstSunday = new Date(yearStart)
    const dayOfWeek = yearStart.getDay()
    firstSunday.setDate(yearStart.getDate() - dayOfWeek)
    
    // Generate weeks for this year
    let currentDate = new Date(firstSunday)
    
    while (currentDate <= yearEnd) {
      const weekDates: Date[] = []
      for (let day = 0; day < 7; day++) {
        const date = new Date(currentDate)
        date.setDate(currentDate.getDate() + day)
        // Normalize to start of day
        date.setHours(0, 0, 0, 0)
        weekDates.push(date)
      }
      weeks.push(weekDates)
      currentDate.setDate(currentDate.getDate() + 7)
    }
    
    return weeks
  }

  const weeks = getYearWeeksData(selectedYear)
  const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  const getTooltipText = (date: Date): string => {
    const dateStr = date.toLocaleDateString()
    const completed = isCompleted(date)
    return `${dateStr}: ${completed ? 'Completed' : 'Not completed'}`
  }

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex flex-col gap-4">
        {/* Grid container */}
        <div className="flex flex-col gap-2 min-w-fit">
          {/* Month labels */}
          <div className="flex">
            <div className="w-8 sm:w-12 flex-shrink-0"></div> {/* Space for day labels */}
            <div className="flex gap-1">
              {weeks.map((week, weekIndex) => {
                const firstDay = week[0]
                const showMonth = firstDay.getDate() <= 7 || weekIndex === 0
                return (
                  <div key={weekIndex} className="w-3 sm:w-4 text-xs text-tokyo-fg3 text-center">
                    {showMonth && firstDay.getFullYear() === selectedYear ? monthLabels[firstDay.getMonth()] : ''}
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
                <div key={day} className="h-3 sm:h-4 text-xs text-tokyo-fg3 flex items-center">
                  {index % 2 === 1 ? day : ''} {/* Only show Mon, Wed, Fri */}
                </div>
              ))}
            </div>

            {/* Contribution squares */}
            <div className="flex gap-1">
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-1">
                  {week.map((date, dayIndex) => {
                    // Create normalized today for comparison
                    const today = new Date()
                    today.setHours(0, 0, 0, 0)
                    
                    const isToday = date.getTime() === today.getTime()
                    const completed = isCompleted(date)
                    const isFuture = date > today
                    const isSelectedYear = date.getFullYear() === selectedYear
                    
                    return (
                      <button
                        key={dayIndex}
                        onClick={() => !isFuture && onToggleCompletion(date)}
                        disabled={isFuture || !isSelectedYear}
                        className={`
                          w-3 h-3 sm:w-4 sm:h-4 rounded-sm transition-all border
                          ${isFuture 
                            ? 'bg-tokyo-bg1 border-tokyo-bg2 cursor-not-allowed' 
                            : !isSelectedYear
                            ? 'bg-tokyo-bg1 border-tokyo-bg2 opacity-30 cursor-not-allowed'
                            : completed
                            ? 'hover:ring-1 hover:ring-offset-1 hover:ring-tokyo-fg4 border-transparent'
                            : 'bg-tokyo-bg border-tokyo-bg3 hover:bg-tokyo-bg1 hover:border-tokyo-fg4'
                          }
                          ${isToday && !isFuture ? 'ring-1 ring-tokyo-blue' : ''}
                        `}
                        style={{
                          backgroundColor: completed && !isFuture && isSelectedYear ? habitColor : undefined,
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
        </div>
      </div>
    </div>
  )
}