// App.jsx
import React, { useState } from 'react';
import {
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
  Paper,
  Grid,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import axios from 'axios';
import './app.css';

const App = () => {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [subjectivity, setSubjectivity] = useState(null);
  const [polarity, setPolarity] = useState(null);
  const [sentimentLabel, setSentimentLabel] = useState('');
  const [colour, setColour] = useState(null);

  const theme = createTheme({
    palette: {
      mode: 'light',
    },
  });

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const response = await axios.post('https://sentimentapi2-production.up.railway.app/analyze', {
        text: inputText,
      });

      const { sentiment, text } = response.data;
      setResult({ sentiment, text });
      setSubjectivity(sentiment.subjectivity);
      setPolarity(sentiment.polarity);
      setSentimentLabel(sentiment.label);

      if (sentiment.label === 'Positive') {
        setColour('green');
      } else if (sentiment.label === 'Negative') {
        setColour('red');
      } else {
        setColour('orange');
      }
    } catch (error) {
      console.error('Error analyzing text:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm" className="container">
        <Paper
          elevation={3}
          className={`paper neumorphism ${polarity !== null && polarity < 0 ? 'negative-bg' : ''}`}
        >
          <Typography variant="h4" gutterBottom>
            Sentiment Analyzer
          </Typography>
          <TextField
            label="Enter Text"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            margin="normal"
            value={inputText}
            onChange={handleInputChange}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={loading}
            fullWidth
            className="analyze-button"
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Analyze Sentiment'}
          </Button>

          {/* Display Sentiment Label */}
          <Typography variant="h5" gutterBottom>
            Sentiment: {sentimentLabel}
          </Typography>

          <Grid container spacing={2} className='grid'>
            {/* Circular Progress for Subjectivity */}
            {subjectivity !== null && (
              <Grid item className='box'>
                <div className="circular-progress">
                  <Typography variant="body1">Subjectivity:</Typography>
                  <CircularProgress
                    variant="determinate"
                    value={subjectivity * 100}
                    style={{ color: 'green' }}
                  />
                  <Typography variant="body1">{(subjectivity * 100).toFixed(2)}%</Typography>
                </div>
              </Grid>
            )}

            {/* Circular Progress for Polarity */}
            {polarity !== null && (
              <Grid item  className='box'>
                <div className="circular-progress">
                  <Typography variant="body1">Polarity:</Typography>
                  <CircularProgress
                    variant="determinate"
                    value={(polarity + 1) * 50}
                    style={{ color: colour }}
                  />
                  <Typography variant="body1">{(polarity * 100).toFixed(2)}%</Typography>
                </div>
              </Grid>
            )}
          </Grid>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default App;