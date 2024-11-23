import React, { useState } from 'react';
import AudioPlayer from '../components/AudioPlayer';

const DatasetView = () => {
  const [audioData, setAudioData] = useState(null);

  const fetchAudio = async (audioPath) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/dataset/audio?path=${encodeURIComponent(audioPath)}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch audio');
      }

      const data = await response.json();
      setAudioData(data);
    } catch (error) {
      console.error('Error fetching audio:', error);
    }
  };

  return (
    <div>
      <h1>Dataset Audio Player</h1>
      
      {/* Button to fetch audio */}
      <button 
        onClick={() => fetchAudio('gs://your-bucket/audio.wav')}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Load Audio
      </button>

      {/* Audio player */}
      {audioData && <AudioPlayer audioData={audioData} />}
    </div>
  );
};

export default DatasetView;
