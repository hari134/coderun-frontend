import React from 'react';
import { Typography, Box, Container, Grid, IconButton, Card, CardContent, Link, useMediaQuery, useTheme } from '@mui/material';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import LanguageIcon from '@mui/icons-material/Language';
import SecurityIcon from '@mui/icons-material/Security';
import StorageIcon from '@mui/icons-material/Storage';
import AssessmentIcon from '@mui/icons-material/Assessment';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import WebhookIcon from '@mui/icons-material/CallSplit';
import InputIcon from '@mui/icons-material/Input';
import GitHubIcon from '@mui/icons-material/GitHub';
import InfoIcon from '@mui/icons-material/Info';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import BackgroundShapes from './BackgroundShapes';

// Keyframe animations
const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const slideInFromLeft = keyframes`
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideInFromRight = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

// Styled components
const AnimatedCard = styled(Card)`
  animation: ${float} 3s ease-in-out infinite, ${(props) => (props.index % 2 === 0 ? slideInFromLeft : slideInFromRight)} 0.5s ease-out;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  max-width: 600px;
  margin: ${(props) => (props.index % 2 === 0 ? '0 auto 0 0' : '0 0 0 auto')};
`;

const features = [
  {
    icon: <LanguageIcon color="secondary" sx={{ fontSize: 40 }} />,
    title: 'Multi-Language Support',
    description: 'Supports over 60 programming languages, allowing you to code in your preferred language.',
  },
  {
    icon: <SecurityIcon color="secondary" sx={{ fontSize: 40 }} />,
    title: 'Secure and Reliable',
    description: 'Ensures your code is secure with advanced encryption and reliable infrastructure.',
  },
  {
    icon: <StorageIcon color="secondary" sx={{ fontSize: 40 }} />,
    title: 'Scalable Architecture',
    description: 'The executor is a separate microservice from the API server, making it easily horizontally scalable.',
  },
  {
    icon: <AssessmentIcon color="secondary" sx={{ fontSize: 40 }} />,
    title: 'Detailed Execution Results',
    description: 'Provides detailed execution results including error messages, execution time, and memory usage.',
  },
  {
    icon: <VerifiedUserIcon color="secondary" sx={{ fontSize: 40 }} />,
    title: 'Sandboxed Execution',
    description: 'Ensures safe and secure execution of user code in a sandboxed environment.',
  },
  {
    icon: <WebhookIcon color="secondary" sx={{ fontSize: 40 }} />,
    title: 'Webhooks (HTTP Callbacks)',
    description: 'Get notified about the execution status and results via HTTP callbacks to your specified URL.',
  },
  {
    icon: <InputIcon color="secondary" sx={{ fontSize: 40 }} />,
    title: 'Custom Input/Test Cases',
    description: 'Supports execution on custom input and test cases, enhancing flexibility and usability.',
  },
];

const HomeComponent = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Box sx={{ position: 'relative', overflow: 'hidden' }}>
      <BackgroundShapes />
      <Container sx={{ mt: 5, mb: 5 }}>
        <Typography variant="h3" gutterBottom color="primary">
          Welcome to CodeRun
        </Typography>
        <Typography variant="body1" paragraph>
          CodeRun is a powerful, scalable, and open-source online code execution system designed to handle extensive code executions efficiently.
          Whether you need an online code editor, an IDE, or a backend for competitive programming platforms, CodeRun offers the flexibility and features to meet your needs.
        </Typography>

        <Typography variant="h4" gutterBottom color="primary">
          Features
        </Typography>
        <Grid container spacing={4} direction="column">
          {features.map((feature, index) => (
            <Grid item xs={12} key={index}>
              <Box display="flex" justifyContent={matches ? (index % 2 === 0 ? 'flex-start' : 'flex-end') : 'center'}>
                <AnimatedCard index={index}>
                  <CardContent>
                    <Box display="flex" justifyContent="center" alignItems="center">
                      {feature.icon}
                    </Box>
                    <Typography variant="h5" component="div" color="secondary" align="center">
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" align="center">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </AnimatedCard>
              </Box>
            </Grid>
          ))}
        </Grid>

      </Container>
      <Footer />
    </Box>
  );
};

const Footer = () => {
  return (
    <Box sx={{ bgcolor: '#f5f5f5', p: 3, mt: 5 }}>
      <Container>
        <Typography variant="body2" color="textSecondary" align="center">
          {'© '}
          <Link color="inherit" href="https://coderun.example.com/">
            CodeRun
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
        <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 2 }}>
          <Link color="inherit" href="https://github.com/coderun">
            <IconButton color="inherit">
              <GitHubIcon />
            </IconButton>
          </Link>
          <Link color="inherit" href="https://status.coderun.example.com/">
            <IconButton color="inherit">
              <InfoIcon />
            </IconButton>
          </Link>
          <Link color="inherit" href="https://docs.coderun.example.com/">
            <IconButton color="inherit">
              <InfoIcon />
            </IconButton>
          </Link>
        </Typography>
        <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 2 }}>
          Have a question? <Link color="inherit" href="mailto:support@coderun.example.com"><MailOutlineIcon sx={{ verticalAlign: 'middle' }} /> Contact us</Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default HomeComponent;
