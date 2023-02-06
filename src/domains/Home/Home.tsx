import { useAppearance } from '@/providers/AppearanceProvider'
import {
  Autocomplete,
  Box,
  MenuItem,
  Pagination,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material'
import TableItem from './components/TableItem'
import useHomePage from './useHomePage'

export default function Home() {
  const { translate } = useAppearance()

  const {
    page,
    setPage,
    pageSize,        
    coins,
    coinsName,
    totalSize,    
    vsCurrency,
    setVsCurrency,
    handleSearch,
    handlePageSize,
    isFetching,
    error
  } = useHomePage()

  return (
    <Box>
      <Stack
        my={4}
        spacing={4}
        direction={{
          xs: 'column',
          md: 'row',
        }}
      >
        <TextField onChange={handleSearch} label={translate('search')} size="small" fullWidth />
        <Autocomplete
          value={vsCurrency}
          onChange={(e, value) => setVsCurrency(value || '')}
          sx={{
            width: {
              xs: '100%',
              md: 250,
            },
          }}
          size="small"
          options={coinsName || []}
          getOptionLabel={(option) => option}
          renderInput={(params) => <TextField {...params} label={translate('vsCurrency')} />}
        />
      </Stack>
      {isFetching && <Box>{translate('loading')}</Box>}
      {!isFetching && coins.length === 0 && <Box>{translate('noData')}</Box>}
      {error && <Box>{JSON.stringify(error || {}, null, 2)}</Box>}
      {!isFetching && coins.length > 0 && (
        <Box>
          <Box sx={{ overflowX: 'auto' }}>
            <Table sx={{ direction: 'ltr', minWidth: 700 }}>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>{translate('coin')}</TableCell>
                  <TableCell>{translate('price')}</TableCell>
                  <TableCell>{translate('24H')}</TableCell>
                  <TableCell>{translate('7D')}</TableCell>
                  <TableCell>{translate('marketCap')}</TableCell>
                  <TableCell>{translate('totalVolume')}</TableCell>
                  <TableCell>{translate('circulatingSupply')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {coins?.map((coin) => {
                  return <TableItem coin={coin} key={coin.id} />
                })}
              </TableBody>
            </Table>
          </Box>
          <Stack
            my={2}
            spacing={2}
            direction={{
              xs: 'column',
              md: 'row',
            }}
          >
            <Pagination
              sx={{ direction: 'ltr' }}
              count={Math.ceil(totalSize / pageSize)}
              page={page}
              onChange={(e, page) => setPage(page)}
              color="primary"
            />
            <Select
              size="small"
              value={pageSize}
              onChange={handlePageSize}
              sx={{
                width: {
                  xs: '100%',
                  md: 100,
                },
              }}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={50}>50</MenuItem>
              <MenuItem value={100}>100</MenuItem>
            </Select>
          </Stack>
        </Box>
      )}
    </Box>
  )
}
