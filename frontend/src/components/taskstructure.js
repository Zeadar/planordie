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
        this.recrrungStop = new Date(recurringStop)
        this.title = title
        // this.skipTasks = []
        // this.completeTasks = []
    }
}

export { Task }
