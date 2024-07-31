// src/components/LoginComponent.js
import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Box } from '@mui/material';
import { useAuth } from '../context/AuthContext'; // Import the useAuth hook

function LoginComponent() {
    const { login } = useAuth(); // Use login function from context
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await fetch('http://142.93.218.83:8080/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `username=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
            credentials: 'include'
        });
        if (response.ok) {
            login(); // Call login from context
        } else {
            alert('Failed to login');
        }
    };

    return (
        <Container maxWidth="xs">
            <Typography variant="h6" sx={{ mb: 2 }}>
                Login
            </Typography>
            <form onSubmit={handleLogin}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                        label="Email"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        fullWidth
                    />
                    <TextField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        fullWidth
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Login
                    </Button>
                </Box>
            </form>
        </Container>
    );
}

export default LoginComponent;
