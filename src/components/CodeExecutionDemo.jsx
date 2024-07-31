import React, { useState } from 'react';
import { Container, Typography, Button, Select, MenuItem, FormControl, InputLabel, TextField, Paper, styled, Box, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Collapse, IconButton } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-language_tools';


// Styled components
const StyledFormControl = styled(FormControl)(({ theme }) => ({
    marginBottom: theme.spacing(2),
}));

const StyledInputLabel = styled(InputLabel)(({ theme }) => ({
    color: theme.palette.primary.main,
    '&.Mui-focused': {
        color: theme.palette.primary.dark,
    },
}));

const StyledSelect = styled(Select)(({ theme }) => ({
    '& .MuiInputBase-root': {
        '& fieldset': {
            borderColor: theme.palette.primary.main,
        },
        '&:hover fieldset': {
            borderColor: theme.palette.primary.dark,
        },
        '&.Mui-focused fieldset': {
            borderColor: theme.palette.primary.dark,
        },
    },
}));

function LanguageSelector({ language, handleChangeLanguage }) {
    return (
        <StyledFormControl fullWidth margin="normal">
            <StyledInputLabel id="language-label">Select Language</StyledInputLabel>
            <StyledSelect
                labelId="language-label"
                id="language"
                value={language}
                onChange={handleChangeLanguage}
                label="Select Language"
            >
                <MenuItem value="python">Python</MenuItem>
                <MenuItem value="java">Java</MenuItem>
                <MenuItem value="cpp">C++</MenuItem>
                <MenuItem value="c">C</MenuItem>
            </StyledSelect>
        </StyledFormControl>
    );
}
const CustomButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const CustomPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginTop: theme.spacing(2),
  backgroundColor: theme.palette.grey[200],
  maxHeight: '300px',
  overflow: 'auto'
}));

const StatusBox = styled(Box)(({ theme, status }) => ({
  padding: theme.spacing(2),
  marginTop: theme.spacing(2),
  backgroundColor: status === 'Successfully Executed' ? theme.palette.success.light : theme.palette.error.light,
  color: theme.palette.common.white,
}));

const StatsTableContainer = styled(TableContainer)(({ theme }) => ({
  marginTop: theme.spacing(2),
  backgroundColor: theme.palette.grey[200],
}));

const StatsTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  '& .MuiTableCell-root': {
    color: theme.palette.common.white,
    fontWeight: 'bold',
  },
}));

const StatsTableBody = styled(TableBody)(({ theme }) => ({
  '& .MuiTableRow-root': {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  '& .MuiInputLabel-root': {
    color: theme.palette.primary.main,
  },
  '& .MuiInputBase-root': {
    '& fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.dark,
    },
  },
}));

const PurpleArrow = styled(IconButton)(({ theme }) => ({
  position: 'fixed',
  top: '50%',
  right: '0',
  transform: 'translateY(-50%)',
  backgroundColor: 'purple',
  color: 'white',
  '&:hover': {
    backgroundColor: 'darkpurple',
  },
  borderTopLeftRadius: 0,
  borderBottomLeftRadius: 0,
  width: '30px',
  height: '60px',
  zIndex: 1000
}));

const PurpleTriangle = ({ direction }) => (
  <svg width="30" height="60" viewBox="0 0 30 60" xmlns="http://www.w3.org/2000/svg">
    <polygon points={direction === 'left' ? '0,30 30,0 30,60' : '30,30 0,0 0,60'} fill="white" />
  </svg>
);

