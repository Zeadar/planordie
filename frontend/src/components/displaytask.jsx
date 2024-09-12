import React from "react"
import "./common.css"
import "./displaytask.css"

const DisplayTask = ({ title, description, due, even }) => {
    const colorClass = even ? "even" : "odd"
    return (
        <div className={"taskflexy " + colorClass}>
            <span>{title}</span>
            <span>{description}</span>
            <span>{due}</span>
        </div>
    )
}

export default DisplayTask
