import { useMemo, useState } from 'react';
import {
  Box,
  Button,
  Chip,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
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
    data: tracks,

    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 5,
      },
    },
  });

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
        <Box sx={{ mb: 2.5 }}>
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
            Browse and select registered tracks.
          </Typography>
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
              {tracks.length} track
              {tracks.length !== 1 ? 's' : ''}
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

                {tracks.length === 0 && (
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
                      No tracks registered yet.
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

        {selectedTrack && (
          <Box
            sx={{
              mt: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Typography
              sx={{
                color: '#727272',
                fontSize: '0.82rem',
              }}
            >
              Active track:
            </Typography>

            <Typography
              sx={{
                color: '#1ed760',
                fontSize: '0.82rem',
                fontWeight: 700,
              }}
            >
              {selectedTrack.trackTitle}
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default RegistryPage;