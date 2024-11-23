import React, { useEffect, useState } from 'react';

const AudioPlayer = ({ audioData }) => {
  const [audioUrl, setAudioUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (audioData) {
      try {
        setLoading(true);
        
        // Convert base64 to Blob
        const byteCharacters = atob(audioData.data);
        const byteNumbers = new Array(byteCharacters.length);
        
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: audioData.mime_type });
        
        // Create URL for the blob
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        setLoading(false);

        // Cleanup
        return () => {
          URL.revokeObjectURL(url);
          setAudioUrl(null);
        };
      } catch (err) {
        setError('Failed to process audio data');
        setLoading(false);
      }
    }
  }, [audioData]);

  if (loading) {
    return <div>Loading audio...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!audioUrl) {
    return null;
  }

  return (
    <div className="audio-player">
      <audio 
        controls
        src={audioUrl}
        className="w-full"
        onError={() => setError('Failed to play audio')}
      >
        Your browser does not support the audio element.
      </audio>
      <div className="text-sm text-gray-500 mt-2">
        Source: {audioData.source}
        <br />
        Path: {audioData.path}
      </div>
    </div>
  );
};

export default AudioPlayer;
