import { ICoinsDetails, useGetCoinsDetailsQuery, useGetCoinsQuery } from '@/services/coinsApi'
import {
  Avatar,
  Box,
  Pagination,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'

const debounce = (fn: any, ms: number) => {
  let timeoutId: any
  return (...args: any) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), ms)
  }
}

export default function Home() {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(25)
  const [search, setSearch] = useState('')
  const [coins, setCoins] = useState<ICoinsDetails[]>([])
  const [totalSize, setTotalSize] = useState(250)

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

  if (isFetching) return <div>Loading ....</div>

  return (
    <Box>
      <Box my={4}>
        <TextField onChange={handleSearch} label="search" size="small" fullWidth />
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>COIN</TableCell>
            <TableCell>PRICE ($)</TableCell>
            <TableCell>MARKET CAP</TableCell>
            <TableCell>TOTAL VOLUME</TableCell>
            <TableCell>CIRCULATING SUPPLY</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {coins?.map((coin) => {
            return (
              <TableRow key={coin.id}>
                <TableCell>{coin.market_cap_rank}</TableCell>
                <TableCell>
                  <Stack spacing={4} alignItems="center" direction="row">
                    <Avatar src={coin.image} alt={coin.name} sx={{ width: 24, height: 24 }} />
                    <Stack spacing={1}>
                      <Typography variant="subtitle1">{coin.name}</Typography>
                      <Typography variant="subtitle2">{coin.symbol}</Typography>
                    </Stack>
                  </Stack>
                </TableCell>
                <TableCell>{coin.current_price.toLocaleString()}</TableCell>
                <TableCell>{coin.market_cap.toLocaleString()}</TableCell>
                <TableCell>{coin.total_volume.toLocaleString()}</TableCell>
                <TableCell>{`${coin.circulating_supply} ${coin.symbol.toUpperCase()}`}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      <Box my={2}>
        <Pagination
          count={Math.ceil(totalSize / pageSize)}
          page={page}
          onChange={(e, page) => setPage(page)}
          color="primary"
        />
      </Box>
    </Box>
  )
}
