import React, { useState } from 'react';
import {
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
  Checkbox,
} from '@mui/material';
import axios from 'axios';

const App = () => {
  const [inputText, setInputText] = useState('');
  const [invertSentiment, setInvertSentiment] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleInvertChange = (e) => {
    setInvertSentiment(e.target.checked);
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const response = await axios.post('http://127.0.0.1:8000/invert', {
        text: inputText,
        invert_to: invertSentiment ? 'negative' : 'positive',
      });

      setResult(response.data);
    } catch (error) {
      console.error('Error inverting sentiment:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="md"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '2rem',
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Sentiment Inverter
      </Typography>
      <div style={{ width: '100%' }}>
        <TextField
          label="Enter Text"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          value={inputText}
          onChange={handleInputChange}
        />
      </div>
      <div style={{ marginTop: '1rem', width: '100%' }}>
        <Checkbox
          checked={invertSentiment}
          onChange={handleInvertChange}
        />
        <label>Invert Sentiment</label>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={loading}
          fullWidth
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            'Invert Sentiment'
          )}
        </Button>
      </div>
      {result && (
        <div style={{ marginTop: '2rem', width: '100%' }}>
          <Typography variant="h5">Original Text:</Typography>
          <Typography variant="body1">{result.original_text}</Typography>
          <Typography variant="h5">Sentiment Analysis:</Typography>
          <Typography variant="body1">
            Sentiment: {result.sentiment_analysis.sentiment}
          </Typography>
          <Typography variant="body1">
            Polarity: {result.sentiment_analysis.polarity}
          </Typography>
          <Typography variant="body1">
            Subjectivity: {result.sentiment_analysis.subjectivity}
          </Typography>
          {invertSentiment && (
            <div>
              <Typography variant="h5">Inverted Sentiment:</Typography>
              <Typography variant="body1">
                Inverted Text: {result.inverted_text}
              </Typography>
            </div>
          )}
        </div>
      )}
    </Container>
  );
};

export default App;