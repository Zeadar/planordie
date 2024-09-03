import React from "react"
import DisplayTask from "./displaytask.jsx"
import "./tasklist.css"
import "./common.css"

const TaskList = (props) => {
    return (
        <div className="tasklist">
            <div className="flexy">
                <div className="title">Title TBA</div>
            </div>
            {props.tasks.map((t, i) => (
                <div className="flexy">
                    <DisplayTask description={t.description} due={t.due} even={i % 2 == 0} />
                </div>
            ))}
        </div>
    )
}

export default TaskList
