import React from 'react';
import { Box } from '@mui/material';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

// Keyframe animations
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const float = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0);
  }
`;

// Styled components for geometric shapes
const Shape = styled(Box)`
  position: absolute;
  border-radius: 50%;
  opacity: 0.2;
  animation: ${rotate} 20s linear infinite, ${float} 6s ease-in-out infinite;
`;

const BackgroundShapes = () => (
  <>
    <Shape sx={{ width: 200, height: 200, bgcolor: 'primary.main', top: 100, left: 50 }} />
    <Shape sx={{ width: 150, height: 150, bgcolor: 'secondary.main', top: 300, right: 100 }} />
    <Shape sx={{ width: 100, height: 100, bgcolor: 'primary.main', bottom: 200, left: 200 }} />
    <Shape sx={{ width: 120, height: 120, bgcolor: 'secondary.main', bottom: 100, right: 50 }} />
  </>
);

export default BackgroundShapes;
