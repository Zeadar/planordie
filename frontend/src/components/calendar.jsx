import React from "react"
import "./calendar.css"

function Title(titles) {
    const spans = titles.map((t) => (
        <span>
            <br />
            {t}
        </span>
    ))
    return spans
}

const Calendar = ({ tasks }) => {
    // const today = new Date(2024, 8, 1)
    const today = new Date()
    const daysThisMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()
    let firstWeekday = new Date(today.getFullYear(), today.getMonth(), 1).getDay()
    if (firstWeekday == 0) {
        firstWeekday = 7
    }
    const taskMap = new Map()
    tasks.forEach((t) => {
        const due = t.due
        const sDue = `${due.getFullYear()}${due.getMonth()}${due.getDate()}`
        taskMap.set(sDue, taskMap.get(sDue) ? taskMap.get(sDue).concat([t.title]) : [t.title])
    })

    function days() {
        return Array(42)
            .fill(null)
            .map((_, i) => i + 1)
            .map((slot) => {
                if (slot < firstWeekday) {
                    return <div className="cell unavailable"></div>
                }

                const displayDate = slot - firstWeekday + 1

                if (displayDate > daysThisMonth) {
                    return <div className="cell unavailable"></div>
                }

                const searchDate = `${today.getFullYear()}${today.getMonth()}${displayDate}`
                const titlesThisDay = taskMap.get(searchDate) ?? []

                if (displayDate == today.getDate()) {
                    return (
                        <div className="cell today">
                            {displayDate}
                            {Title(titlesThisDay)}
                        </div>
                    )
                }

                return (
                    <div className="cell">
                        <span style={{ color: "whitesmoke" }}>{displayDate}</span>
                        {Title(titlesThisDay)}
                    </div>
                )
            })
    }

    return (
        <div className="calendar">
            <div className="month">
                <div>&#10094;</div>
                <div>
                    {today.getFullYear()}-{today.getMonth() + 1}
                </div>
                <div>&#10095;</div>
            </div>

            <div className="weekdays">
                <div className="weekday">Monday</div>
                <div className="weekday">Tuesday</div>
                <div className="weekday">Wednesday</div>
                <div className="weekday">Thursday</div>
                <div className="weekday">Friday</div>
                <div className="weekday">Saturday</div>
                <div className="weekday">Sunday</div>
            </div>

            <div className="days">{days()}</div>
        </div>
    )
}

export default Calendar
