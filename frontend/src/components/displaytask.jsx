import React from "react"
import "./common.css"
import "./displaytask.css"

const DisplayTask = ({ description, due, even }) => {
    const colorClass = even ? "even" : "odd"
    return (
        <div className={"taskflexy " + colorClass}>
            <div className="description">{description}</div>
            <div className="due">{due}</div>
        </div>
    )
}

export default DisplayTask
