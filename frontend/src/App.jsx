import "./App.css"
import "./components/common.css"
import TaskList from "./components/tasklist.jsx"
import LoginForm from "./components/loginform.jsx"
import Top from "./components/top.jsx"
import RegisterForm from "./components/register.jsx"
import Remove from "./components/remove.jsx"
import { useState, useEffect } from "react"
import { getTasks } from "./getTasks.js"

function App() {
    const [username, setUsername] = useState(window.localStorage.getItem("username") ?? "")
    const [tasks, setTasks] = useState([])
    const [nowDisplay, setNowDisplay] = useState(window.localStorage.getItem("token") ? "tasks" : "login")

    const registerForm = RegisterForm({ successHandler: registerSuccessHandler })
    const loginForm = LoginForm({ handleNewUsername: handleNewUsername })
    const taskList = TaskList({ tasks: tasks })
    const removeForm = Remove({ removeHandler: removeSuccessHandler })

    function registerSuccessHandler() {
        setNowDisplay("login")
    }

    function removeSuccessHandler() {
        setNowDisplay("login")
        window.localStorage.setItem("username", null)
        setUsername("")
    }

    function removeHandler() {
        setNowDisplay("remove")
    }

    function logoutHandler() {
        window.localStorage.setItem("token", "")
        setNowDisplay("login")
        window.localStorage.setItem("username", null)
        setUsername("")
    }

    function registerHandler() {
        window.localStorage.setItem("token", "")
        setNowDisplay("register")
    }

    function handleNewUsername(un) {
        setNowDisplay("tasks")
        window.localStorage.setItem("username", un)
        setUsername("Logged in: " + un)
        getTasks(setTasks)
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
                <div className="flexy">{displayer()}</div>
            </div>
        </div>
    )
}

export default App
