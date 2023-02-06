import { useAppearance } from '@/providers/AppearanceProvider'
import { ICoinsDetails, useGetCoinsDetailsQuery, useGetCoinsQuery } from '@/services/coinsApi'
import {
  Box,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material'
import { ReactNode, useEffect, useState } from 'react'
import TableItem from './components/TableItem'

const debounce = (fn: any, ms: number) => {
  let timeoutId: any
  return (...args: any) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), ms)
  }
}

export default function Home() {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [search, setSearch] = useState('')
  const [coins, setCoins] = useState<ICoinsDetails[]>([])
  const [totalSize, setTotalSize] = useState(250)

  const { translate } = useAppearance()

  const { data: coinsName } = useGetCoinsQuery()
  const { data: coinsDetail, isFetching } = useGetCoinsDetailsQuery({
    page: 1,
    pageSize: 250,
  })

  useEffect(() => {
    if (coinsDetail) {
      const searchCoins = coinsDetail.filter((coin) => {
        return coin.name.toLowerCase().includes(search.toLowerCase())
      })

      setTotalSize(searchCoins.length)

      const start = (page - 1) * pageSize
      const end = start + pageSize
      setCoins(searchCoins.slice(start, end))      
    }
  }, [coinsDetail, page, search, pageSize])

  const handleSearch = debounce((e: any) => {
    setPage(1)
    setSearch(e.target.value)
  }, 500)

  const handlePageSize = (e: SelectChangeEvent<number>, child: ReactNode) => {
    setPage(1)
    setPageSize(+e.target.value)
  }

  if (isFetching) return <div>Loading ....</div>

  return (
    <Box>
      <Box my={4} sx={{ direction: 'ltr' }}>
        <TextField onChange={handleSearch} label={translate('search')} size="small" fullWidth />
      </Box>
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
  )
}
