import { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';

function RegistrationPage() {
  const [formData, setFormData] = useState({
    trackTitle: '',
    genre: '',
    artistName: '',
    rating: '',
    recordLabel: '',
    role: '',
  });

  const [errors, setErrors] = useState({});
  const [tracks, setTracks] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  const validateField = (name, value) => {
    let message = '';

    if (name === 'trackTitle') {
      if (!value.trim()) {
        message = 'Track title is required.';
      } else if (value.trim().length < 3) {
        message = 'Track title must be at least 3 characters.';
      }
    }

    if (name === 'genre') {
      if (!value) {
        message = 'Please select a genre.';
      }
    }

    if (name === 'artistName') {
      if (!value.trim()) {
        message = 'Artist name is required.';
      }
    }

    if (name === 'rating') {
      if (value === '') {
        message = 'Rating / BPM is required.';
      } else if (Number(value) < 1 || Number(value) > 100) {
        message = 'Rating / BPM must be between 1 and 100.';
      }
    }

    if (name === 'recordLabel') {
      if (!value.trim()) {
        message = 'Record label name is required.';
      }
    }

    if (name === 'role') {
      if (!value) {
        message = 'Please select a user role.';
      }
    }

    return message;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setErrors((previousErrors) => ({
      ...previousErrors,
      [name]: validateField(name, value),
    }));

    setSuccessMessage('');
  };

  const validateForm = () => {
    const newErrors = {};

    Object.keys(formData).forEach((field) => {
      const error = validateField(field, formData[field]);

      if (error) {
        newErrors[field] = error;
      }
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const newTrack = {
      id: Date.now(),
      trackTitle: formData.trackTitle.trim(),
      genre: formData.genre,
      artistName: formData.artistName.trim(),
      rating: Number(formData.rating),
      recordLabel: formData.recordLabel.trim(),
      role: formData.role,
    };

    setTracks((previousTracks) => [
      ...previousTracks,
      newTrack,
    ]);

    console.log('Registered Track:', newTrack);

    setSuccessMessage('Track registered successfully!');

    setFormData({
      trackTitle: '',
      genre: '',
      artistName: '',
      rating: '',
      recordLabel: '',
      role: '',
    });

    setErrors({});
  };

  const inputStyles = {
    '& .MuiOutlinedInput-root': {
      color: '#ffffff',
      backgroundColor: '#242424',
      borderRadius: '8px',

      '& fieldset': {
        borderColor: '#3e3e3e',
      },

      '&:hover fieldset': {
        borderColor: '#b3b3b3',
      },

      '&.Mui-focused fieldset': {
        borderColor: '#1ed760',
      },
    },

    '& .MuiInputLabel-root': {
      color: '#b3b3b3',
    },

    '& .MuiInputLabel-root.Mui-focused': {
      color: '#1ed760',
    },

    '& .MuiFormHelperText-root': {
      marginLeft: 0,
    },
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
                objectFit: 'contain',
              }}
            />

            <Typography
              fontWeight={800}
              sx={{
                fontSize: {
                  xs: '0.9rem',
                  sm: '1rem',
                },
              }}
            >
              Spotify Track & Playlist Manager
            </Typography>
          </Box>
        </Container>
      </Box>

      <Box
        sx={{
          minHeight: 'calc(100vh - 58px)',
          background:
            'linear-gradient(180deg, #1d1d1d 0%, #121212 280px)',
          py: 3,
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ mb: 2.5 }}>
            <Typography
              component="h1"
              fontWeight={900}
              sx={{
                fontSize: {
                  xs: '1.8rem',
                  md: '2.2rem',
                },
                lineHeight: 1.1,
              }}
            >
              Register your track
            </Typography>

            <Typography
              sx={{
                color: '#b3b3b3',
                mt: 0.5,
                fontSize: '0.88rem',
              }}
            >
              Form Registration & Validation
            </Typography>
          </Box>

          <Paper
            elevation={0}
            sx={{
              bgcolor: '#181818',
              color: '#ffffff',
              borderRadius: '12px',
              border: '1px solid #282828',
              p: {
                xs: 2.5,
                md: 3,
              },
            }}
          >
            <Box sx={{ mb: 2.5 }}>
              <Typography
                variant="h6"
                fontWeight={800}
              >
                Track Information
              </Typography>

              <Typography
                sx={{
                  color: '#b3b3b3',
                  mt: 0.3,
                  fontSize: '0.82rem',
                }}
              >
                Enter the track details below.
              </Typography>
            </Box>

            {successMessage && (
              <Alert
                severity="success"
                sx={{
                  mb: 2,
                  py: 0,
                  bgcolor: 'rgba(30, 215, 96, 0.12)',
                  color: '#ffffff',

                  '& .MuiAlert-icon': {
                    color: '#1ed760',
                  },
                }}
              >
                {successMessage}
              </Alert>
            )}

            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
            >
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: '1fr',
                    md: '1fr 1fr',
                  },
                  gap: 2,
                }}
              >
                <TextField
                  size="small"
                  label="Track Title"
                  name="trackTitle"
                  value={formData.trackTitle}
                  onChange={handleChange}
                  error={Boolean(errors.trackTitle)}
                  helperText={errors.trackTitle}
                  fullWidth
                  sx={inputStyles}
                />

                <TextField
                  size="small"
                  select
                  label="Genre"
                  name="genre"
                  value={formData.genre}
                  onChange={handleChange}
                  error={Boolean(errors.genre)}
                  helperText={errors.genre}
                  fullWidth
                  sx={inputStyles}
                >
                  <MenuItem value="Pop">Pop</MenuItem>
                  <MenuItem value="Rock">Rock</MenuItem>
                  <MenuItem value="Indie">Indie</MenuItem>
                  <MenuItem value="Jazz">Jazz</MenuItem>
                </TextField>

                <TextField
                  size="small"
                  label="Artist Name"
                  name="artistName"
                  value={formData.artistName}
                  onChange={handleChange}
                  error={Boolean(errors.artistName)}
                  helperText={errors.artistName}
                  fullWidth
                  sx={inputStyles}
                />

                <TextField
                  size="small"
                  label="Rating / BPM"
                  name="rating"
                  type="number"
                  value={formData.rating}
                  onChange={handleChange}
                  error={Boolean(errors.rating)}
                  helperText={errors.rating}
                  fullWidth
                  slotProps={{
                    htmlInput: {
                      min: 1,
                      max: 100,
                    },
                  }}
                  sx={inputStyles}
                />

                <TextField
                  size="small"
                  label="Record Label Name"
                  name="recordLabel"
                  value={formData.recordLabel}
                  onChange={handleChange}
                  error={Boolean(errors.recordLabel)}
                  helperText={errors.recordLabel}
                  fullWidth
                  sx={{
                    ...inputStyles,

                    gridColumn: {
                      xs: 'auto',
                      md: '1 / -1',
                    },
                  }}
                />

                <FormControl
                  error={Boolean(errors.role)}
                  sx={{
                    gridColumn: {
                      xs: 'auto',
                      md: '1 / -1',
                    },
                  }}
                >
                  <FormLabel
                    sx={{
                      color: '#ffffff',
                      fontWeight: 700,
                      fontSize: '0.9rem',

                      '&.Mui-focused': {
                        color: '#ffffff',
                      },

                      '&.Mui-error': {
                        color: '#ffffff',
                      },
                    }}
                  >
                    User Role
                  </FormLabel>

                  <RadioGroup
                    row
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    sx={{
                      mt: -0.2,
                    }}
                  >
                    <FormControlLabel
                      value="Creator"
                      control={
                        <Radio
                          size="small"
                          sx={{
                            color: '#727272',

                            '&.Mui-checked': {
                              color: '#1ed760',
                            },
                          }}
                        />
                      }
                      label="Creator"
                    />

                    <FormControlLabel
                      value="Listener"
                      control={
                        <Radio
                          size="small"
                          sx={{
                            color: '#727272',

                            '&.Mui-checked': {
                              color: '#1ed760',
                            },
                          }}
                        />
                      }
                      label="Listener"
                    />
                  </RadioGroup>

                  {errors.role && (
                    <FormHelperText>
                      {errors.role}
                    </FormHelperText>
                  )}
                </FormControl>
              </Box>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  mt: 2.5,
                  py: 1.1,
                  bgcolor: '#1ed760',
                  color: '#000000',
                  borderRadius: '999px',
                  fontWeight: 800,
                  textTransform: 'none',

                  '&:hover': {
                    bgcolor: '#1fdf64',
                  },
                }}
              >
                Register Track
              </Button>
            </Box>
          </Paper>

          <Typography
            textAlign="center"
            sx={{
              mt: 1.5,
              color: '#727272',
              fontSize: '0.78rem',
            }}
          >
            {tracks.length} track
            {tracks.length !== 1 ? 's' : ''} registered
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}

export default RegistrationPage;