function CodeExecutionDemo() {
  const [language, setLanguage] = useState('cpp');
  const [stdInput, setStdInput] = useState('');
  const [expectedOutput, setExpectedOutput] = useState('');
  const [timeLimit, setTimeLimit] = useState('2');
  const [wallTimeLimit, setWallTimeLimit] = useState('3');
  const [memoryLimit, setMemoryLimit] = useState('256000');
  const [responseData, setResponseData] = useState(null);
  const [code, setCode] = useState('');
  const [showOtherParams, setShowOtherParams] = useState(false);
  const [showOutputSection, setShowOutputSection] = useState(true);

  const handleChangeLanguage = (event) => {
    setLanguage(event.target.value);
  };

  const handleExecuteCode = () => {
    const requestData = {
      language,
      sourceCode: code,
      stdInput,
      expectedOutput,
      timeLimit,
      wallTimeLimit,
      memoryLimit
    };

    fetch('http://142.93.218.83:8080/submissions/execute?wait=true', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': 'c5f8968c247d499b910b1e2945112917'
      },
      body: JSON.stringify(requestData),
    })
      .then(response => response.json())
      .then(apiResponse => {
        setResponseData(apiResponse);
      })
      .catch(error => {
        console.error('Error:', error);
        setResponseData({ error: error.message });
      });
  };

  return (
    <>
      <Container>
        <Typography variant="h4" gutterBottom>
          Code Execution Demo
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={showOutputSection ? 6 : 12}>
            <Typography variant="h6" gutterBottom>
              Code Editor
            </Typography>
            <LanguageSelector language={language} handleChangeLanguage={handleChangeLanguage} />
            <AceEditor
              mode={language === 'cpp' || language === 'c' ? 'c_cpp' : language}
              theme="monokai"
              name="editor"
              fontSize={16}
              height="400px"
              width="100%"
              value={code}
              onChange={(newValue) => setCode(newValue)}
              setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true,
              }}
            />
            <CustomButton variant="contained" onClick={handleExecuteCode}>
              Run Code
            </CustomButton>
            <Box mt={2}>
              <Typography variant="h6" gutterBottom>
                Standard Input
              </Typography>
              <StyledTextField
                fullWidth
                multiline
                rows={4}
                value={stdInput}
                onChange={(e) => setStdInput(e.target.value)}
                style={{ maxHeight: '150px', overflowY: 'auto' }}
              />
            </Box>
            <Box mt={2}>
              <Typography variant="h6" gutterBottom>
                Other Params
                <IconButton onClick={() => setShowOtherParams(!showOtherParams)}>
                  {showOtherParams ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
              </Typography>
              <Collapse in={showOtherParams}>
                <StyledTextField
                  label="Expected Output"
                  fullWidth
                  value={expectedOutput}
                  onChange={(e) => setExpectedOutput(e.target.value)}
                />
                <StyledTextField
                  label="CPU Time Limit (seconds)"
                  fullWidth
                  value={timeLimit}
                  onChange={(e) => setTimeLimit(e.target.value)}
                />
                <StyledTextField
                  label="Wall Time Limit (seconds)"
                  fullWidth
                  value={wallTimeLimit}
                  onChange={(e) => setWallTimeLimit(e.target.value)}
                />
                <StyledTextField
                  label="Memory Limit (KB)"
                  fullWidth
                  value={memoryLimit}
                  onChange={(e) => setMemoryLimit(e.target.value)}
                />
              </Collapse>
            </Box>
          </Grid>
          {showOutputSection && (
            <Grid item xs={12} md={6}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" gutterBottom>
                  Output
                </Typography>
              </Box>
              <Collapse in={showOutputSection}>
                {responseData && (
                  <>
                    <CustomPaper>
                      <Typography variant="h6">Output</Typography>
                      <Box id="output" style={{ maxHeight: '150px', overflowY: 'auto' }}>
                        <pre>{responseData.output}</pre>
                      </Box>
                    </CustomPaper>
                    <StatusBox status={responseData.status}>
                      <Typography variant="h6">Status</Typography>
                      <Typography>{responseData.status}</Typography>
                    </StatusBox>
                    <StatsTableContainer component={Paper}>
                      <Table>
                        <StatsTableHead>
                          <TableRow>
                            <TableCell>Metric</TableCell>
                            <TableCell>Value</TableCell>
                          </TableRow>
                        </StatsTableHead>
                        <StatsTableBody>
                          <TableRow>
                            <TableCell>Memory Used</TableCell>
                            <TableCell>{responseData.memoryUsed} KB</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Exit Code</TableCell>
                            <TableCell>{responseData.exitCode}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>CPU Time</TableCell>
                            <TableCell>{responseData.cpuTime} seconds</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Wall Time</TableCell>
                            <TableCell>{responseData.wallTime} seconds</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Time Limit Exceeded (TLE)</TableCell>
                            <TableCell>{responseData.tle ? 'Yes' : 'No'}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Memory Limit Exceeded (MLE)</TableCell>
                            <TableCell>{responseData.mle ? 'Yes' : 'No'}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Output Match</TableCell>
                            <TableCell>{responseData.outputMatch}</TableCell>
                          </TableRow>
                        </StatsTableBody>
                      </Table>
                    </StatsTableContainer>
                  </>
                )}
              </Collapse>
            </Grid>
          )}
        </Grid>
      </Container>
      <PurpleArrow onClick={() => setShowOutputSection(!showOutputSection)}>
        <PurpleTriangle direction={showOutputSection ? 'right' : 'left'} />
      </PurpleArrow>
    </>
  );
}

export default CodeExecutionDemo;
