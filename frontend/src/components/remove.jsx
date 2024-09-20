import React from "react"
import { useState } from "react"
import "./common.css"
import "./remove.css"

const Remove = ({ removeHandler, username }) => {
    const [disable, setDisable] = useState(true)
    const [error, setError] = useState("")

    function checkUser({ target }) {
        if (target.value == username) {
            setDisable(false)
        } else {
            setDisable(true)
        }
    }

    return (
        <div className="flexyvertical">
            <div className="littlespace"></div>
            <span style={{ color: "red" }}>This will remove your user!</span>
            <div className="littlespace"></div>
            <span>Enter current username</span>
            <div className="littlespace"></div>
            <input type="text" onChange={checkUser} />
            <div className="littlespace"></div>
            <div className="felxy">
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
                                removeHandler(true)
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
                <button
                    className="standardbutton"
                    onClick={() => {
                        removeHandler(false)
                    }}
                >
                    Cancel
                </button>
            </div>
            <div className="littlespace"></div>
            <span>{error.toString()}</span>
        </div>
    )
}

export default Remove
