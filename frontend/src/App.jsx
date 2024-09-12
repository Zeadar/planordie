import "./App.css"
import "./components/common.css"
import TaskList from "./components/tasklist.jsx"
import LoginForm from "./components/loginform.jsx"
import Top from "./components/top.jsx"
import RegisterForm from "./components/register.jsx"
import Remove from "./components/remove.jsx"
import AddTask from "./components/addtask.jsx"
import { useState, useEffect } from "react"
import { getTasks } from "./getTasks.js"

function App() {
    const [username, setUsername] = useState(window.localStorage.getItem("username") ?? "")
    const [tasks, setTasks] = useState([])
    const [nowDisplay, setNowDisplay] = useState(window.localStorage.getItem("token") ? "tasks" : "login")

    const registerForm = RegisterForm({ successHandler: registerSuccessHandler })
    const loginForm = LoginForm({ handleNewUsername: handleNewUsername })
    const taskList = TaskList({ tasks: tasks, handleNewTask: handleNewTask })
    const removeForm = Remove({ removeHandler: removeSuccessHandler, username: username })
    const addTask = AddTask({ addTaskHandler: addTaskSuccessHandler })

    function registerSuccessHandler() {
        setNowDisplay("login")
    }

    function removeSuccessHandler() {
        setNowDisplay("login")
        setUsername("")
    }

    function addTaskSuccessHandler(newTask) {
        if (newTask) {
            console.log("AddNew")
            getTasks(setTasks)
        } else {
            console.log("back")
        }

        setNowDisplay("tasks")
    }

    function removeHandler() {
        setNowDisplay("remove")
    }

    function logoutHandler() {
        window.localStorage.setItem("token", "")
        setNowDisplay("login")
        setUsername("")
    }

    function registerHandler() {
        window.localStorage.setItem("token", "")
        setNowDisplay("register")
    }

    function handleNewUsername(un) {
        setNowDisplay("tasks")
        window.localStorage.setItem("username", un)
        setUsername(un)
        getTasks(setTasks)
    }

    function handleNewTask() {
        setNowDisplay("addtask")
    }

    useEffect(() => {
        try {
            getTasks(setTasks)
        } catch (err) {
            console.log(err)
        }
    }, []) // Empty dependency array means it only runs on mount

    function displayer() {
        switch (nowDisplay) {
            case "login":
                return loginForm
            case "tasks":
                return taskList
            case "register":
                return registerForm
            case "remove":
                return removeForm
            case "addtask":
                return addTask
            default:
                return <div>Herp derp</div>
        }
    }

    return (
        <div className="everything">
            <div className="App">
                <Top
                    username={username}
                    logoutHandler={logoutHandler}
                    registerHandler={registerHandler}
                    removeHandler={removeHandler}
                ></Top>
                <div className="container">
                    <div className="frame">
                        <div className="flexy">{displayer()}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App
