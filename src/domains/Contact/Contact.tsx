import { useAppearance } from '@/providers/AppearanceProvider'
import { Box, Typography } from '@mui/material'
import React from 'react'

export default function Contact() {
  const {translate} = useAppearance()
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        {translate('contactPageTitle')}
      </Typography>
    </Box>
  )
}
