import React from "react"
import { useState } from "react"
import "./common.css"
import "./remove.css"

const Remove = ({ removeHandler }) => {
    const [disable, setDisable] = useState(true)
    const [error, setError] = useState("")

    function checkUser({ target }) {
        const username = window.localStorage.getItem("username")
        if (target.value == username) {
            setDisable(false)
        } else {
            setDisable(true)
        }
    }

    return (
        <div className="flexyvertical">
            <div className="littlespace"></div>
            <span>Enter current username</span>
            <div className="littlespace"></div>
            <input type="text" onChange={checkUser} />
            <div className="littlespace"></div>
            <button
                className="standardbutton"
                onClick={async () => {
                    try {
                        const token = window.localStorage.getItem("token")

                        const response = await fetch("https://localhost:7094/api/user/delete", {
                            method: "DELETE",
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        })

                        if (response.ok) {
                            removeHandler()
                        } else {
                            setError(response.statusText)
                            console.error("Remove account failed", response.statusText)
                        }
                    } catch (err) {
                        setError(err)
                        console.error(err)
                    }
                }}
                disabled={disable}
            >
                Remove
            </button>
            <div className="littlespace"></div>
            <span>{error.toString()}</span>
        </div>
    )
}

export default Remove
