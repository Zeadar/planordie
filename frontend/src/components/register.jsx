import React, { useState } from "react"

const RegisterForm = ({ successHandler }) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault() // Prevent form from refreshing the page

        const payload = {
            username: username,
            password: password,
        }

        try {
            const response = await fetch("https://localhost:7094/api/user/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            })

            if (response.ok) {
                const data = await response.json()
                console.log("Register success:", data)
                successHandler()
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

                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default RegisterForm
