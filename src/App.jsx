import React, { useState } from 'react';
import { Button, Fab, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import NavigationIcon from '@mui/icons-material/Navigation';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SentimentAnalysisComponent from './SentimentAnalysisComponent';
import TextSummarizationComponent from './TextSummarizationComponent';

const App = () => {
  const [showSentimentAnalysis, setShowSentimentAnalysis] = useState(true);

  const handleToggle = () => {
    setShowSentimentAnalysis((prev) => !prev);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <Button variant="outlined" color="primary" onClick={handleToggle}>
        {showSentimentAnalysis ? 'Switch to Text Summarization' : 'Switch to Sentiment Analysis'}
      </Button>
      {showSentimentAnalysis ? <SentimentAnalysisComponent /> : <TextSummarizationComponent />}
    </div>
  );
};

export default App;