import { Typography } from '@mui/material'
import React from 'react'

const Separator = ({ value }: { value: number }) => {
  return <Typography variant="body1">{value < 1 ? value : value.toLocaleString()}</Typography>
}

export default Separator
