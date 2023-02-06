import { useAppearance } from '@/providers/AppearanceProvider'
import { Box, Typography } from '@mui/material'
import React from 'react'

export default function About() {
  const {translate} = useAppearance()
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        {translate('aboutPageTitle')}
      </Typography>
    </Box>
  )
}
