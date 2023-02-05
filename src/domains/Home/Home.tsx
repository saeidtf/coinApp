import { useGetCoinsDetailsQuery, useGetCoinsQuery } from '@/services/coinsApi'
import {
  Avatar,
  Box,
  Pagination,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material'
import { useState } from 'react'

const debounce = (fn: any, ms: number) => {
  let timeoutId: any
  return (...args: any) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), ms)
  }
}

const MAX_COINS = 250

export default function Home() {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(25)
  const [search, setSearch] = useState('')

  const { data: coins } = useGetCoinsQuery()
  const { data: coinsDetail, isFetching } = useGetCoinsDetailsQuery(
    {
      page : 1,
      pageSize : 250,
    })

  const handleSearch = debounce((e: any) => {
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
            <TableCell>Rank</TableCell>
            <TableCell>Icon</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Price ($)</TableCell>
            <TableCell>Market Cap</TableCell>
            <TableCell>Volume</TableCell>
            <TableCell>Change</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {coinsDetail?.map((coin) => {
            return (
              <TableRow key={coin.id}>
                <TableCell>{coin.market_cap_rank}</TableCell>
                <TableCell>
                  <Avatar src={coin.image} alt={coin.name} />
                </TableCell>
                <TableCell>{coin.name}</TableCell>
                <TableCell>{coin.current_price.toLocaleString()}</TableCell>
                <TableCell>{coin.market_cap.toLocaleString()}</TableCell>
                <TableCell>{coin.total_volume.toLocaleString()}</TableCell>
                <TableCell>{coin.price_change_24h.toLocaleString()}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      <Box my={2}>
        <Pagination
          count={Math.ceil(MAX_COINS / pageSize)}
          page={page}
          onChange={(e, page) => setPage(page)}
          color="primary"
        />
      </Box>
    </Box>
  )
}
