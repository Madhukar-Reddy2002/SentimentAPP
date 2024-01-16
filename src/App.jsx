import React, { useState } from 'react';
import { TextField, Button, Typography, CircularProgress, Container } from '@mui/material';
import axios from 'axios';

const SentimentAnalysisComponent = () => {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const response = await axios.post('https://web-production-f6f4.up.railway.app/sentiment-analysis', {
        text: inputText,
      });

      setResult(response.data);
    } catch (error) {
      console.error('Error sending text:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Sentiment Analysis
      </Typography>
      <div>
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
      <div style={{ marginTop: '1rem' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={loading}
          fullWidth
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Analyze Sentiment'}
        </Button>
      </div>
      {result && (
        <div style={{ marginTop: '2rem' }}>
          <Typography variant="h5">Analysis Result:</Typography>
          <Typography>Sentiment: {result.sentiment}</Typography>
          <Typography>Polarity: {result.polarity}</Typography>
          <Typography>Subjectivity: {result.subjectivity}</Typography>
        </div>
      )}
    </Container>
  );
};

export default SentimentAnalysisComponent;