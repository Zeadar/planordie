import "./App.css"
import "./components/common.css"
import TaskList from "./components/tasklist.jsx"

const testTasks = [
    { description: "test1", due: "today" },
    { description: "test2", due: "today" },
    { description: "test3", due: "today" },
    { description: "test4", due: "today" },
]

function App() {
    return (
        <div className="everything">
            <div className="App">
                <div className="top"></div>
                <div className="flexy">
                    <TaskList tasks={testTasks} />
                </div>
            </div>
        </div>
    )
}

export default App
