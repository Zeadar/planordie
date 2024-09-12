import React from "react"
import DisplayTask from "./displaytask.jsx"
import "./tasklist.css"
import "./common.css"

const TaskList = ({ tasks, handleNewTask }) => {
    return (
        <div className="tasklist">
            <div className="flexy" style={{ justifyContent: "space-between" }}>
                <div className="title">Title TBA</div>
                <button className="addtask" onClick={handleNewTask}>
                    <i className="horizontalline"></i>
                    <i className="verticalline"></i>
                </button>
            </div>
            {tasks.map((t, i) => (
                <div className="flexy">
                    <DisplayTask title={t.title} description={t.description} due={t.due} even={i % 2 == 0} />
                </div>
            ))}
        </div>
    )
}

export default TaskList
