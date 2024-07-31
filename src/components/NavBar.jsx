import React from 'react';
import { AppBar, Toolbar, Button, Typography, Box, Link, IconButton } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { Home as HomeIcon, Code as CodeIcon, ExitToApp as ExitToAppIcon, VpnKey as VpnKeyIcon, GitHub as GitHubIcon, PlayCircleOutline as DemoIcon, PersonAdd as PersonAddIcon } from '@mui/icons-material';
import styled from '@emotion/styled';

// Styled components
const StyledAppBar = styled(AppBar)`
  background-color: #673ab7;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
`;

const StyledToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
`;

const StyledButton = styled(Button)`
  color: white;
  font-weight: 600;
  &:hover {
    color: #ff4081;
    transition: color 0.3s ease-in-out;
  }
`;

const Logo = styled('img')`
  height: 40px;
  margin-right: 10px;
  vertical-align: middle;
`;

const NavBar = () => {
  const { isLoggedIn, logout } = useAuth();

  return (
    <StyledAppBar position="sticky">
      <StyledToolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link href="/" color="inherit" underline="none" display="flex" alignItems="center">
            <Logo src="https://i.postimg.cc/PrsJMGxW/ksnip-20240722-235026.png" alt="CodeRun Logo" />
            CodeRun
          </Link>
        </Typography>
        <Box>
          <Link href="https://github.com/hari134/coderun" color="inherit" underline="none" sx={{ mx: 1 }}>
            <StyledButton>
              <GitHubIcon sx={{ mr: 1 }} />
              GitHub
            </StyledButton>
          </Link>
          <Link href="/demo" color="inherit" underline="none" sx={{ mx: 1 }}>
            <StyledButton>
              <DemoIcon sx={{ mr: 1 }} />
              Demo
            </StyledButton>
          </Link>
          {!isLoggedIn ? (
            <>
              <Link href="/login" color="inherit" underline="none" sx={{ mx: 1 }}>
                <StyledButton>
                  <ExitToAppIcon sx={{ mr: 1 }} />
                  Login
                </StyledButton>
              </Link>
              <Link href="/register" color="inherit" underline="none" sx={{ mx: 1 }}>
                <StyledButton>
                  <PersonAddIcon sx={{ mr: 1 }} />
                  Register
                </StyledButton>
              </Link>
            </>
          ) : (
            <>
              <Link href="/api-key" color="inherit" underline="none" sx={{ mx: 1 }}>
                <StyledButton>
                  <CodeIcon sx={{ mr: 1 }} />
                  API Keys
                </StyledButton>
              </Link>
              <StyledButton onClick={logout} sx={{ mx: 1 }}>
                <ExitToAppIcon sx={{ mr: 1 }} />
                Logout
              </StyledButton>
            </>
          )}
        </Box>
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default NavBar;
