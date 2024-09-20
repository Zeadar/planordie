class Task {
    constructor({
        id = 0,
        assignDate = "",
        description = "",
        recurringMonth = false,
        recurringN = 0,
        recurringStop = "",
        title = "",
    }) {
        this.id = id
        this.assignDate = new Date(assignDate)
        this.description = description
        this.reccuringMonth = recurringMonth
        this.reccuringN = recurringN
        this.recurringStop = new Date(recurringStop)
        this.title = title
        // this.skipTasks = []
        // this.completeTasks = []

        this.assignDate.setHours(0)
        this.assignDate.setMinutes(0)
        this.assignDate.setSeconds(0)
        this.assignDate.setMilliseconds(0)

        this.recurringStop.setHours(0)
        this.recurringStop.setMinutes(0)
        this.recurringStop.setSeconds(0)
        this.recurringStop.setMilliseconds(0)
    }

    get due() {
        return this.assignDate
    }
}

export { Task }
