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
      const response = await axios.post('http://localhost:8000/sentiment-analysis', {
        text: inputText,
      });

      setResult(response.data);
    } catch (error) {
      console.error('Error analyzing sentiment:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2rem' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Sentiment Analysis
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
        <div style={{ marginTop: '2rem', width: '100%' }}>
          <Typography variant="h5">Sentiment Analysis:</Typography>
          <Typography variant="body1">Sentiment: {result.sentiment_analysis.sentiment}</Typography>
          <Typography variant="body1">Polarity: {result.sentiment_analysis.polarity}</Typography>
          <Typography variant="body1">Subjectivity: {result.sentiment_analysis.subjectivity}</Typography>
        </div>
      )}
    </Container>
  );
};

export default SentimentAnalysisComponent;