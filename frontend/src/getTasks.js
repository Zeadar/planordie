import { Task } from "./components/taskstructure.js"

function getTasks(setTasks) {
    const token = window.localStorage.getItem("token")

    if (!token) {
        throw new Error("Not logged in")
    }

    fetch("https://localhost:7094/api/task", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((r) => r.json())
        .then((json) => {
            const tasks = json["$values"].map((v) => new Task(v))
            console.log("tasks", tasks)
            setTasks(tasks)
        })
        .catch((err) => {
            console.error(err)
        })
}

export { getTasks }
