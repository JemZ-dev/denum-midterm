import { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Button,
  Chip,
  Container,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';

import {
  createPaginatedRowModel,
  rowPaginationFeature,
  tableFeatures,
  useTable,
} from '@tanstack/react-table';

const features = tableFeatures({
  rowPaginationFeature,
  paginatedRowModel: createPaginatedRowModel(),
});

function RegistryPage({ tracks }) {
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [activeTrack, setActiveTrack] = useState(null);

  const [genreFilter, setGenreFilter] = useState('All');
  const [roleFilter, setRoleFilter] = useState('All');

  useEffect(() => {
    setActiveTrack(selectedTrack);
  }, [selectedTrack]);

  const filteredTracks = useMemo(() => {
    return tracks.filter((track) => {
      const matchesGenre =
        genreFilter === 'All' || track.genre === genreFilter;

      const matchesRole =
        roleFilter === 'All' || track.role === roleFilter;

      return matchesGenre && matchesRole;
    });
  }, [tracks, genreFilter, roleFilter]);

  const columns = useMemo(
    () => [
      {
        accessorKey: 'trackTitle',
        header: 'Track Title',
      },
      {
        accessorKey: 'genre',
        header: 'Genre',
      },
      {
        accessorKey: 'artistName',
        header: 'Artist',
      },
      {
        accessorKey: 'rating',
        header: 'Rating / BPM',
      },
      {
        accessorKey: 'recordLabel',
        header: 'Record Label',
      },
      {
        accessorKey: 'role',
        header: 'Role',

        cell: (info) => {
          const role = info.getValue();

          return (
            <Chip
              label={role}
              size="small"
              sx={{
                bgcolor:
                  role === 'Creator'
                    ? 'rgba(30, 215, 96, 0.15)'
                    : '#282828',

                color:
                  role === 'Creator'
                    ? '#1ed760'
                    : '#ffffff',

                fontWeight: 700,
              }}
            />
          );
        },
      },
    ],
    []
  );

  const table = useTable({
    features,
    columns,
    data: filteredTracks,

    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 5,
      },
    },
  });

  const handleGenreFilter = (event) => {
    setGenreFilter(event.target.value);
    setSelectedTrack(null);
    setActiveTrack(null);
    table.setPageIndex(0);
  };

  const handleRoleFilter = (event) => {
    setRoleFilter(event.target.value);
    setSelectedTrack(null);
    setActiveTrack(null);
    table.setPageIndex(0);
  };

  const filterStyles = {
    minWidth: 150,

    '& .MuiOutlinedInput-root': {
      color: '#ffffff',
      bgcolor: '#242424',
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

    '& .MuiSvgIcon-root': {
      color: '#ffffff',
    },
  };

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 58px)',
        background:
          'linear-gradient(180deg, #1d1d1d 0%, #121212 280px)',
        py: 3,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            mb: 2.5,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: {
              xs: 'flex-start',
              md: 'center',
            },
            flexDirection: {
              xs: 'column',
              md: 'row',
            },
            gap: 2,
          }}
        >
          <Box>
            <Typography
              component="h1"
              fontWeight={900}
              sx={{
                fontSize: {
                  xs: '1.8rem',
                  md: '2.2rem',
                },
                color: '#ffffff',
              }}
            >
              Track Registry
            </Typography>

            <Typography
              sx={{
                color: '#b3b3b3',
                mt: 0.4,
                fontSize: '0.88rem',
              }}
            >
              Browse, filter, and select registered tracks.
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              gap: 1.5,
              flexWrap: 'wrap',
            }}
          >
            <TextField
              select
              size="small"
              label="Genre"
              value={genreFilter}
              onChange={handleGenreFilter}
              sx={filterStyles}
            >
              <MenuItem value="All">
                All Genres
              </MenuItem>

              <MenuItem value="Pop">
                Pop
              </MenuItem>

              <MenuItem value="Rock">
                Rock
              </MenuItem>

              <MenuItem value="Indie">
                Indie
              </MenuItem>

              <MenuItem value="Jazz">
                Jazz
              </MenuItem>
            </TextField>

            <TextField
              select
              size="small"
              label="Role"
              value={roleFilter}
              onChange={handleRoleFilter}
              sx={filterStyles}
            >
              <MenuItem value="All">
                All Roles
              </MenuItem>

              <MenuItem value="Creator">
                Creator
              </MenuItem>

              <MenuItem value="Listener">
                Listener
              </MenuItem>
            </TextField>
          </Box>
        </Box>

        <Paper
          elevation={0}
          sx={{
            bgcolor: '#181818',
            color: '#ffffff',
            border: '1px solid #282828',
            borderRadius: '12px',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              px: 3,
              py: 2,
              borderBottom: '1px solid #282828',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography
              sx={{
                color: '#ffffff',
                fontWeight: 800,
              }}
            >
              Registered Tracks
            </Typography>

            <Typography
              sx={{
                color: '#b3b3b3',
                fontSize: '0.82rem',
              }}
            >
              {filteredTracks.length} track
              {filteredTracks.length !== 1 ? 's' : ''}
            </Typography>
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableCell
                        key={header.id}
                        sx={{
                          bgcolor: '#202020',
                          color: '#b3b3b3',
                          fontWeight: 800,
                          borderColor: '#282828',
                          fontSize: '0.8rem',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {header.isPlaceholder ? null : (
                          <table.FlexRender
                            header={header}
                          />
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableHead>

              <TableBody>
                {table.getRowModel().rows.map((row) => {
                  const isSelected =
                    selectedTrack?.id === row.original.id;

                  return (
                    <TableRow
                      key={row.id}
                      onClick={() =>
                        setSelectedTrack(row.original)
                      }
                      sx={{
                        cursor: 'pointer',

                        bgcolor: isSelected
                          ? 'rgba(30, 215, 96, 0.12)'
                          : 'transparent',

                        '&:hover': {
                          bgcolor: isSelected
                            ? 'rgba(30, 215, 96, 0.16)'
                            : '#242424',
                        },
                      }}
                    >
                      {row.getAllCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          sx={{
                            color: '#ffffff',
                            borderColor: '#282828',
                            fontSize: '0.85rem',
                          }}
                        >
                          <table.FlexRender
                            cell={cell}
                          />
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })}

                {filteredTracks.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      align="center"
                      sx={{
                        color: '#727272',
                        borderColor: '#282828',
                        py: 6,
                      }}
                    >
                      No tracks match the selected filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <Box
            sx={{
              px: 3,
              py: 1.8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: '1px solid #282828',
            }}
          >
            <Button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              sx={{
                color: '#ffffff',
                textTransform: 'none',
                fontWeight: 700,

                '&.Mui-disabled': {
                  color: '#555555',
                },
              }}
            >
              Previous
            </Button>

            <Typography
              sx={{
                color: '#b3b3b3',
                fontSize: '0.82rem',
              }}
            >
              Page {table.state.pagination.pageIndex + 1} of{' '}
              {Math.max(table.getPageCount(), 1)}
            </Typography>

            <Button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              sx={{
                color: '#ffffff',
                textTransform: 'none',
                fontWeight: 700,

                '&.Mui-disabled': {
                  color: '#555555',
                },
              }}
            >
              Next
            </Button>
          </Box>
        </Paper>

        {activeTrack && (
          <Paper
            elevation={0}
            sx={{
              mt: 2.5,
              bgcolor: '#181818',
              color: '#ffffff',
              border: '1px solid #282828',
              borderRadius: '12px',
              p: {
                xs: 2.5,
                md: 3,
              },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: 2,
                mb: 2.5,
              }}
            >
              <Box>
                <Typography
                  sx={{
                    color: '#1ed760',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    mb: 0.4,
                  }}
                >
                  Active Track
                </Typography>

                <Typography
                  variant="h5"
                  fontWeight={800}
                >
                  {activeTrack.trackTitle}
                </Typography>

                <Typography
                  sx={{
                    color: '#b3b3b3',
                    mt: 0.3,
                  }}
                >
                  {activeTrack.artistName}
                </Typography>
              </Box>

              <Chip
                label={activeTrack.role}
                size="small"
                sx={{
                  bgcolor:
                    activeTrack.role === 'Creator'
                      ? '#1ed760'
                      : '#282828',

                  color:
                    activeTrack.role === 'Creator'
                      ? '#000000'
                      : '#ffffff',

                  fontWeight: 800,
                }}
              />
            </Box>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr 1fr',
                  md: 'repeat(4, 1fr)',
                },
                gap: 2,
              }}
            >
              <Box>
                <Typography
                  sx={{
                    color: '#727272',
                    fontSize: '0.75rem',
                    mb: 0.3,
                  }}
                >
                  Genre
                </Typography>

                <Typography
                  fontWeight={700}
                  fontSize="0.9rem"
                >
                  {activeTrack.genre}
                </Typography>
              </Box>

              <Box>
                <Typography
                  sx={{
                    color: '#727272',
                    fontSize: '0.75rem',
                    mb: 0.3,
                  }}
                >
                  Rating / BPM
                </Typography>

                <Typography
                  fontWeight={700}
                  fontSize="0.9rem"
                >
                  {activeTrack.rating}
                </Typography>
              </Box>

              <Box>
                <Typography
                  sx={{
                    color: '#727272',
                    fontSize: '0.75rem',
                    mb: 0.3,
                  }}
                >
                  Record Label
                </Typography>

                <Typography
                  fontWeight={700}
                  fontSize="0.9rem"
                >
                  {activeTrack.recordLabel}
                </Typography>
              </Box>

              <Box>
                <Typography
                  sx={{
                    color: '#727272',
                    fontSize: '0.75rem',
                    mb: 0.3,
                  }}
                >
                  User Role
                </Typography>

                <Typography
                  fontWeight={700}
                  fontSize="0.9rem"
                >
                  {activeTrack.role}
                </Typography>
              </Box>
            </Box>
          </Paper>
        )}
      </Container>
    </Box>
  );
}

export default RegistryPage;