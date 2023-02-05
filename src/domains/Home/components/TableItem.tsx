import { ICoinsDetails } from '@/services/coinsApi'
import { Avatar, Stack, TableCell, TableRow, Typography } from '@mui/material'
import React from 'react'
import ChangeValue from './ChangeValue'
import Separator from './Separator'

type TableItemType = {
    coin : ICoinsDetails
}

export default function TableItem({coin}:TableItemType) {
  return (
    <TableRow>
      <TableCell>{coin.market_cap_rank}</TableCell>
      <TableCell>
        <Stack spacing={4} alignItems="center" direction="row">
          <Avatar src={coin.image} alt={coin.name} sx={{ width: 24, height: 24 }} />
          <Stack spacing={1}>
            <Typography variant="body1">{coin.name}</Typography>
            <Typography variant="body2">{coin.symbol}</Typography>
          </Stack>
        </Stack>
      </TableCell>
      <TableCell>
        <Separator value={coin.current_price} />
      </TableCell>
      <TableCell>
        <ChangeValue value={coin.market_cap_change_percentage_24h} />{' '}
      </TableCell>
      <TableCell>
        <Separator value={coin.market_cap} />
      </TableCell>
      <TableCell>
        <Separator value={coin.total_volume} />
      </TableCell>
      <TableCell>
        <Typography variant="body1">{`${
          coin.circulating_supply
        } ${coin.symbol.toUpperCase()}`}</Typography>
      </TableCell>
    </TableRow>
  )
}
