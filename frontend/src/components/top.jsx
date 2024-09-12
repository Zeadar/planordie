import React from "react"
import "./top.css"
import "./common.css"

const Top = ({ username, logoutHandler, registerHandler, removeHandler }) => {
    return (
        <div className="topper">
            <span>{username}</span>
            <div>
                <button className="standardbutton topbutton" onClick={logoutHandler}>
                    Logout
                </button>
                <button className="standardbutton topbutton" onClick={registerHandler}>
                    Register
                </button>
                <button className="standardbutton topbutton" onClick={removeHandler}>
                    Remove
                </button>
            </div>
        </div>
    )
}

export default Top
