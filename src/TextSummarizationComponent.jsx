import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  CircularProgress,
  Container,
  Slider,
} from "@mui/material";
import axios from "axios";
function valuetext(value) {
  return `${value} Lines`;
}

const TextSummarizationComponent = () => {
  const [inputText, setInputText] = useState("");
  const [numLines, setNumLines] = useState(3);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleNumLinesChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setNumLines(isNaN(value) ? 0 : value);
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const response = await axios.post(
        "https://sentimentapi-production.up.railway.app/text-summarization",
        {
          text: inputText,
          num_lines: numLines,
        }
      );

      setResult(response.data);
    } catch (error) {
      console.error("Error summarizing text:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="md"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "2rem",
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Text Summarization
      </Typography>
      <div style={{ width: "100%" }}>
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
      <div style={{ marginTop: "1rem", width: "100%" }}>
        {/* Your Slider component */}
        <Slider
          aria-label="Number of Lines"
          defaultValue={3}
          valueLabelDisplay="auto"
          step={1}
          marks
          min={1}
          max={10}
          value={numLines}
          onChange={(e, value) => setNumLines(value)}
        />
      </div>
      <div style={{ marginTop: "1rem", width: "100%" }}>
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
            "Summarize Text"
          )}
        </Button>
      </div>
      {result && (
        <div style={{ marginTop: "2rem", width: "100%" }}>
          <Typography variant="h5">Text Summary:</Typography>
          <Typography variant="body1">
            {result.summarization.summary}
          </Typography>
        </div>
      )}
    </Container>
  );
};

export default TextSummarizationComponent;