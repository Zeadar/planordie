import React from "react"
import "./top.css"
import "./common.css"

const Top = ({ username, logoutHandler, registerHandler }) => {
    return (
        <div className="topper">
            <span> {username}</span>
            <div>
                <button className="standardbutton" onClick={logoutHandler}>
                    Logout
                </button>
                <button className="standardbutton" onClick={registerHandler}>
                    Register
                </button>
            </div>
        </div>
    )
}

export default Top
