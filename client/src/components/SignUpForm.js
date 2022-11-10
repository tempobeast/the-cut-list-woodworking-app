import React, { useContext, useState } from "react";
import { Button, Error, Input, FormField, Label, Textarea } from "../styles";
import '../App.css';
import { ErrorsContext } from "../context/errors";

function SignUpForm( {onLogin} ) {
    const { errors, setErrors } = useContext(ErrorsContext)
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [bio, setBio] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        if (password !== passwordConfirmation) {
            alert("Passwords do not match")
        } else {
            setErrors([]);
            setIsLoading(true);
            fetch('/signup', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    password,
                    password_confirmation: passwordConfirmation,
                    img_url: imageUrl,
                    bio,
                }),
            }).then((res) => {
                setIsLoading(false);
                if (res.ok) {
                    res.json().then((user) => onLogin(user))
                } else {
                    res.json().then((errors) => setErrors(errors.errors))
                }
            });
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <FormField>
                <Label htmlFor="username">Username</Label>
                <Input
                type="text"
                id="username"
                autoComplete="off"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />
            </FormField>
            <FormField>
                <Label htmlFor="password">Password</Label>
                <Input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                />
            </FormField>
            <div id="confirmation_div">
                <FormField>
                    <Label htmlFor="password">Password Confirmation</Label>
                    <Input
                    type="password"
                    id="password_confirmation"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    autoComplete="current-password"
                    style={password === passwordConfirmation? {color: "green"} : {color: "red"}}
                    />
                </FormField>
                
            </div>
            <FormField>
                <Label htmlFor="imageUrl">Profile Image</Label>
                <Input
                type="text"
                id="imageUrl"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                />
            </FormField>
            <FormField>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                rows="3"
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                />
            </FormField>
            <FormField>
                <Button type="submit">{isLoading ? "Loading..." : "Sign Up"}</Button>
            </FormField>
            <FormField>
                {errors ? errors.map((err) => (
                <Error key={err}>{err}</Error>
                )) : null}
            </FormField>
        </form>
    )
}

export default SignUpForm