import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
} from '@mui/material';

import RegistrationPage from './pages/RegistrationPage';
import RegistryPage from './pages/RegistryPage';

function App() {
  const [tracks, setTracks] = useState([]);
  const [view, setView] = useState('register');

  const handleAddTrack = (newTrack) => {
    setTracks((previousTracks) => [
      ...previousTracks,
      newTrack,
    ]);

    setView('registry');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#121212',
        color: '#ffffff',
      }}
    >
      <Box
        component="header"
        sx={{
          height: 58,
          bgcolor: '#000000',
          borderBottom: '1px solid #282828',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 2,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.2,
              }}
            >
              <Box
                component="img"
                src="/spotify-logo.svg"
                alt="Spotify Logo"
                sx={{
                  width: 32,
                  height: 32,
                }}
              />

              <Typography
                fontWeight={800}
                sx={{
                  fontSize: {
                    xs: '0.85rem',
                    sm: '1rem',
                  },
                }}
              >
                Spotify Track & Playlist Manager
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                gap: 1,
              }}
            >
              <Button
                onClick={() => setView('register')}
                sx={{
                  color:
                    view === 'register'
                      ? '#1ed760'
                      : '#b3b3b3',
                  fontWeight: 700,
                  textTransform: 'none',
                  fontSize: '0.85rem',

                  '&:hover': {
                    color: '#ffffff',
                  },
                }}
              >
                Register Track
              </Button>

              <Button
                onClick={() => setView('registry')}
                sx={{
                  color:
                    view === 'registry'
                      ? '#1ed760'
                      : '#b3b3b3',
                  fontWeight: 700,
                  textTransform: 'none',
                  fontSize: '0.85rem',

                  '&:hover': {
                    color: '#ffffff',
                  },
                }}
              >
                Registry
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {view === 'register' && (
        <RegistrationPage onAddTrack={handleAddTrack} />
      )}

      {view === 'registry' && (
        <RegistryPage tracks={tracks} />
      )}
    </Box>
  );
}

export default App;