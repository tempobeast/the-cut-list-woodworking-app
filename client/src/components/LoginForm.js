import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Error, Input, FormField, Label } from "../styles";
import '../App.css';

function LoginForm( {onLogin} ) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        fetch('/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify ({ username, password }),
        }).then((res) => {
            if (res.ok) {
                res.json().then((user) => onLogin(user))
                navigate('/')
            } else {
                res.json().then((errors) => setErrors(errors.errors));
            }
        })
    }

    function handleUsernameChange(e) {
        setIsLoading(false)
        setUsername(e.target.value)
    }

    function handlePasswordChange(e) {
        setIsLoading(false)
        setPassword(e.target.value)
    }

    return (
        <form onSubmit={handleSubmit}>
            <FormField>
                <Label htmlfor="username">Username</Label>
                <Input 
                    type="text"
                    id="username"
                    autoComplete="off"
                    value={username}
                    onChange={handleUsernameChange}
                    required
                />
            </FormField>
            <FormField>
                <Label htmlfor="password">Password</Label>
                <Input
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                />
            </FormField>
            <FormField>
                <Button type="submit">
                    {isLoading ? "Loading..." : "Login"}
                </Button>
            </FormField>
            <FormField>
                { errors ? 
                errors.map((err) => (<Error key={err}>{err}</Error>)) 
                : null}
            </FormField>
        </form>
    )
}

export default LoginForm