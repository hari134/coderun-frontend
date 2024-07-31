import React, { useEffect, useState } from 'react';
import { Button, Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, styled } from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopy';

// Styled components
const CustomButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    padding: '6px 12px',
    fontSize: '0.875rem',
    '&:hover': {
        backgroundColor: theme.palette.primary.dark,
    },
    marginBottom: theme.spacing(2),
}));

const CustomTableContainer = styled(TableContainer)(({ theme }) => ({
    marginTop: theme.spacing(2),
    '& .MuiTableCell-head': {
        backgroundColor: theme.palette.grey[200],
        color: theme.palette.common.black,
        fontWeight: 'bold',
    },
    '& .MuiTableRow-root': {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}));

function ApiKeyComponent() {
    const [apiKeys, setApiKeys] = useState([]);
    const [open, setOpen] = useState(false);
    const [apiKeyData, setApiKeyData] = useState({});

    const fetchApiKeys = async () => {
        const response = await fetch('http://localhost:8080/users/get-user-api-keys', {
            method: 'GET',
            credentials: 'include'
        });
        if (response.ok) {
            const data = await response.json();
            setApiKeys(data.data);
        } else {
            setApiKeyData({ message: 'Failed to retrieve API keys. You must be logged in.' });
            setOpen(true);
        }
    };

    const generateApiKey = async () => {
        const response = await fetch('http://localhost:8080/users/generate-api-key', {
            method: 'GET',
            credentials: 'include'
        });
        if (response.ok) {
            const data = await response.json();
            setApiKeyData({
                success: data.success,
                message: data.message,
                apiKey: data.data,
            });
            setOpen(true);
            fetchApiKeys();  // Refresh the API keys list after generating a new key
        } else {
            setApiKeyData({ message: 'You must be logged in to generate an API key.' });
            setOpen(true);
        }
    };

    const copyToClipboard = (apiKey) => {
        navigator.clipboard.writeText(apiKey)
            .then(() => {
                setApiKeyData({ message: 'API Key copied to clipboard' });
                setOpen(true);
            })
            .catch(() => {
                setApiKeyData({ message: 'Failed to copy API Key' });
                setOpen(true);
            });
    };

    useEffect(() => {
        fetchApiKeys();
    }, []);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" sx={{ mb: 2 }}>
                API Key Management
            </Typography>
            <CustomButton variant="contained" onClick={generateApiKey} fullWidth>
                Generate API Key
            </CustomButton>
            {apiKeys.length > 0 && (
                <CustomTableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>API Key</TableCell>
                                <TableCell>Valid</TableCell>
                                <TableCell>Creation Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {apiKeys.map((apiKey, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <span style={{ flexGrow: 1 }}>{apiKey.apiKey}</span>
                                            <IconButton onClick={() => copyToClipboard(apiKey.apiKey)} size="small" sx={{ ml: 1 }}>
                                                <FileCopyIcon fontSize="small" />
                                            </IconButton>
                                        </div>
                                    </TableCell>
                                    <TableCell>{apiKey.isValid ? 'Yes' : 'No'}</TableCell>
                                    <TableCell>{new Date(apiKey.createdAt).toLocaleString()}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CustomTableContainer>
            )}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Notification</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {apiKeyData.success !== undefined && (
                            <>
                                <strong>Success:</strong> {apiKeyData.success.toString()}<br />
                            </>
                        )}
                        {apiKeyData.message && (
                            <>
                                <strong>Message:</strong> {apiKeyData.message}<br />
                            </>
                        )}
                        {apiKeyData.apiKey && (
                            <>
                                <strong>API Key:</strong> {apiKeyData.apiKey}<br />
                            </>
                        )}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}

export default ApiKeyComponent;
