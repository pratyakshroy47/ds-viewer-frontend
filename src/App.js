// App.js
import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import {
  Box,
  Container,
  Card,
  Grid,
  Typography,
  Button,
  Select,
  TextField,
  MenuItem,
} from "@mui/material";
import WaveSurfer from "wavesurfer.js";
import "./styles.css";

// Create a dark theme
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

// Create a simple DataTable component
const DataTable = ({ columns, data, AudioCell }) => {
  return (
    <div>
      {/* Placeholder for now */}
      <Typography>Data Table Component</Typography>
    </div>
  );
};

const DatasetExplorer = () => {
  return (
    <Container maxWidth="xl">
      {/* Header Section */}
      <Box className="header" p={3}>
        <Typography variant="h4" sx={{ color: 'white' }}>Dataset Explorer</Typography>
        <Grid container spacing={3}>
          {/* File Upload Section */}
          <Grid item xs={12} md={4}>
            <Card className="upload-card">
              <TextField
                fullWidth
                label="Input Manifest File Path"
                variant="outlined"
              />
              <Button variant="contained" color="primary">
                Upload
              </Button>
            </Card>
          </Grid>

          {/* Filters Section */}
          <Grid item xs={12} md={8}>
            <Card className="filters-card">
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Select fullWidth label="Select Language" defaultValue="all">
                    <MenuItem value="all">All Languages</MenuItem>
                    <MenuItem value="bn">Bengali</MenuItem>
                    <MenuItem value="hi">Hindi</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={6}>
                  <Select
                    fullWidth
                    label="Select Dataset Type"
                    defaultValue="all"
                  >
                    <MenuItem value="all">All Types</MenuItem> ̰
                    <MenuItem value="synth-v1-gcp">Synth V1 GCP</MenuItem>
                  </Select>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Data Table */}
      <Box className="data-table">
        <DataTable
          columns={[
            "Audio",
            "Translation",
            "Language",
            "Hotwords",
            "Context",
            "Type",
            "Duration",
            "Text",
          ]}
          data={[]} // Your data here
          AudioCell={({ audioPath }) => (
            <Box className="audio-player">
              <WaveformVisualizer audioPath={audioPath} />
              <PlayButton audioPath={audioPath} />
            </Box>
          )}
        />
      </Box>

      {/* Pagination */}
      <Box className="pagination">
        <Button variant="outlined">Prev</Button>
        <Typography>Page 1 of 10</Typography>
        <Button variant="outlined">Next</Button>
      </Box>
    </Container>
  );
};

export default function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <DatasetExplorer />
    </ThemeProvider>
  );
}

// Improved components
const WaveformVisualizer = ({ audioPath }) => {
  // Implement waveform visualization using wavesurfer.js
  return <div className="waveform" />;
};

const PlayButton = ({ audioPath }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  // Implement audio playback
  return (
    <Button variant="contained" onClick={() => setIsPlaying(!isPlaying)}>
      {isPlaying ? "Pause" : "Play"}
    </Button>
  );
};
