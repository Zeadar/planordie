import React, { useState } from "react"

const LoginForm = ({ handleNewUsername }) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault() // Prevent form from refreshing the page

        const payload = {
            username: username,
            password: password,
        }

        try {
            const response = await fetch("https://localhost:7094/api/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            })

            console.log("Hello?")

            if (response.ok) {
                const data = await response.json()
                console.log("Success:", data)
                window.localStorage.setItem("token", data.token)
                handleNewUsername(data.username)
            } else {
                console.error("Login failed:", response.statusText)
            }
        } catch (error) {
            console.error("Error:", error)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <br />
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <br />
                <br />

                <label htmlFor="password">Password:</label>
                <br />
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <br />
                <br />

                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default LoginForm
