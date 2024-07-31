import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { AuthProvider } from './context/AuthContext';
import NavBar from './components/NavBar';
import LoginComponent from './components/LoginComponent';
import RegisterComponent from './components/RegisterComponent';
import ApiKeyComponent from './components/ApiKeyComponent';
import HomeComponent from './components/HomeComponent';
import CodeExecutionDemo from './components/CodeExecutionDemo';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#673ab7', // Deep Purple
        },
        secondary: {
            main: '#ff4081', // Pink
        },
        background: {
            default: '#f5f5f5', // Light grey for the background
            paper: '#ffffff', // White for paper elements
        },
        text: {
            primary: '#000000', // Black text
            secondary: '#673ab7', // Deep Purple text
        },
    },
    typography: {
        h3: {
            color: '#ff4081', // Pink for headers
        },
        body1: {
            color: '#000000', // Black text
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    backgroundColor: '#673ab7', // Deep Purple for buttons
                    color: '#ffffff',
                    '&:hover': {
                        backgroundColor: '#5e35b1', // Darker shade for hover
                    },
                },
            },
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AuthProvider>
                <Router>
                    <NavBar />
                    <Container style={{ marginTop: '20px' }}>
                        <Switch>
                            <Route path="/login" component={LoginComponent} />
                            <Route path="/register" component={RegisterComponent} />
                            <Route path="/api-key" component={ApiKeyComponent} />
                            <Route path="/demo" component={CodeExecutionDemo} />
                            <Route path="/" exact component={HomeComponent} />
                            <Redirect to="/" />
                        </Switch>
                    </Container>
                </Router>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;
