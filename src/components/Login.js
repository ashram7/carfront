import React, { useState } from "react";
import { SERVER_URL } from "../constants.js";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Carlist from "./Carlist";
import Snackbar from "@mui/material/Snackbar";


function Login() {
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState({
        username: '',
        password: ''
    });
    const [isAuthenticated, setAuth] = useState(false);
    const handleChange = (event) => {
        setUser({...user, [event.target.name] : event.target.value});
    };
    const login = () => {
        fetch(SERVER_URL + 'login', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(user)
        })
        .then(res => {
            const jwtToken = res.headers.get('Authorization');
            if(jwtToken != null) {
                sessionStorage.setItem("jwt", jwtToken);
                setAuth(true);
            }
            else {
                setOpen(true);
                alert('Something went wrong!');
            }
        })
        .catch(err => console.error(err))
    };    
    const logout = () => {
        sessionStorage.removeItem("jwt");
        setAuth(false);
    };

    if(isAuthenticated) {
        return <Carlist />
    }
    else {
        return(
            <div>
                <Stack spacing={2} alignItems='center' mt={2}>
                    <TextField
                        name="username"
                        label="Username"
                        onChange={handleChange} />
                    <TextField
                        type="password"
                        name="password"
                        label="Password"
                        onChange={handleChange} />
                    <Button 
                        variant="outlined"
                        color="primary"
                        onClick={login}>
                        Login    
                    </Button>        
                </Stack>
                <Snackbar 
                    open={open}
                    autoHideDuration={3000}
                    onClose={() => setOpen(false)}
                    message="Login failed: Check your username and password"
                />
            </div>
        );
    }
}
  
export default Login;