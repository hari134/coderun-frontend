import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Box } from '@mui/material';

function RegisterComponent() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');  // State to hold the name value
    const [password, setPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:8080/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, name, password })  // Include the name in the payload
        });
        if (response.ok) {
            alert('Registration successful!');
        } else {
            alert('Failed to register');
        }
    };

    return (
        <Container maxWidth="xs">
            <Typography variant="h6" sx={{ mb: 2 }}>
                Register
            </Typography>
            <form onSubmit={handleRegister}>
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
                        label="Name"  // Label for the name field
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}  // Update name state on change
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
                        Register
                    </Button>
                </Box>
            </form>
        </Container>
    );
}

export default RegisterComponent;
